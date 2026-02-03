import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  TrendingUp,
  Calendar,
  Package,
  DollarSign,
  Brain,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  FileText,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Chatbot from "@/components/Chatbot";
import { useData } from "@/contexts/DataContext";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n";
import type { PurchasePlanRow } from "@shared/schema";

export default function Forecasting() {
  const { fileId } = useData();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [autoRun, setAutoRun] = useState(false);
  const [selectedTemporada, setSelectedTemporada] = useState<'PV' | 'OI' | null>(null);
  const [modelType, setModelType] = useState<'standard' | 'ml'>('standard');
  const [mlResults, setMlResults] = useState<any>(null);

  // Reset ML results when switching back to standard model
  useEffect(() => {
    if (modelType === 'standard' && mlResults) {
      setMlResults(null);
    }
  }, [modelType]);

  const { data: forecastJobs, isLoading: jobsLoading } = useQuery<any[]>({
    queryKey: ["/api/forecast/jobs", fileId],
    enabled: !!fileId,
    refetchInterval: 2000, // Always poll every 2 seconds
  });

  // Query para obtener temporadas disponibles
  const { data: availableSeasons } = useQuery<{
    latestAvailable: {
      seasonCode: string;
      year: number;
      type: 'PV' | 'OI';
      label: string;
    };
    availableSeasons: Array<{
      value: 'PV' | 'OI';
      label: string;
      year: number;
      type: 'PV' | 'OI';
    }>;
  }>({
    queryKey: ['/api/forecast/available-seasons', fileId],
    enabled: !!fileId,
  });

  const latestJob = Array.isArray(forecastJobs) && forecastJobs.length > 0 ? forecastJobs[0] : null;
  const purchasePlan = latestJob?.results?.purchasePlan;
  
  // Determine which results to display (ML or standard)
  const displayPlan = (mlResults && mlResults.status !== 'error' && mlResults.plan_compras && Array.isArray(mlResults.plan_compras) && mlResults.plan_compras.length > 0) ? {
    modeloUtilizado: mlResults.modelo_ganador || 'ML',
    precisionModelo: mlResults.mape ? 100 - mlResults.mape : null,
    temporadaObjetivo: mlResults.temporada_objetivo || '',
    totalUnidades: mlResults.plan_compras.reduce((sum: number, row: any) => sum + (row.UDS || row.uds || 0), 0),
    totalInversion: mlResults.plan_compras.reduce((sum: number, row: any) => sum + (row.COSTE || row.coste || 0), 0),
    variablesUtilizadas: [
      `MAPE:${mlResults.mape?.toFixed(1) || 'N/A'}`,
      `MAE:${mlResults.mae?.toFixed(1) || 'N/A'}`,
      `RMSE:${mlResults.rmse?.toFixed(1) || 'N/A'}`,
      `Cobertura:${mlResults.cobertura_productos?.toFixed(1) || 'N/A'}%`
    ],
    rows: mlResults.plan_compras.map((row: any) => ({
      seccion: row.SECCION || row.seccion || '',
      pvpPorcentaje: row['% seccion'] || row.pvpPorcentaje || 0,
      contribucionPorcentaje: row['CONTRI.'] || row.contribucionPorcentaje || 0,
      uds: row.UDS || row.uds || 0,
      pvp: row.PVP || row.pvp || 0,
      coste: row.COSTE || row.coste || 0,
      profit: row.Prof || row.profit || 0,
      opciones: row.Opc || row.opciones || 0,
      pmCte: row['PM Cte'] || row.pmCte || 0,
      pmVta: row['PM Vta'] || row.pmVta || 0,
      mk: row.Mk || row.mk || 0,
      markdownPorcentaje: row.MARKDOWN || row.markdownPorcentaje || 0,
      sobranPorcentaje: row.SOBRANTE || row.sobranPorcentaje || 0,
      porTienda: row['x tienda'] || row.porTienda || 0,
      porTalla: row['x talla'] || row.porTalla || 0,
    })),
    cobertura_productos: mlResults.cobertura_productos,
  } : purchasePlan;
  
  // Determinar temporada seleccionada desde displayPlan si existe
  useEffect(() => {
    if (displayPlan?.temporadaObjetivo && !selectedTemporada) {
      const tipo = displayPlan.temporadaObjetivo.includes('Primavera') || displayPlan.temporadaObjetivo.includes('PV') ? 'PV' : 'OI';
      setSelectedTemporada(tipo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayPlan?.temporadaObjetivo]);

  const runForecastMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/forecast/run`, {
        method: "POST",
        body: JSON.stringify({
          fileId,
          horizon: 6, // Siempre usar 6 meses para temporada completa
          temporadaTipo: selectedTemporada || undefined, // Enviar temporada seleccionada si existe
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to run forecast");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/forecast/jobs", fileId] });
      toast({
        title: "Predicción iniciada",
        description: "El sistema está analizando los datos y generando el plan de compras automáticamente.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al ejecutar predicción",
        description: error.message || "No se pudo iniciar la predicción",
        variant: "destructive",
      });
    },
  });

  // ML Training Mutation
  const trainMLMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/ml/train`, {
        method: "POST",
        body: JSON.stringify({ fileId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to train ML models");
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("ML Training completed:", data);
      toast({
        title: "Entrenamiento completado",
        description: "Modelos ML entrenados correctamente. Generando predicción...",
      });
    },
    onError: (error: any) => {
      const isTimeout = error.message?.includes('timeout') || error.message?.includes('timed out');
      toast({
        title: isTimeout ? "Tiempo de espera excedido" : "Error en entrenamiento ML",
        description: isTimeout 
          ? "El entrenamiento tardó más de 10 minutos. Por favor, intente con menos datos o contacte soporte."
          : error.message || "No se pudieron entrenar los modelos",
        variant: "destructive",
      });
    },
  });

  // ML Prediction Mutation
  const predictMLMutation = useMutation({
    mutationFn: async () => {
      const targetSeason = selectedTemporada === 'PV' ? 'next_PV' : 'next_OI';
      const response = await fetch(`/api/ml/predict`, {
        method: "POST",
        body: JSON.stringify({ 
          fileId, 
          targetSeason,
          numTiendas: 10, // Default number of stores
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate ML prediction");
      }
      const data = await response.json();
      
      // Check if the forecast data has an error status
      if (data.forecast?.status === 'error') {
        throw new Error(data.forecast.error || "Error al generar la predicción ML");
      }
      
      return data;
    },
    onSuccess: (data) => {
      console.log("ML Prediction completed:", data);
      
      // Only set results if forecast data is valid
      if (data.forecast && data.forecast.status !== 'error' && data.forecast.plan_compras) {
        setMlResults(data.forecast);
        toast({
          title: "Predicción ML completada",
          description: `Plan de compras generado con ${data.forecast?.cobertura_productos?.toFixed(1) || 'N/A'}% de cobertura`,
        });
      } else {
        throw new Error("Los datos de predicción no están en el formato esperado");
      }
    },
    onError: (error: any) => {
      const isTimeout = error.message?.includes('timeout') || error.message?.includes('timed out');
      const isModelError = error.message?.includes('XGBoost') || error.message?.includes('model');
      
      toast({
        title: isTimeout ? "Tiempo de espera excedido" : isModelError ? "Error al cargar el modelo" : "Error en predicción ML",
        description: isTimeout 
          ? "La predicción tardó más de 2 minutos. Por favor, intente nuevamente o contacte soporte."
          : isModelError
          ? "El modelo ML no se pudo cargar. Por favor, vuelve a entrenar el modelo o usa la predicción estándar."
          : error.message || "No se pudo generar la predicción",
        variant: "destructive",
      });
      
      // Clear ML results on error
      setMlResults(null);
    },
  });

  // Auto-run forecast when fileId is available and no job exists
  useEffect(() => {
    if (fileId && !autoRun && (!latestJob || latestJob.status === "failed")) {
      // No auto-run - esperar a que el usuario seleccione temporada
      // El auto-run se deshabilita para que el usuario siempre elija la temporada
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, latestJob?.status]);

  const handleRunForecast = async () => {
    if (modelType === 'ml') {
      // ML flow: train then predict
      try {
        await trainMLMutation.mutateAsync();
        await predictMLMutation.mutateAsync();
      } catch (error) {
        console.error("ML forecast error:", error);
      }
    } else {
      // Standard ensemble forecast
      runForecastMutation.mutate();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 0) => {
    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-stone-50/30 via-white to-yellow-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-full">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-stone-600 bg-clip-text text-transparent tracking-tight">
                  {t.app.forecasting.title}
                </h1>
                <p className="text-muted-foreground mt-2 font-light">
                  {t.app.forecasting.description}
                </p>
              </div>

          {fileId && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Error message if ML failed */}
                  {mlResults?.status === 'error' && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                            {t.app.forecasting.errorTitle}
                          </h4>
                          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                            {mlResults.error || t.app.forecasting.errorMessage}
                          </p>
                          <p className="text-sm text-red-600 dark:text-red-400">
                            <strong>{t.app.forecasting.errorSuggestion}</strong> {t.app.forecasting.errorSuggestionText}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Mostrar últimos datos disponibles */}
                  {availableSeasons?.latestAvailable && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t.app.forecasting.latestData} <strong className="text-foreground">{availableSeasons.latestAvailable.label}</strong>
                      </span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t.app.forecasting.selectSeason}</label>
                      <Select 
                        value={selectedTemporada || ""} 
                        onValueChange={(value) => setSelectedTemporada(value as 'PV' | 'OI' | null)}
                        data-testid="select-season"
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.app.forecasting.selectSeasonPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSeasons?.availableSeasons.map((season) => (
                            <SelectItem key={season.value} value={season.value}>
                              {season.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t.app.forecasting.seasonInfo}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">{t.app.forecasting.selectModel}</label>
                      <Select 
                        value={modelType} 
                        onValueChange={(value) => setModelType(value as 'standard' | 'ml')}
                        data-testid="select-model-type"
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            {t.app.forecasting.standardModel}
                          </SelectItem>
                          <SelectItem value="ml">
                            {t.app.forecasting.advancedModel}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        {modelType === 'ml' 
                          ? t.app.forecasting.mlModelInfo
                          : t.app.forecasting.standardModelInfo}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleRunForecast}
                      disabled={
                        runForecastMutation.isPending || 
                        trainMLMutation.isPending || 
                        predictMLMutation.isPending || 
                        latestJob?.status === "running" || 
                        !selectedTemporada
                      }
                      data-testid="button-run-forecast"
                      className="min-w-[200px]"
                    >
                      {(runForecastMutation.isPending || trainMLMutation.isPending || predictMLMutation.isPending || latestJob?.status === "running") ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {trainMLMutation.isPending ? t.app.forecasting.training : predictMLMutation.isPending ? t.app.forecasting.predicting : t.app.forecasting.processingAdvancedML}
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {t.app.forecasting.runForecast}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!fileId ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">{t.app.forecasting.noData}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.app.forecasting.uploadPrompt}
                    </p>
                  </div>
                  <Button onClick={() => (window.location.href = "/upload")} data-testid="button-upload-data">
                    {t.app.forecasting.loadData}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.app.forecasting.modelStatus}</CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      {latestJob?.status === "completed" && (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium">{t.app.forecasting.completed}</span>
                        </>
                      )}
                      {latestJob?.status === "running" && (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                          <span className="text-sm font-medium">{t.app.forecasting.processingJob}</span>
                        </>
                      )}
                      {latestJob?.status === "failed" && (
                        <>
                          <AlertCircle className="h-5 w-5 text-destructive" />
                          <span className="text-sm font-medium">{t.app.forecasting.error}</span>
                        </>
                      )}
                      {!latestJob && (
                        <>
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm font-medium">{t.app.forecasting.pending}</span>
                        </>
                      )}
                    </div>
                    {displayPlan && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {t.app.forecasting.modelLabel} {displayPlan.modeloUtilizado.toUpperCase()}
                        {mlResults && ` (${mlResults.cobertura_productos?.toFixed(1)}% ${t.app.forecasting.coverageLabel})`}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.app.forecasting.accuracyShort}</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {displayPlan?.precisionModelo
                        ? `${displayPlan.precisionModelo.toFixed(1)}%`
                        : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {displayPlan?.precisionModelo
                        ? displayPlan.precisionModelo >= 70
                          ? t.app.forecasting.confidenceHigh
                          : displayPlan.precisionModelo >= 50
                          ? t.app.forecasting.confidenceMedium
                          : displayPlan.precisionModelo >= 30
                          ? t.app.forecasting.confidenceLow
                          : t.app.forecasting.confidenceVeryLow
                        : t.app.forecasting.calculating}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.app.forecasting.maeTitle}</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(() => {
                        const maeVar = displayPlan?.variablesUtilizadas?.find((v: string) => v.startsWith('MAE:'));
                        if (maeVar) {
                          const mae = parseFloat(maeVar.split(':')[1]);
                          return mae.toFixed(1);
                        }
                        return "N/A";
                      })()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t.app.forecasting.maeDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.app.forecasting.rmseTitle}</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(() => {
                        const rmseVar = displayPlan?.variablesUtilizadas?.find((v: string) => v.startsWith('RMSE:'));
                        if (rmseVar) {
                          const rmse = parseFloat(rmseVar.split(':')[1]);
                          return rmse.toFixed(1);
                        }
                        return "N/A";
                      })()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t.app.forecasting.rmseDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.app.forecasting.totalUnits}</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {displayPlan?.totalUnidades
                        ? formatNumber(displayPlan.totalUnidades)
                        : displayPlan?.totalPrendas?.uds
                        ? formatNumber(displayPlan.totalPrendas.uds)
                        : "0"}
                    </div>
                    <p className="text-xs text-muted-foreground">{t.app.forecasting.totalUnitsDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.app.forecasting.totalInvestment}</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {displayPlan?.totalInversion
                        ? formatCurrency(displayPlan.totalInversion)
                        : displayPlan?.totalPrendas?.coste
                        ? formatCurrency(displayPlan.totalPrendas.coste)
                        : "€0"}
                    </div>
                    <p className="text-xs text-muted-foreground">{t.app.forecasting.totalInvestmentDescription}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Confidence Panel - Show model quality metrics */}
              {displayPlan && displayPlan.variablesUtilizadas && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <span>{t.app.forecasting.forecastConfidence}</span>
                      {(() => {
                        const coverage = parseFloat(displayPlan.variablesUtilizadas.find((v: string) => v.includes('Cobertura'))?.split(':')[1] || '0');
                        const mape = parseFloat(displayPlan.variablesUtilizadas.find((v: string) => v.includes('MAPE'))?.split(':')[1] || '100');
                        const confidenceLevel = coverage >= 60 && mape < 30 ? t.app.forecasting.forecastConfidenceHigh : coverage >= 50 && mape < 50 ? t.app.forecasting.forecastConfidenceMedium : t.app.forecasting.forecastConfidenceLow;
                        const badgeColor = confidenceLevel === t.app.forecasting.forecastConfidenceHigh ? 'bg-green-500' : confidenceLevel === t.app.forecasting.forecastConfidenceMedium ? 'bg-yellow-300' : 'bg-orange-500';
                        return <span className={`text-xs px-2 py-1 rounded-full text-white ${badgeColor}`}>{confidenceLevel}</span>;
                      })()}
                    </CardTitle>
                    <CardDescription>
                      {(() => {
                        const coverage = parseFloat(displayPlan.variablesUtilizadas.find((v: string) => v.includes('Cobertura'))?.split(':')[1] || '0');
                        return coverage >= 60 
                          ? t.app.forecasting.confidenceDescriptionHigh
                          : t.app.forecasting.confidenceDescriptionLow;
                      })()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Cobertura */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground">{t.app.forecasting.coverageAnalyzed}</p>
                        <p className="text-2xl font-bold">
                          {displayPlan.variablesUtilizadas.find((v: string) => v.includes('Cobertura'))?.split(':')[1]?.trim() || 'N/A'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.app.forecasting.coverageDescription}
                        </p>
                      </div>

                      {/* Precisión */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground">{t.app.forecasting.accuracyHistorical}</p>
                        <p className="text-2xl font-bold">
                          {(() => {
                            const mape = parseFloat(displayPlan.variablesUtilizadas.find((v: string) => v.includes('MAPE'))?.split(':')[1] || '100');
                            return `${Math.max(0, 100 - mape).toFixed(1)}%`;
                          })()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.app.forecasting.accuracyPercentage}
                        </p>
                      </div>

                      {/* Variación media */}
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground">{t.app.forecasting.averageVariation}</p>
                        <p className="text-2xl font-bold">
                          ±{displayPlan.variablesUtilizadas.find((v: string) => v.includes('MAPE'))?.split(':')[1]?.trim() || 'N/A'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.app.forecasting.averageVariationDescription}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status Card - Show when there's a job */}
              {latestJob && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {purchasePlan?.temporadaObjetivo ? (
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{t.app.forecasting.targetSeason}</p>
                            <p className="text-xs text-muted-foreground">
                              {displayPlan.temporadaObjetivo} - {t.app.forecasting.seasonalNote} ({displayPlan.temporadaObjetivo.includes('Primavera') ? 'P/V' : 'O/I'})
                            </p>
                          </div>
                        </div>
                      ) : latestJob?.status === "running" ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{t.app.forecasting.processingPrediction}</p>
                            <p className="text-xs text-muted-foreground">{t.app.forecasting.analyzingData}</p>
                          </div>
                        </div>
                      ) : latestJob?.status === "failed" ? (
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                          <div>
                            <p className="text-sm font-medium">{t.app.forecasting.predictionError}</p>
                            <p className="text-xs text-muted-foreground">{t.app.forecasting.problemGeneratingPlan}</p>
                          </div>
                        </div>
                      ) : null}
                      {purchasePlan && (
                        <Button
                          onClick={handleRunForecast}
                          disabled={runForecastMutation.isPending || latestJob?.status === "running" || !selectedTemporada}
                          data-testid="button-recalculate-forecast"
                          variant="outline"
                        >
                          {runForecastMutation.isPending || latestJob?.status === "running" ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              {t.app.forecasting.processingAdvancedML}
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              {t.app.forecasting.recalculate}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Purchase Plan Table */}
              {displayPlan && displayPlan.rows && displayPlan.rows.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {t.app.forecasting.purchasePlanRecommendations}
                    </CardTitle>
                    <CardDescription>
                      {t.app.forecasting.purchasePlanDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto w-full">
                      <Table className="w-full min-w-[1200px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">{t.app.forecasting.tableSection}</TableHead>
                            <TableHead className="text-center">{t.app.forecasting.tablePvpPercent}</TableHead>
                            <TableHead className="text-center">{t.app.forecasting.tableContribution}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tableUnits}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tablePvp}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tableCost}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tableProfit}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tableOptions}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tablePmCost}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tablePmSale}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tableMkPercent}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tableMarkdownPercent}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tableSurplusPercent}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tablePerStore}</TableHead>
                            <TableHead className="text-right">{t.app.forecasting.tablePerSize}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {displayPlan.rows.map((row: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{row.seccion}</TableCell>
                              <TableCell className="text-center">
                                {formatNumber(row.pvpPorcentaje, 1)}%
                              </TableCell>
                              <TableCell className="text-center">
                                {formatNumber(row.contribucionPorcentaje, 1)}%
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                {formatNumber(row.uds)}
                              </TableCell>
                              <TableCell className="text-right">{formatCurrency(row.pvp)}</TableCell>
                              <TableCell className="text-right">{formatCurrency(row.coste)}</TableCell>
                              <TableCell className="text-right">{formatCurrency(row.profit)}</TableCell>
                              <TableCell className="text-right">{row.opciones}</TableCell>
                              <TableCell className="text-right">{formatCurrency(row.pmCte)}</TableCell>
                              <TableCell className="text-right">{formatCurrency(row.pmVta)}</TableCell>
                              <TableCell className="text-right">
                                {formatNumber(row.mk, 1)}%
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNumber(row.markdownPorcentaje, 1)}%
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNumber(row.sobranPorcentaje, 1)}%
                              </TableCell>
                              <TableCell className="text-right">{row.porTienda}</TableCell>
                              <TableCell className="text-right">{row.porTalla}</TableCell>
                            </TableRow>
                          ))}
                          {/* Total Row */}
                          {displayPlan.totalPrendas && (
                            <TableRow className="bg-muted font-bold">
                              <TableCell>{displayPlan.totalPrendas.seccion}</TableCell>
                              <TableCell className="text-center">
                                {formatNumber(displayPlan.totalPrendas.pvpPorcentaje, 1)}%
                              </TableCell>
                              <TableCell className="text-center">
                                {formatNumber(displayPlan.totalPrendas.contribucionPorcentaje, 1)}%
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNumber(displayPlan.totalPrendas.uds)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(displayPlan.totalPrendas.pvp)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(displayPlan.totalPrendas.coste)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(displayPlan.totalPrendas.profit)}
                              </TableCell>
                              <TableCell className="text-right">
                                {displayPlan.totalPrendas.opciones}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(displayPlan.totalPrendas.pmCte)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(displayPlan.totalPrendas.pmVta)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNumber(displayPlan.totalPrendas.mk, 1)}%
                              </TableCell>
                              <TableCell className="text-right">-</TableCell>
                              <TableCell className="text-right">-</TableCell>
                              <TableCell className="text-right">-</TableCell>
                              <TableCell className="text-right">-</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {/* Summary Text */}
                    {displayPlan.totalPrendas && (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>{t.app.forecasting.summaryLabel}</strong> {t.app.forecasting.summaryText}{" "}
                          <strong>{formatNumber(displayPlan.totalPrendas.uds)} {t.app.forecasting.summaryUnits}</strong> {t.app.forecasting.summaryInvestment}{" "}
                          <strong>{formatCurrency(displayPlan.totalPrendas.coste)}</strong>. {t.app.forecasting.summaryNote}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : latestJob?.status === "running" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      {t.app.forecasting.generatingPlan}
                    </CardTitle>
                    <CardDescription>
                      {t.app.forecasting.analyzingDataDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t.app.forecasting.progress}</span>
                          <span className="font-mono font-medium">
                            {latestJob.progress ? `${Math.round(latestJob.progress)}%` : '0%'}
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all duration-500 ease-out"
                            style={{ width: `${latestJob.progress || 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold font-mono">
                            {latestJob.processedProducts || 0}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {t.app.forecasting.productsProcessed}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold font-mono">
                            {latestJob.totalProducts || 0}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {t.app.forecasting.totalProducts}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold font-mono text-primary">
                            {latestJob.estimatedTimeRemaining 
                              ? `${latestJob.estimatedTimeRemaining}s` 
                              : '---'}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {t.app.forecasting.estimatedTime}
                          </div>
                        </div>
                      </div>

                      {/* Processing Message */}
                      <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">
                          {t.app.forecasting.analyzingHistorical}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>{t.app.forecasting.purchasePlan}</CardTitle>
                    <CardDescription>
                      {t.app.forecasting.resultsWillAppear}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t.app.forecasting.runPrediction}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>

      <Chatbot section="forecasting" />
    </div>
  );
}
