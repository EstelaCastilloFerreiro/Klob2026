/**
 * Centralized color palette for all visualizations
 * These colors are designed to work well together and maintain consistency
 * across all charts and maps
 * 
 * @module colors
 */

export const CHART_COLORS = {
  // Primary color palette (blue - KLOB brand)
  primary: '#3b82f6', // Blue-500
  primaryLight: '#60a5fa', // Blue-400
  primaryDark: '#2563eb', // Blue-600
  
  // Secondary colors (yellow - KLOB brand - lemon yellow)
  secondary: '#fde047', // Lemon yellow (bright yellow-400)
  secondaryLight: '#fef08a', // Light lemon yellow-200
  secondaryDark: '#eab308', // Darker lemon yellow-500
  
  // Accent colors
  accent: '#93c5fd', // Blue-300
  accentLight: '#bfdbfe', // Blue-200
  accentDark: '#60a5fa', // Blue-400
  
  // Semantic colors
  // Green for positive values
  success: '#10b981', // Emerald-500
  successLight: '#34d399', // Emerald-400
  successDark: '#059669', // Emerald-600
  
  // Red for negative values
  danger: '#ef4444', // Red-500
  dangerLight: '#f87171', // Red-400
  dangerDark: '#dc2626', // Red-600
  
  warning: '#eab308', // Lemon yellow-500
  warningLight: '#fde047', // Lemon yellow-400
  warningDark: '#ca8a04', // Darker yellow-600
  
  // Additional palette colors (yellow tones)
  beige: '#fef3c7', // Yellow-100
  beigeLight: '#fef9c3', // Yellow-50
  beigeDark: '#fef08a', // Light lemon yellow-200
  
  brown: '#eab308', // Lemon yellow-500
  brownLight: '#fde047', // Lemon yellow-400
  brownDark: '#ca8a04', // Darker yellow-600
  
  // Chart series colors (blue and yellow tones)
  series: [
    '#3b82f6', // Blue-500
    '#fde047', // Lemon yellow-400
    '#60a5fa', // Blue-400
    '#eab308', // Lemon yellow-500
    '#2563eb', // Blue-600
    '#fef08a', // Light lemon yellow-200
    '#93c5fd', // Blue-300
    '#ca8a04', // Darker yellow-600
    '#bfdbfe', // Blue-200
    '#fef3c7', // Yellow-100
  ],
  
  // Map colors (for geographic visualizations)
  // Blue for high values, yellow for low values
  map: {
    espana: {
      high: '#3b82f6', // Blue-500 (valores altos)
      mediumHigh: '#60a5fa', // Blue-400
      medium: '#93c5fd', // Blue-300 (medio)
      mediumLow: '#fef08a', // Light lemon yellow-200 (medio-bajo)
      low: '#fde047', // Lemon yellow-400 (valores bajos)
    },
    italia: {
      high: '#3b82f6', // Blue-500 (valores altos)
      mediumHigh: '#60a5fa', // Blue-400
      medium: '#93c5fd', // Blue-300 (medio)
      mediumLow: '#fef08a', // Light lemon yellow-200 (medio-bajo)
      low: '#fde047', // Lemon yellow-400 (valores bajos)
    },
  },
  
  // Gradient stops for continuous scales
  gradients: {
    positive: ['#fde047', '#93c5fd', '#3b82f6'], // Lemon yellow -> Blue-light -> Blue
    negative: ['#ef4444', '#f87171', '#fca5a5'], // Red escalado
    neutral: ['#fde047', '#fef08a', '#fef3c7'], // Lemon yellow tones
  },
} as const;

/**
 * Get color from palette by index (for series)
 */
export function getColorByIndex(index: number): string {
  return CHART_COLORS.series[index % CHART_COLORS.series.length];
}

/**
 * Get color scale value for maps based on ratio (0-1)
 */
export function getMapColor(ratio: number, type: 'espana' | 'italia'): string {
  const palette = CHART_COLORS.map[type];
  if (ratio > 0.8) return palette.high;
  if (ratio > 0.6) return palette.mediumHigh;
  if (ratio > 0.4) return palette.medium;
  if (ratio > 0.2) return palette.mediumLow;
  return palette.low;
}

/**
 * Get semantic color based on value
 * Granate para valores bajos, verde oscuro para valores altos
 */
export function getSemanticColor(value: number, type: 'positive' | 'negative' | 'neutral' = 'positive'): string {
  if (type === 'positive') {
    return value > 0 ? CHART_COLORS.success : CHART_COLORS.danger;
  }
  if (type === 'negative') {
    return value < 0 ? CHART_COLORS.success : CHART_COLORS.danger;
  }
  return CHART_COLORS.secondary;
}

/**
 * Get color based on value range (low = yellow, high = blue)
 * Solo el valor más alto es blue, el más bajo es yellow, el resto blue claro
 */
export function getValueColor(value: number, min: number, max: number): string {
  if (max === min) return CHART_COLORS.secondary; // Yellow si todos son iguales
  
  // Solo el valor más alto es blue
  if (value === max) return CHART_COLORS.primary; // Blue
  
  // Solo el valor más bajo es yellow
  if (value === min) return CHART_COLORS.secondary; // Yellow
  
  // Todo lo demás es blue claro
  return CHART_COLORS.accent; // Blue claro
}

// Default export for compatibility
export default CHART_COLORS;
