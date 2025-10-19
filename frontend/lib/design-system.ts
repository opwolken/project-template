/**
 * Design System - Minimalistisch, Earthy, Refined
 * Geïnspireerd door Spotify, Airbnb, OpenAI
 */

export const colors = {
  // Background & Surfaces - Warme aardtinten
  background: '#FAF6F4',      // warm white met roze ondertoon
  surface: '#FFFFFF',         // pure white voor contrast
  surfaceHover: '#F2E8E5',    // pale clay hover state
  surfaceAlt: '#F5EBE8',      // alternatieve surface (blush)
  
  // Text - Rijke, warme tinten
  text: {
    primary: '#2D1410',       // deep brown, bijna zwart
    secondary: '#5C342E',     // raw umber
    tertiary: '#9B7B72',      // warm gray-brown
    inverse: '#FAF6F4',       // voor dark backgrounds
  },
  
  // Accent - Red Earth palette (sophisticated)
  accent: {
    primary: '#4A1F1A',       // oxide red - hoofdaccent
    secondary: '#5C342E',     // raw umber - secundair
    hover: '#6B3023',         // rust orange - hover
    light: '#F2E8E5',         // pale clay - backgrounds
    lighter: '#F5EBE8',       // blush pink - zeer subtiel
  },
  
  // Stone & Earth tones voor variatie
  earth: {
    clay: '#F2E8E5',          // pale clay
    sand: '#E8DDD6',          // warm sand
    stone: '#D9D2CE',         // stone gray
    terracotta: '#8B5A4D',    // warme terracotta
  },
  
  // Semantic - Aangepast aan palette
  success: '#3D5A3B',         // earthy green
  warning: '#8B5A2B',         // warm amber
  error: '#7A2E26',           // deep red
  info: '#4A5C6B',            // slate blue
  
  // Borders & Dividers - Warmer
  border: '#E8DDD6',          // warm sand border
  borderHover: '#D9D2CE',     // stone gray hover
  divider: '#F2E8E5',         // pale clay divider
  borderAccent: '#C4A99D',    // warme accent border
} as const;

// Recipe-specific colors
export const recipeColors = {
  // Cuisine types - Earthy, sophisticated
  cuisine: {
    italiaans: '#8B5A4D',      // Terracotta
    grieks: '#4A5C6B',         // Mediterranean slate blue
    chinees: '#7A2E26',        // Deep red
    frans: '#6B5B4D',          // Warm stone
    amerikaans: '#8B5A2B',     // Amber
    mediterraans: '#5B7A72',   // Sage green
    spaans: '#A0522D',         // Sienna
    mexicaans: '#8B4513',      // Saddle brown
    indonesisch: '#704214',    // Dark earth
    marokkaans: '#B8860B',     // Dark goldenrod
    nederlands: '#9B7B72',     // Warm gray
    overig: '#5C342E',         // Raw umber
  },
  
  // Meal types - Consistent with palette
  mealType: {
    hoofdgerecht: '#4A1F1A',   // Oxide red
    voorgerecht: '#6B3023',    // Rust orange
    bijgerecht: '#8B5A4D',     // Terracotta
    dessert: '#A0522D',        // Sienna
    tussendoor: '#8B5A2B',     // Amber
    soep: '#5B7A72',           // Sage green
    salade: '#3D5A3B',         // Earthy green
    gebak: '#B8860B',          // Dark goldenrod
  },
  
  // Dietary badges
  dietary: {
    vegetarisch: '#3D5A3B',    // Earthy green
    vegan: '#2D4A2B',          // Deep green
    glutenvrij: '#8B5A2B',     // Amber
    lactosevrij: '#4A5C6B',    // Slate blue
  },
} as const;

export const typography = {
  // Font families
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  serif: '"Crimson Pro", Georgia, serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
  
  // Font sizes
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  // Font weights
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  xs: '0.5rem',   // 8px - base unit
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px - 2x base
  lg: '1.5rem',   // 24px - 3x base
  xl: '2rem',     // 32px - 4x base
  '2xl': '3rem',  // 48px - 6x base
  '3xl': '4rem',  // 64px - 8x base
  '4xl': '6rem',  // 96px - 12x base (luxury)
  '5xl': '8rem',  // 128px - 16x base (ultra luxury)
  '6xl': '10rem', // 160px - 20x base
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px - zeer subtiel, sophisticated
  md: '0.25rem',   // 4px - standaard, strak
  lg: '0.25rem',   // 4px - cards, consequent
  xl: '0.25rem',   // 4px - modals, consistent
  full: '9999px',  // pills/avatars (alleen waar nodig)
} as const;

export const shadows = {
  // Jouw specifieke multi-layer shadow
  soft: `
    0px 1px 1px rgba(3, 7, 18, 0.02),
    0px 5px 4px rgba(3, 7, 18, 0.04),
    0px 12px 9px rgba(3, 7, 18, 0.06),
    0px 20px 15px rgba(3, 7, 18, 0.08),
    0px 32px 24px rgba(3, 7, 18, 0.10)
  `,
  // Subtielere variant voor kleine elements
  card: `
    0px 1px 1px rgba(3, 7, 18, 0.02),
    0px 5px 4px rgba(3, 7, 18, 0.04),
    0px 12px 9px rgba(3, 7, 18, 0.06)
  `,
  // Elevated voor dropdowns/modals
  elevated: `
    0px 1px 1px rgba(3, 7, 18, 0.02),
    0px 5px 4px rgba(3, 7, 18, 0.04),
    0px 12px 9px rgba(3, 7, 18, 0.06),
    0px 20px 15px rgba(3, 7, 18, 0.08),
    0px 32px 24px rgba(3, 7, 18, 0.10),
    0px 48px 36px rgba(3, 7, 18, 0.12)
  `,
  none: 'none',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const maxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: '600ms cubic-bezier(0.65, 0, 0.35, 1)', // Expressievere easing
} as const;

// Grid system - 8pt base
export const grid = {
  baseUnit: 8,
  columns: 12,
  gutter: '1.5rem', // 24px - 3x base
  margin: {
    mobile: '1rem',  // 16px - 2x base
    tablet: '2rem',  // 32px - 4x base
    desktop: '4rem', // 64px - 8x base
  }
} as const;
