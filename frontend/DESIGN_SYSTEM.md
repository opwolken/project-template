# Design Systeem

Dit project gebruikt een modern, gestandaardiseerd design systeem geïnspireerd op OpenAI's website.

## 🎨 Overzicht

Het design systeem bestaat uit:
- **Design tokens** - kleuren, typografie, spacing
- **Layout componenten** - Header, Footer, Container
- **UI componenten** - Button, Card, Input, Badge
- **Herbruikbare patterns** - consistent door hele applicatie

## 📦 Componenten

### Layout

#### `Header`
Sticky navigatie header met logo, navigatie links en authenticatie.

```tsx
import { Header } from '@/components';
// Automatisch geïmporteerd in layout.tsx
```

#### `Footer`
Footer met links en copyright informatie.

```tsx
import { Footer } from '@/components';
// Automatisch geïmporteerd in layout.tsx
```

#### `Container`
Responsive container voor content met max-width en padding.

```tsx
import { Container } from '@/components';

<Container size="lg">
  {/* Je content */}
</Container>

// Sizes: 'sm' | 'md' | 'lg' | 'xl' | 'full'
```

### UI Componenten

#### `Button`
```tsx
import { Button } from '@/components';

<Button variant="primary" size="md">
  Click me
</Button>

// Variants: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
// Sizes: 'sm' | 'md' | 'lg'
```

#### `Card`
```tsx
import { Card } from '@/components';

<Card padding="md" hover>
  {/* Content */}
</Card>

// Padding: 'none' | 'sm' | 'md' | 'lg'
// hover: boolean
```

#### `Input`
```tsx
import { Input } from '@/components';

<Input
  label="Email"
  placeholder="je@email.nl"
  error="Dit veld is verplicht"
  helpText="Voer een geldig email adres in"
/>
```

#### `Badge`
```tsx
import { Badge } from '@/components';

<Badge variant="success" size="md">
  Actief
</Badge>

// Variants: 'default' | 'success' | 'warning' | 'danger' | 'info'
// Sizes: 'sm' | 'md'
```

## 🎯 Design Tokens

### Kleuren

**Primary (Sky Blue)**
- `primary-50` tot `primary-900`
- Gebruik voor primaire acties en links

**Neutral (Gray)**
- `neutral-50` tot `neutral-950`
- Gebruik voor tekst, borders, backgrounds

**Accent**
- `accent-purple` - Speciale highlights
- `accent-green` - Success states
- `accent-orange` - Warnings
- `accent-red` - Errors

### Typografie

**Font families**
```css
font-sans: Geist Sans (primary)
font-mono: Geist Mono (code)
```

**Font sizes**
- `xs`: 12px
- `sm`: 14px
- `base`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px
- `5xl`: 48px
- `6xl`: 60px

**Font weights**
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

### Spacing

Consistent spacing scale:
- `xs`: 8px
- `sm`: 12px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px
- `4xl`: 96px
- `5xl`: 128px

### Border Radius

- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `2xl`: 24px
- `full`: 9999px

## 🚀 Gebruik

### Importeren

Alle componenten kunnen individueel geïmporteerd worden:

```tsx
import { Button, Card, Container, Badge } from '@/components';
```

Of specifiek:

```tsx
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
```

### Nieuwe Pagina Maken

1. Gebruik `Container` voor responsive layout
2. Gebruik `Card` voor content blocks
3. Gebruik `Button` voor acties
4. Gebruik `Badge` voor status indicators

Voorbeeld:

```tsx
import { Container, Card, Button, Badge } from '@/components';

export default function MyPage() {
  return (
    <Container size="lg" className="py-12">
      <div className="mb-8">
        <Badge variant="info">Nieuw</Badge>
        <h1 className="text-4xl font-bold text-neutral-900 mt-2">
          Mijn Pagina
        </h1>
      </div>

      <Card padding="lg">
        <p className="text-neutral-600 mb-4">
          Jouw content hier
        </p>
        <Button variant="primary">
          Actie
        </Button>
      </Card>
    </Container>
  );
}
```

## 🎨 Styling Best Practices

1. **Gebruik design tokens** - Gebruik altijd de gedefinieerde kleuren
2. **Consistent spacing** - Gebruik de spacing scale
3. **Responsive design** - Test op alle schermformaten
4. **Accessibility** - Zorg voor goede contrast ratios
5. **Dark mode ready** - Gebruik CSS variabelen waar mogelijk

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

Gebruik Tailwind's responsive prefixes:

```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

## 🔧 Aanpassen

Design tokens bevinden zich in `/lib/design-system.ts`. Pas hier waarden aan om het hele systeem te updaten.

## 📚 Meer Informatie

- [Tailwind CSS](https://tailwindcss.com)
- [Next.js](https://nextjs.org)
- [Geist Font](https://vercel.com/font)
