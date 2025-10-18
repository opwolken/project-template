/**
 * Design System - Minimalistisch, Earthy, Refined
 * Geïnspireerd door Spotify, Airbnb, OpenAI
 */

export const colors = {
  // Background & Surfaces
  background: '#FAFAF9',      // off-white
  surface: '#FFFFFF',         // pure white voor cards
  surfaceHover: '#F5F5F4',    // subtle hover state
  
  // Text
  text: {
    primary: '#18181B',       // off-black
    secondary: '#52525B',     // medium gray
    tertiary: '#A1A1AA',      // light gray
    inverse: '#FAFAF9',       // voor dark backgrounds
  },
  
  // Accent - Extra donker, bijna zwart met rode tint
  accent: {
    primary: '#1A0A08',       // zeer donkerrood, bijna zwart
    secondary: '#2C1410',     // iets lichter donkerrood
    hover: '#3D1E18',         // hover state
    light: '#FEF2F2',         // very light red voor backgrounds
  },
  
  // Semantic
  success: '#166534',         // dark green
  warning: '#92400E',         // amber
  error: '#991B1B',           // red
  info: '#1E40AF',            // blue
  
  // Borders & Dividers
  border: '#E4E4E7',          // subtle border
  borderHover: '#D4D4D8',     // hover state
  divider: '#F4F4F5',         // lighter divider
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
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
  '5xl': '8rem',  // 128px
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px - subtiel
  md: '0.5rem',    // 8px - standaard
  lg: '0.75rem',   // 12px - cards
  xl: '1rem',      // 16px - modals
  full: '9999px',  // pills/avatars
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
} as const;
