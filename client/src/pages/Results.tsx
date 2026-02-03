import { useLocation } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Target, TrendingUp, ArrowLeft } from "lucide-react";
import { KLOBLogo } from "@/components/KLOBLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { motion } from "framer-motion";
import aboutBgImage from "@assets/Captura de pantalla 2025-11-14 a las 12.37.02_1763120225665.png";
import { useLanguage } from "@/i18n";

export default function Results() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const checkAndScroll = () => {
      const hash = window.location.hash;
      if (hash === '#benefits') {
        const element = document.getElementById('benefits');
        if (element) {
          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    };
    
    checkAndScroll();
    window.addEventListener('hashchange', checkAndScroll);
    
    return () => {
      window.removeEventListener('hashchange', checkAndScroll);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={aboutBgImage}
          alt="Beach background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/55 via-white/35 to-blue-50/20 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-gray-950/70"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-sm border-b border-stone-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-6">
              <KLOBLogo className="h-6 sm:h-7 md:h-8 w-auto" />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                data-testid="button-back-home"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{t.common.goBack}</span>
                <span className="sm:hidden">Inicio</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-yellow-700 to-gray-900 dark:from-white dark:via-yellow-400 dark:to-white bg-clip-text text-transparent">
              {t.app.results.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto px-3">
              {t.app.results.subtitle}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* Implementación Rápida */}
            <motion.div
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-700 dark:text-yellow-300" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{t.app.results.expressImplementation.title}</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.app.results.expressImplementation.description1} <span className="font-bold text-yellow-700 dark:text-yellow-300">{t.app.results.expressImplementation.daysHighlight}</span>.
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {t.app.results.expressImplementation.description2}
                </p>
              </div>
            </motion.div>

            {/* Tasa de Éxito */}
            <motion.div
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{t.app.results.guaranteedSuccess.title}</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.app.results.guaranteedSuccess.description1} <span className="font-bold text-blue-600 dark:text-blue-400">{t.app.results.guaranteedSuccess.rateHighlight}</span> {t.app.results.guaranteedSuccess.description1Full}
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {t.app.results.guaranteedSuccess.description2}
                </p>
              </div>
            </motion.div>

            {/* KPIs Acelerados */}
            <motion.div
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{t.app.results.immediateImpact.title}</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.app.results.immediateImpact.description1} <span className="font-bold text-purple-600 dark:text-purple-400">{t.app.results.immediateImpact.improvementHighlight}</span> {t.app.results.immediateImpact.description1Full}
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {t.app.results.immediateImpact.description2}
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={() => setLocation("/")}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 text-sm sm:text-base"
              data-testid="button-cta-results"
            >
              {t.app.results.ctaButton}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10" id="benefits">
        <BenefitsSection />
      </div>
    </div>
  );
}
