# 📰 Editorial Design Updates

## Concept: Magazine-Style Layout
Een meer editorial approach geïnspireerd door Kinfolk, Monocle en Cereal magazine.

---

## 🎨 Belangrijkste Wijzigingen

### 1. **Dark Hero Section** 
```
Background: Oxide Red → Raw Umber gradient
Text: Licht op donker (inverse)
Layout: Left-aligned, smal textvlak (max-width: 600px)
Typography: Justified text met hyphenation
```

**Waarom?**
- Dramatischer statement
- Betere focus op content
- Editorial magazine vibe
- Minder "corporate", meer persoonlijk

### 2. **Alternating Light/Dark Sections**
```
Hero: Dark (oxide red)
API Demo: Light (background)
Toast Demo: Dark (accent secondary)
Features: Light (background)
Auth Status: Dark (accent primary)
Footer: Dark (accent primary)
```

**Pattern:** Dark → Light → Dark → Light → Dark

### 3. **Justified Text in Narrow Columns**
```css
text-align: justify
hyphens: auto
-webkit-hyphens: auto
max-width: 600px (voor paragrafen)
```

**Voordelen:**
- Professional magazine look
- Betere leesbaarheid in smalle kolommen
- Clean, strakke rechter marge
- Minder "gaten" in text blocks

### 4. **Left-Aligned Headers** (geen center)
```
Alle h1, h2, h3: Left-aligned
Body text: Justified
Buttons/CTAs: Left-aligned with content flow
```

**Filosofie:**
- Natuurlijker leespatroon (F-pattern)
- Minder "marketing-achtig"
- Meer editorial/journal vibe
- Betere hiërarchie

---

## 📐 Layout Principes

### Smalle Tekstkolommen
```
Paragrafen: max-width: 600px
Cards: max-width: 2xl (672px)
Content containers: size="md" of "lg"
```

**Rule of thumb:** 60-75 karakters per regel voor optimale leesbaarheid

### Vertical Rhythm
```
Section padding: py-20 (80px)
Header margin-bottom: mb-4 tot mb-6
Paragraph spacing: space-y-4
```

### Whitespace
Meer breathing room tussen secties met alternerende kleuren.

---

## 🌓 Dark/Light Section Guidelines

### Dark Sections
```typescript
backgroundColor: colors.accent.primary | colors.accent.secondary
Text: colors.text.inverse (wit/cream)
Secondary text: colors.accent.lighter (blush pink)
Borders: colors.accent.hover
```

**Gebruik voor:**
- Hero sections
- Feature highlights
- Call-to-action blokken
- Footer

### Light Sections
```typescript
backgroundColor: colors.background | colors.surface
Text: colors.text.primary (deep brown)
Secondary text: colors.text.secondary
Borders: colors.border
```

**Gebruik voor:**
- Content blocks
- Forms
- Informational sections

---

## 📝 Typography Updates

### Hyphenation Support
```css
p {
  hyphens: auto;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  word-break: break-word;
}
```

### Text Utilities
```css
.text-justify {
  text-align: justify;
  hyphens: auto;
}
```

### Font Hierarchy
```
h1: 48-60px (3xl-5xl) - Serif, Bold
h2: 36-48px (4xl) - Serif, Bold
h3: 24-30px (xl-2xl) - Serif, Semibold
Body: 16-18px (base-lg) - Sans, Normal
Small: 14px (sm) - Sans, Normal
```

---

## 🎯 Component Updates

### Badge Component
- Nu accepteert `style` prop voor custom styling
- Kan gebruikt worden in dark sections met inverse colors

### Button Component
- Custom styling mogelijk via style prop
- Inverse variants voor dark backgrounds
- Border styling voor outline variants op dark

### Card Component
- Werkt op zowel light als dark backgrounds
- Subtle lift effect on hover
- 2px border radius (consistent)

### Footer Component
- **Dark design** (oxide red background)
- Three-column grid layout
- Justified text in description
- Left-aligned navigation

---

## 📖 Editorial Content Principles

### 1. **Meer Context**
Langere paragrafen met uitgebreidere uitleg:
- Van 1 zin → 3-4 zinnen
- Meer details over features
- Storytelling approach

### 2. **Narrow Focus**
- Max 600px text width
- Single column flow
- Clear visual hierarchy

### 3. **Better Flow**
- Dark sections voor "statements"
- Light sections voor "details"
- Consistent padding en spacing

### 4. **Professional Tone**
- Justified text = magazine quality
- Serif headings = editorial authority
- Dark accents = confidence

---

## 🎨 Color Usage in Context

### Hero (Dark)
```
Background: Gradient (oxide red → raw umber)
Primary text: Inverse (warm white)
Secondary text: Blush pink
Accent: Rust orange borders
```

### Content (Light)
```
Background: Warm white / Pale clay
Primary text: Deep brown
Secondary text: Raw umber
Accent: Oxide red (buttons, links)
```

### Features (Dark accent section)
```
Background: Accent secondary (raw umber)
Text: Inverse colors
Cards: White with dark text (contrast)
```

---

## ✨ Design Philosophy

**"Editorial Sophistication meets Earthy Warmth"**

1. **Magazine Layout** - Narrow columns, justified text
2. **Dark Drama** - Bold dark sections for impact
3. **Clean Hierarchy** - Left-aligned, clear flow
4. **Tactile Colors** - Warm earth tones throughout
5. **Professional Typography** - Serif headlines, hyphenated justified body

---

## 🚀 Implementation Checklist

- [x] Dark hero section met gradient
- [x] Justified text met hyphenation
- [x] Left-aligned headers (no center)
- [x] Alternating light/dark sections
- [x] Narrow text columns (max 600px)
- [x] Extended body copy (meer context)
- [x] Dark footer met grid layout
- [x] Badge style prop support
- [x] Button inverse variants
- [x] CSS hyphenation utilities

---

## 📚 Inspiratie Referenties

- **Kinfolk Magazine** - Justified text, narrow columns
- **Monocle** - Dark sections, editorial layout
- **Cereal Magazine** - Sophisticated typography
- **The Face** - Bold dark hero sections
- **Another Escape** - Nature-inspired earthy tones

---

**Result:** Een meer sophisticated, magazine-achtige ervaring met dramatische dark sections en professionele typography.
