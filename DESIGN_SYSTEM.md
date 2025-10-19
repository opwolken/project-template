# 🎨 Design System - Red Earth Sophistication

## Concept
**&Tradition-geïnspireerde minimalisme meets Red Earth Brutalism**

Een sophisticated design met warme aardtinten, strakke geometrie en gedurfde accenten. Geïnspireerd door Scandinavische meubelmerken zoals &Tradition en COS, gecombineerd met de tactiele warmte van klei, terracotta en natuurlijke materialen.

---

## 🎨 Kleurenpalet

### Primaire Kleuren - Red Earth

```
Oxide Red (Hoofdaccent)
HEX: #4A1F1A
RGB: 74, 31, 26
Gebruik: Buttons, links, belangrijke accenten
"Diep ijzeroxide rood - krachtig en aards"

Raw Umber (Secundair)
HEX: #5C342E
RGB: 92, 52, 46
Gebruik: Secundaire accenten, borders
"Ruwe aarde kleur - natuurlijk en warm"

Rust Orange (Hover)
HEX: #6B3023
RGB: 107, 48, 35
Gebruik: Hover states, interactie
"Roestkleur - dynamisch en levendig"
```

### Achtergronden & Surfaces

```
Warm White
HEX: #FAF6F4
RGB: 250, 246, 244
"Zachte basis met roze ondertoon"

Pure White
HEX: #FFFFFF
"Voor contrast en cards"

Pale Clay
HEX: #F2E8E5
RGB: 242, 232, 229
"Lichte klei - hover states"

Blush Pink
HEX: #F5EBE8
RGB: 245, 235, 232
"Zachte blush - subtiele accenten"
```

### Tekst Kleuren

```
Deep Brown (Primary)
HEX: #2D1410
RGB: 45, 20, 16
"Primaire tekst - rijk en leesbaar"

Raw Umber (Secondary)
HEX: #5C342E
"Secundaire tekst en labels"

Warm Gray-Brown (Tertiary)
HEX: #9B7B72
"Helptext en disabled states"
```

### Earth Tones (Extra palette)

```
Clay: #F2E8E5
Sand: #E8DDD6
Stone: #D9D2CE
Terracotta: #8B5A4D
```

---

## 📐 Vormgeving

### Border Radius - Strak & Minimalistisch
```typescript
none: 0px          // Helemaal recht (hero elements)
sm: 2px            // Zeer subtiel (cards, inputs)
md: 4px            // Standaard (buttons)
lg: 4px            // Consistent (modals)
full: 9999px       // Alleen voor avatars/pills
```

**Filosofie**: Harde hoeken creëren een moderne, architectonische look. Subtle afronding (2-4px) voorkomt te "brutaal" maar behoudt strakheid.

### Spacing
```
xs: 8px    sm: 12px    md: 16px
lg: 24px   xl: 32px    2xl: 48px
3xl: 64px  4xl: 96px   5xl: 128px
```

### Shadows - Zacht en natuurlijk
```css
/* Card shadow - subtiel */
0px 1px 1px rgba(3, 7, 18, 0.02),
0px 5px 4px rgba(3, 7, 18, 0.04),
0px 12px 9px rgba(3, 7, 18, 0.06)

/* Soft shadow - hover states */
Volledige multi-layer met tot 10% opacity

/* Elevated - modals/dropdowns */
Extra laag met 12% opacity
```

---

## 🔤 Typography

### Fonts
```
Sans: Inter (modern, tech)
Serif: Crimson Pro (elegant, headings)
Mono: JetBrains Mono (code)
```

### Font Sizes
```
xs: 12px   sm: 14px   base: 16px
lg: 18px   xl: 20px   2xl: 24px
3xl: 30px  4xl: 36px  5xl: 48px
6xl: 60px
```

### Weights
```
normal: 400    medium: 500
semibold: 600  bold: 700
```

**Tip**: Gebruik serif font voor headings (h1-h6), sans-serif voor body text.

---

## 🎯 Component Guidelines

### Buttons
- **Primary**: Oxide Red achtergrond, witte tekst, 2px radius
- **Secondary**: Witte achtergrond, border, hover met pale clay
- **Outline**: Transparant, rode border (1.5px), hover met accent-light
- **Ghost**: Transparant, subtiele hover

### Cards
- **Border**: 1px warm sand (#E8DDD6)
- **Radius**: 2px (zeer subtiel)
- **Hover**: Lift effect met shadow + warme accent border
- **Background**: Pure white

### Inputs
- **Border**: 1.5px voor prominence
- **Focus**: Oxide Red border
- **Radius**: 2px
- **Error**: Deep red border

### Badges
- **Accent variant**: Pale clay background, oxide red tekst
- **Radius**: 2px voor consistency
- **Border**: Altijd 1px voor definitie

---

## 🌈 Semantic Colors

```
Success: #3D5A3B (earthy green)
Warning: #8B5A2B (warm amber)
Error: #7A2E26 (deep red)
Info: #4A5C6B (slate blue)
```

Allemaal aangepast aan het warme, aardse palet.

---

## ✨ Design Principes

1. **Sophisticated Minimalism**: Minder is meer, maar met warmte
2. **Tactile Materials**: Kleuren die voelen als klei, hout, steen
3. **Geometric Precision**: Strakke lijnen, harde hoeken, clean layouts
4. **Warm Contrast**: Donker rood tegen zacht roze/beige
5. **Functional Beauty**: Elk element heeft een doel
6. **Scandinavian Restraint**: Luxe door eenvoud

---

## 🎪 Inspiratie Referenties

- **&Tradition** - Danish furniture design
- **COS** - Minimalist fashion
- **Muji** - Japanese simplicity
- **Kinfolk Magazine** - Earthy editorial
- **Another Escape** - Nature-inspired design
- **Desert Modernism** - Architecture meets nature

---

## 🚀 Implementatie Checklist

- [x] Colors in design-system.ts
- [x] CSS variables in globals.css
- [x] Border radius updates (0-4px)
- [x] Button component (rounded-sm, hover states)
- [x] Card component (2px radius, hover lift)
- [x] Input component (1.5px border, focus states)
- [x] Badge component (consistent styling)
- [x] Toast component (sharp corners)
- [x] Header component (subtle accents)
- [x] Homepage styling (color integration)

---

**Gemaakt met ❤️ voor een warmer, gerichter design**
