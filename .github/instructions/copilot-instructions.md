# GitHub Copilot Instructions

## Project Context

Dit is een **minimalistisch Firebase stack project**: Next.js (static) + Python Firebase Functions + Firestore.

**Live**: daanblom.nl  
**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind 4, Python 3.9+, Firebase

---

## Code Filosofie

### Minimalistisch & Consistent
- **Houd code kort**: Prefer bondigheid boven verbositeit
- **DRY principe**: Als je 2x hetzelfde ziet → refactor naar herbruikbare component/utility
- **Gerelateerde code samen**: Houd logica die bij elkaar hoort in 1 bestand
- **Geen dead code**: Verwijder unused imports, components, functies direct

### Herbruikbaarheid
- **Gebruik bestaande UI components** uit `components/ui/` eerst
- **Check design-system.ts** voor kleuren, spacing, shadows voor je custom styles maakt
- **Nieuwe generieke components** → `components/ui/`
- **Feature-specifieke components** → `components/[feature]/`

### Voor je maatwerk maakt
1. Check of er al een component bestaat
2. Check of er een utility functie voor is
3. Als je het 2x doet → refactor beide naar shared solution

---

## Design System

### Stijl Inspiratie
Spotify + Airbnb + OpenAI: minimalistisch, strak, veel ruimte, geen emoji's.

### Kleuren (Earthy, Minimal)
```typescript
background: '#FAFAF9'      // off-white
surface: '#FFFFFF'         // cards
text.primary: '#18181B'    // off-black
text.secondary: '#52525B'  // gray
accent.primary: '#7C2D12'  // dark earthy red
accent.secondary: '#92400E' // burnt orange
border: '#E4E4E7'          // subtle
```

### Typography
- **Sans-serif**: Inter (UI, body text)
- **Serif**: Crimson Pro (headings, emphasis)
- **Monospace**: JetBrains Mono (code blocks)

### Shadows
Gebruik de multi-layer shadow uit `design-system.ts`:
```typescript
shadows.soft    // standaard voor cards
shadows.card    // subtiel voor kleine elements
shadows.elevated // modals/dropdowns
```

### Spacing & Rondingen
- **Veel ruimte**: Generous padding, margins
- **Subtiele rondingen**: border-radius 4px-12px (niet te rond)
- **Clean borders**: 1px, subtle grays

---

## Component Patronen

### UI Components
- **Locatie**: `components/ui/`
- **Gebruik design tokens**: Import from `lib/design-system.ts`
- **TypeScript**: Altijd typed props
- **Composable**: Flexibel, niet te specifiek

### Layout Components
- **Locatie**: `components/layout/`
- **Container**: Centered, max-width, padding
- **Header/Footer**: Minimal, subtle

### Feature Components
- **Locatie**: `components/[feature]/`
- **Use UI components**: Build met bestaande UI blocks
- **Co-locate**: Related components bij elkaar

---

## File Structuur

```
frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Routes
│   └── [feature]/         # Feature folders
├── components/
│   ├── ui/                # Design system components
│   ├── layout/            # Layout components
│   └── [feature]/         # Feature-specific
├── lib/
│   ├── design-system.ts   # Design tokens (CHECK EERST!)
│   ├── firebase.ts        # Firebase config
│   └── [feature]Context.tsx # Contexts

api/
├── main.py                # Firebase Functions endpoints
├── lib/                   # Utilities & clients
│   ├── gemini_client.py   # Gemini AI (chat + image)
│   └── tavily_client.py   # Tavily search
└── requirements.txt
```

---

## Code Style

### TypeScript/React
```typescript
// Prefer named exports
export function Component() {}

// Type props
interface Props {
  title: string;
  optional?: boolean;
}

// Destructure props
export function Card({ title, optional }: Props) {
  return <div>...</div>
}

// Use design tokens
import { colors, spacing } from '@/lib/design-system'
```

### Python
```python
# Type hints altijd
def function(param: str) -> dict:
    """Docstring voor complexe functies"""
    return {}

# Gebruik bestaande clients
from lib import GeminiClient, TavilyClient
```

### CSS/Tailwind
```tsx
// Gebruik design system kleuren
<div className="bg-[#FAFAF9]">  // Als het in design-system staat

// Of custom via design-system
style={{ 
  color: colors.text.primary,
  boxShadow: shadows.soft 
}}
```

---

## Git Workflow

### Branch Naming
```
feature/descriptive-name
fix/bug-description
refactor/what-changed
docs/what-updated
```

### Commit Messages
```
feat: nieuwe feature
fix: bug fix
refactor: code cleanup
style: design changes
docs: documentatie
chore: dependencies/config
```

### Voor je commit
1. Verwijder unused imports
2. Check voor console.logs
3. Verify TypeScript errors zijn weg
4. Test lokaal

---

## AI Features

### Gemini (api/lib/gemini_client.py)
```python
from lib import GeminiClient

client = GeminiClient()
response = client.chat("message")
response = client.chat_with_image("beschrijf", image_data)

# Streaming
for chunk in client.stream_chat("message"):
    print(chunk)
```

### Tavily (api/lib/tavily_client.py)
```python
from lib import TavilyClient

client = TavilyClient()
results = client.get_clean_results("query", max_results=5)

# Search + AI summary combo
from lib import search_and_summarize
summary = search_and_summarize("query")
```

---

## Firebase

### Authentication
- **Google Sign-in** enabled
- **Authorized domains**: localhost, daanblom.nl
- **Admin check**: `authorized_users` collection in Firestore

### Authorization Pattern
```typescript
// Check admin status
const isAdmin = await checkIsAdmin(user.email)

// Protect routes
if (!isAdmin) redirect('/unauthorized')
```

### Firestore Collections
```
authorized_users/
  {email}/
    approved: boolean
```

---

## Development Workflow

### Start Development
```bash
npm run dev  # Frontend + emulators
```

### URLs
- Frontend: http://localhost:3000
- Emulator UI: http://localhost:4000
- API: `/api/*` routes

### Voor nieuwe dependencies
```bash
# Frontend
cd frontend && npm install package-name

# Python
pip install package-name
# Update api/requirements.txt
```

---

## Refactoring Triggers

**Refactor wanneer:**
1. 🔴 Zelfde code op 2+ plekken
2. 🔴 Component > 200 lijnen
3. 🔴 Functie > 50 lijnen (meestal)
4. 🔴 Nested ternaries of if statements (> 3 diep)
5. 🔴 Magic numbers/strings (gebruik constants)

**Refactor naar:**
- Shared utility functie → `lib/utils.ts`
- Reusable component → `components/ui/`
- Custom hook → `lib/hooks/use[Feature].ts`
- Context voor state → `lib/[Feature]Context.tsx`

---

## Testing & Quality

### Voor je iets push
- [ ] TypeScript errors weg
- [ ] Unused imports verwijderd
- [ ] Console.logs verwijderd (of commented waarom ze er zijn)
- [ ] Lokaal getest (npm run dev)
- [ ] Design consistent met bestaande pages

### Error Handling
```typescript
// Altijd user-friendly messages
try {
  await action()
} catch (error) {
  console.error('Debug info:', error)
  toast.error('Begrijpelijke melding voor gebruiker')
}
```

---

## Priorities

**Altijd:**
1. Herbruikbaarheid > custom solutions
2. Minimaal > uitgebreid
3. Consistent > origineel
4. Gebruikerservaring > features

**Vraag bij twijfel:**
- Is er al een component voor?
- Kan ik design tokens gebruiken?
- Doe ik dit ergens anders ook?
- Is dit de minimale oplossing?

---

## Quick Reference

**Design System**: `frontend/lib/design-system.ts`  
**UI Components**: `frontend/components/ui/`  
**AI Clients**: `api/lib/gemini_client.py`, `api/lib/tavily_client.py`  
**Roadmap**: `ROADMAP.md` (voor volgende features)  
**Setup**: `CONTRIBUTING.md` (voor nieuwe developers)

---

**Laatste Update**: 18 oktober 2025
