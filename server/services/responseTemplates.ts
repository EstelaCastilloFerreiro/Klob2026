/**
 * Bilingual Response Templates for Chatbot
 * Centralized localization for all chatbot responses
 */

export type Language = 'en' | 'es';

interface ResponseTemplates {
  // Store queries
  storeCount: (count: number) => string;
  storeCountTrucco: (count: number, stores: string) => string;
  storeCountOnline: (count: number) => string;
  storeCountPhysical: (count: number) => string;
  
  // Product/Family queries
  familyCount: (count: number) => string;
  seasonCount: (count: number) => string;
  productCount: (count: number) => string;
  
  // Sales queries
  totalSales: (units: string, revenue: string) => string;
  netSales: (amount: string) => string;
  grossSales: (amount: string) => string;
  onlineSales: (amount: string) => string;
  physicalSales: (amount: string) => string;
  
  // Returns queries
  totalReturns: (units: string) => string;
  returnRate: (rate: string) => string;
  
  // Product family queries with year
  familySoldInYear: (year: string, units: string, family: string, revenue: string) => string;
  familySoldInYearShort: (year: string, units: string, family: string) => string;
  familyNotFoundInYear: (family: string, year: string) => string;
  familyNotFound: (family: string, available: string) => string;
  
  // Size queries
  bestSizeForFamily: (year: string, family: string, size: string, units: string, total: string) => string;
  
  // General year queries
  yearSummary: (year: string, units: string, revenue: string) => string;
  noDataForYear: (year: string, seasons: string) => string;
  
  // Top/Bottom rankings
  topStores: (count: number) => string;
  bottomStores: (count: number) => string;
  
  // Error/fallback messages
  noData: () => string;
  noSufficientData: () => string;
  insufficientDataForQuery: () => string;
}

const templates: Record<Language, ResponseTemplates> = {
  en: {
    // Store queries
    storeCount: (count) => `There are ${count} unique stores in total.`,
    storeCountTrucco: (count, stores) => `There are ${count} store(s) containing "trucco" in their name: ${stores}.`,
    storeCountOnline: (count) => `There are ${count} online store(s).`,
    storeCountPhysical: (count) => `There are ${count} physical store(s).`,
    
    // Product/Family queries
    familyCount: (count) => `There are ${count} unique product families.`,
    seasonCount: (count) => `There are ${count} unique seasons.`,
    productCount: (count) => `There are ${count} unique registered products.`,
    
    // Sales queries
    totalSales: (units, revenue) => `Total: ${units} units sold, €${revenue} in revenue.`,
    netSales: (amount) => `Net sales: €${amount}.`,
    grossSales: (amount) => `Gross sales: €${amount}.`,
    onlineSales: (amount) => `Online sales: €${amount}.`,
    physicalSales: (amount) => `Physical store sales: €${amount}.`,
    
    // Returns queries
    totalReturns: (units) => `Total returns: ${units} units.`,
    returnRate: (rate) => `Return rate: ${rate}% of total sales.`,
    
    // Product family queries with year
    familySoldInYear: (year, units, family, revenue) => 
      `In ${year}, ${units} units of ${family.toLowerCase()} were sold, generating €${revenue} in revenue.`,
    familySoldInYearShort: (year, units, family) => 
      `In ${year}, ${units} units of ${family.toLowerCase()} were sold.`,
    familyNotFoundInYear: (family, year) => 
      `I didn't find any sales for ${family} in ${year}.`,
    familyNotFound: (family, available) => 
      `I couldn't find a product family called "${family}". Available families: ${available}.`,
    
    // Size queries
    bestSizeForFamily: (year, family, size, units, total) => 
      `In ${year}, the best-selling size for ${family.toLowerCase()} was size ${size} with ${units} units sold (out of ${total} total units).`,
    
    // General year queries
    yearSummary: (year, units, revenue) => 
      `In ${year}: ${units} units sold, €${revenue} in total revenue.`,
    noDataForYear: (year, seasons) => 
      `I couldn't find data for year ${year}. Available seasons: ${seasons}.`,
    
    // Top/Bottom rankings
    topStores: (count) => `Top ${count} stores by sales`,
    bottomStores: (count) => `Bottom ${count} stores by sales`,
    
    // Error/fallback messages
    noData: () => `No data available.`,
    noSufficientData: () => `Insufficient data to answer this query.`,
    insufficientDataForQuery: () => `I don't have enough data to answer that question.`,
  },
  
  es: {
    // Store queries
    storeCount: (count) => `Hay ${count} tienda(s) únicas en total.`,
    storeCountTrucco: (count, stores) => `Hay ${count} tienda(s) que contienen "trucco" en su nombre: ${stores}.`,
    storeCountOnline: (count) => `Hay ${count} tienda(s) online.`,
    storeCountPhysical: (count) => `Hay ${count} tienda(s) físicas.`,
    
    // Product/Family queries
    familyCount: (count) => `Hay ${count} familia(s) de productos únicas.`,
    seasonCount: (count) => `Hay ${count} temporada(s) únicas.`,
    productCount: (count) => `Hay ${count} productos únicos registrados.`,
    
    // Sales queries
    totalSales: (units, revenue) => `Total: ${units} unidades vendidas, €${revenue} de ingresos.`,
    netSales: (amount) => `Ventas netas: €${amount}.`,
    grossSales: (amount) => `Ventas brutas: €${amount}.`,
    onlineSales: (amount) => `Ventas online: €${amount}.`,
    physicalSales: (amount) => `Ventas en tiendas físicas: €${amount}.`,
    
    // Returns queries
    totalReturns: (units) => `Devoluciones totales: ${units} unidades.`,
    returnRate: (rate) => `Tasa de devolución: ${rate}% del total de ventas.`,
    
    // Product family queries with year
    familySoldInYear: (year, units, family, revenue) => 
      `En ${year}, se vendieron ${units} unidades de ${family}, generando €${revenue} de ingresos.`,
    familySoldInYearShort: (year, units, family) => 
      `En ${year}, se vendieron ${units} unidades de ${family}.`,
    familyNotFoundInYear: (family, year) => 
      `No encontré ventas de ${family} en ${year}.`,
    familyNotFound: (family, available) => 
      `No encontré una familia exacta llamada "${family}". Familias disponibles: ${available}.`,
    
    // Size queries
    bestSizeForFamily: (year, family, size, units, total) => 
      `En ${year}, la talla más vendida de ${family} fue ${size} con ${units} unidades vendidas (de un total de ${total} unidades).`,
    
    // General year queries
    yearSummary: (year, units, revenue) => 
      `En ${year}: ${units} unidades vendidas, €${revenue} de beneficio total.`,
    noDataForYear: (year, seasons) => 
      `No encontré datos para el año ${year}. Las temporadas disponibles son: ${seasons}.`,
    
    // Top/Bottom rankings
    topStores: (count) => `Top ${count} tiendas con más ventas`,
    bottomStores: (count) => `Top ${count} tiendas con menos ventas`,
    
    // Error/fallback messages
    noData: () => `No hay datos disponibles.`,
    noSufficientData: () => `Datos insuficientes para responder esta consulta.`,
    insufficientDataForQuery: () => `No tengo suficientes datos para responder esa pregunta.`,
  },
};

/**
 * Translation helper - returns localized response
 */
export function t(
  lang: Language,
  key: keyof ResponseTemplates,
  ...params: any[]
): string {
  const template = templates[lang][key];
  if (!template) {
    console.error(`Missing template: ${lang}.${key}`);
    return `[Missing translation: ${key}]`;
  }
  
  // @ts-ignore - TypeScript can't infer the parameter types dynamically
  return template(...params);
}

/**
 * Format number with locale
 */
export function formatNum(value: number, lang: Language): string {
  const locale = lang === 'en' ? 'en-US' : 'es-ES';
  return value.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/**
 * Format currency with locale
 */
export function formatCurr(value: number, lang: Language): string {
  const locale = lang === 'en' ? 'en-US' : 'es-ES';
  return value.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
