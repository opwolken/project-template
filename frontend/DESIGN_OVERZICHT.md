# 🎨 Design Systeem Implementatie - OpenAI Stijl

## ✅ Wat is er gemaakt?

Een compleet, gestandaardiseerd design systeem geïnspireerd op OpenAI's moderne en strakke interface.

### 📁 Structuur

```
frontend/
├── lib/
│   └── design-system.ts          # Design tokens (kleuren, spacing, etc.)
├── components/
│   ├── index.ts                  # Centraal export bestand
│   ├── layout/
│   │   ├── Header.tsx            # Sticky navigatie header
│   │   ├── Footer.tsx            # Footer met links
│   │   └── Container.tsx         # Responsive container
│   └── ui/
│       ├── Button.tsx            # Button met variants
│       ├── Card.tsx              # Card component
│       ├── Input.tsx             # Input met labels
│       └── Badge.tsx             # Status badges
└── app/
    ├── layout.tsx                # Root layout met Header/Footer
    ├── page.tsx                  # Home - Hero + Features
    ├── dashboard/page.tsx        # Dashboard - Stats + Features
    ├── admin/page.tsx            # Admin - User management
    └── unauthorized/page.tsx     # Unauthorized - Error state
```

## 🎯 Componenten

### Layout Componenten

#### **Header**
- Sticky navigatie met blur effect
- Logo met gradient
- Dynamische navigatie links (gebaseerd op auth)
- Geïntegreerde LoginButton
- Volledig responsive

#### **Footer**
- Multi-column link structuur
- Brand sectie met logo
- Copyright en legal links
- Consistent met header styling

#### **Container**
- 5 maten: `sm`, `md`, `lg`, `xl`, `full`
- Responsive padding
- Max-width constraints

### UI Componenten

#### **Button**
5 variants:
- `primary` - Donker (neutral-900)
- `secondary` - Blauw (primary-500)
- `outline` - Border only
- `ghost` - Transparant
- `danger` - Rood

3 maten: `sm`, `md`, `lg`

Features:
- Disabled states
- Focus rings
- Smooth transitions
- Full width optie

#### **Card**
- 4 padding opties: `none`, `sm`, `md`, `lg`
- Hover effect (optioneel)
- Rounded corners (2xl)
- Border + shadow

#### **Input**
- Label support
- Error messages
- Help text
- Focus states
- Disabled states
- Full accessibility

#### **Badge**
5 variants:
- `default` - Grijs
- `success` - Groen
- `warning` - Oranje
- `danger` - Rood
- `info` - Blauw

2 maten: `sm`, `md`

## 🎨 Design Tokens

### Kleuren

**Primary (Sky Blue)**
```
50  - #f0f9ff
100 - #e0f2fe
...
900 - #0c4a6e
```

**Neutral (Gray)**
```
50  - #f9fafb
100 - #f3f4f6
...
950 - #030712
```

### Typografie
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Sizes**: xs (12px) → 6xl (60px)
- **Weights**: 400, 500, 600, 700

### Spacing
- **Scale**: xs (8px) → 5xl (128px)
- Consistent door hele app

## 📄 Pagina's

### Home (`/`)
- **Hero sectie** met badge, titel, beschrijving
- **CTA buttons** naar dashboard
- **API demo** met interactieve form
- **Features grid** (3 columns)
- **Auth status** section voor ingelogde gebruikers

### Dashboard (`/dashboard`)
- **Header** met icon en welkomstbericht
- **Success alert** voor autorisatie
- **Stats grid** (3 cards) met account info
- **Features overzicht** (2x2 grid)
- **Quick actions** buttons

### Admin (`/admin`)
- **Header** met icon
- **Add user form** met Input component
- **Users list** met badges en delete buttons
- **Empty state** wanneer geen users
- **Quick actions** navigation

### Unauthorized (`/unauthorized`)
- **Centered layout**
- **Warning icon** met gradient
- **Clear messaging** over ontbrekende rechten
- **Info box** met instructies
- **User info** met avatar

## 🚀 Gebruik

### Importeren
```tsx
// Alles tegelijk
import { Button, Card, Container, Badge } from '@/components';

// Of specifiek
import Button from '@/components/ui/Button';
```

### Nieuwe Pagina Maken
```tsx
import { Container, Card, Button } from '@/components';

export default function MyPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Container size="lg" className="py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">
          Mijn Pagina
        </h1>
        
        <Card padding="lg">
          <p className="text-neutral-600 mb-4">Content hier</p>
          <Button variant="primary">Actie</Button>
        </Card>
      </Container>
    </div>
  );
}
```

## 🎯 Standaardisatie Voordelen

✅ **Consistent** - Alle pagina's gebruiken dezelfde componenten
✅ **Herbruikbaar** - Componenten kunnen overal gebruikt worden
✅ **Maintainable** - Wijzigingen in design tokens propageren door hele app
✅ **Type-safe** - Volledige TypeScript support
✅ **Responsive** - Mobiel-first design
✅ **Accessible** - Focus states, ARIA labels, keyboard navigation

## 📝 Best Practices

1. **Gebruik altijd Container** voor page layouts
2. **Gebruik design tokens** in plaats van hardcoded waarden
3. **Blijf consistent** met spacing en typography
4. **Test responsive** op alle breakpoints
5. **Gebruik semantic HTML** voor accessibility

## 🔧 Aanpassingen

### Kleuren wijzigen
Edit `/lib/design-system.ts` en update color values

### Nieuwe component toevoegen
1. Maak component in `/components/ui/`
2. Export in `/components/index.ts`
3. Gebruik design tokens voor styling

### Nieuwe pagina stylen
1. Gebruik `Container` voor layout
2. Gebruik `Card` voor content blocks
3. Gebruik `Button` voor acties
4. Gebruik `Badge` voor status

## 📚 Documentatie

Zie `DESIGN_SYSTEM.md` voor volledige documentatie over:
- Alle componenten en hun props
- Design tokens en gebruik
- Responsive breakpoints
- Best practices
- Code voorbeelden

## 🎉 Resultaat

Een volledig gestandaardiseerde, moderne web applicatie met:
- Consistent design door alle pagina's
- OpenAI-geïnspireerde stijl
- Herbruikbare componenten
- Type-safe development
- Responsive op alle schermen
- Excellent developer experience

**Geniet van het bouwen met een professioneel design systeem! 🚀**
