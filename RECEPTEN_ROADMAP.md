# 🎯 MASTER PLAN: Multi-App Architecture (recepten.daanblom.nl)

## 📊 Overzicht

**Doel:** Receptenwebsite bouwen op recepten.daanblom.nl binnen bestaande repo
**Apps nu:** daanblom.nl (main), recepten.daanblom.nl
**Apps later:** facturatie.daanblom.nl, etc.

---

## 🏗️ FASE 1: INFRASTRUCTURE & ARCHITECTURE (1-2 dagen)

### ✅ 1.1 Backend Permission System
**Bestand:** `api/lib/permissions.py` ✓ DONE
- Multi-app permission checker
- Role-based access (superadmin, recipe_editor, etc.)
- Granular permissions per app

**Volgende stap:** Test permissions in routes

---

### ✅ 1.2 Frontend Permission Hook
**Bestand:** `frontend/lib/hooks/usePermissions.ts`
- React hook voor permission checks
- Integration met AuthContext
- Real-time permission updates

```typescript
export function usePermissions() {
  // Returns: canReadRecipes, canWriteRecipes, isSuperAdmin, etc.
}
```

---

### ✅ 1.3 Firestore Data Model Setup

**Collections:**

```
recepten/
  {recipe_id}/
    recept_naam: string
    recept_foto: string (URL)
    recept_samenvatting: string
    recept_keuken: string[]           # ["Grieks", "Mediterraans"]
    recept_gerechtsoort: string[]     # ["Hoofdgerecht", "Kip"]
    recept_type: string[]             # ["Kip", "Vlees"]
    recept_basis: string[]            # ["Pita", "Rijst"]
    recept_auteur: string             # "Daan", "Mariëtte", etc.
    recept_bereidingstijd: number     # minutes
    recept_aantal_personen: number
    recept_ingredientenlijst: string[]
    recept_bereidingswijzelijst: string[]
    created_at: timestamp
    updated_at: timestamp
    created_by: string                # email
    status: "draft" | "published"

taxonomies/
  keukens/
    items: string[]                   # ["Amerikaans", "Chinees", ...]
  
  gerechtsoorten/
    items: string[]                   # ["Bijgerecht", "Hoofdgerecht", ...]
  
  types/
    items: string[]                   # ["Vlees", "Vis", "Vegetarisch", ...]
  
  bases/
    items: string[]                   # ["Pasta", "Rijst", "Aardappelen", ...]
  
  chefs/
    items: string[]                   # ["Daan", "Bianca", "Emée", ...]

authorized_users/
  {email}/
    admin: boolean                    # Backwards compat
    role: "superadmin" | "recipe_editor" | "accountant"
    permissions: {
      recipes: { read: bool, write: bool, delete: bool }
      invoices: { read: bool, write: bool, delete: bool }
      dashboard: boolean
    }
```

**Acties:**
- [ ] Firestore rules updaten voor recepten collection
- [ ] Taxonomies seed data toevoegen
- [ ] Je eigen user upgraden naar superadmin met permissions

---

### ✅ 1.4 Next.js Route Groups Setup
**Doel:** Verschillende layouts per app

```
frontend/app/
├── (main)/                  # daanblom.nl - bestaande site
│   ├── layout.tsx          # Main layout (Header/Footer)
│   ├── page.tsx
│   ├── dashboard/
│   ├── ai/
│   └── unauthorized/
│
├── (recepten)/             # recepten.daanblom.nl - NIEUW
│   └── recepten/
│       ├── layout.tsx      # Recepten-specific layout
│       ├── page.tsx        # Lijst met filters
│       ├── [id]/
│       │   └── page.tsx    # Detail pagina
│       ├── nieuw/
│       │   └── page.tsx    # Handmatig toevoegen
│       └── generator/
│           └── page.tsx    # AI generator
│
└── layout.tsx              # Root layout (fonts, providers)
```

**Acties:**
- [ ] Route groups aanmaken
- [ ] Bestaande routes verplaatsen naar (main)
- [ ] Recepten layout met eigen navigatie maken

---

### ✅ 1.5 Firebase Hosting Multi-Site Setup
**Bestand:** `firebase.json`

```json
{
  "hosting": [
    {
      "site": "daanblom-main",
      "public": "frontend/out",
      "rewrites": [
        { "source": "/api/**", "function": "api" },
        { "source": "**", "destination": "/index.html" }
      ]
    }
  ]
}
```

**Firebase Console:**
- [ ] Extra hosting site toevoegen (recepten-daanblom)
- [ ] Custom domain recepten.daanblom.nl koppelen
- [ ] SSL certificaat automatisch genereren

---

### ✅ 1.6 DNS Configuration
**Provider:** Cloudflare / TransIP / waar je DNS staat

**Records toevoegen:**
```
Type: CNAME
Name: recepten
Target: daanblom.nl (of Firebase hosting target)
TTL: Auto

OF (als Firebase het vraagt):

Type: A
Name: recepten
Target: [Firebase IP addresses]
```

**Verificatie:**
- [ ] TXT record voor domain verificatie (Firebase geeft deze)
- [ ] Wachten op SSL provisioning (kan 24u duren)

---

## 🎨 FASE 2: DESIGN SYSTEM & COMPONENTS (1 dag)

### ✅ 2.1 Recepten Design Tokens
**Bestand:** `frontend/lib/design-system.ts` (updaten)

```typescript
export const recipeColors = {
  cuisine: {
    italiaans: '#C2410C',      // Terracotta
    grieks: '#0369A1',         // Mediterranean blue
    chinees: '#DC2626',        // Red
    // ... meer
  },
  mealType: {
    hoofdgerecht: '#7C2D12',
    voorgerecht: '#92400E',
    dessert: '#BE185D',
  }
};
```

---

### ✅ 2.2 UI Components (hergebruiken + uitbreiden)

**Bestaand (al gemaakt):**
- ✓ Card.tsx
- ✓ Badge.tsx
- ✓ Button.tsx
- ✓ Input.tsx
- ✓ LoadingSpinner.tsx

**Nieuw maken:**
- [ ] `components/ui/Select.tsx` - Dropdown voor filters
- [ ] `components/ui/Textarea.tsx` - Voor ingrediënten/bereiding
- [ ] `components/ui/ImageUpload.tsx` - Foto upload component
- [ ] `components/ui/TagInput.tsx` - Multi-select tags

---

### ✅ 2.3 Recepten-Specific Components
**Map:** `frontend/components/recepten/`

```
recepten/
├── RecipeCard.tsx           # Grid card met foto + info
├── RecipeDetail.tsx         # Volledige receptweergave
├── RecipeForm.tsx           # Form voor toevoegen/bewerken
├── RecipeFilters.tsx        # Filter sidebar/panel
├── RecipeGenerator.tsx      # AI generator interface
├── RecipeList.tsx           # Grid layout met cards
├── RecipeNav.tsx            # Recepten-specific navigatie
├── IngredientList.tsx       # Ingrediënten met portioning
└── PreparationSteps.tsx     # Stap-voor-stap bereiding
```

---

## 🔧 FASE 3: BACKEND API (1-2 dagen)

### ✅ 3.1 Recipe API Routes
**Bestand:** `api/routes/recipe_routes.py`

**Endpoints:**
```python
# CRUD Operations
GET    /api/recipes              # List (met filters: ?cuisine=Grieks&type=Hoofdgerecht)
GET    /api/recipes/{id}         # Single recipe detail
POST   /api/recipes              # Create (admin only)
PUT    /api/recipes/{id}         # Update (admin only)
DELETE /api/recipes/{id}         # Delete (admin only)

# Special Features
POST   /api/recipes/generate     # AI generator
GET    /api/recipes/search       # Full-text search
GET    /api/recipes/random       # Random recept suggestie
POST   /api/recipes/{id}/duplicate  # Clone recept
```

**Features:**
- Permission checks via `lib/permissions.py`
- Input validation
- Image URL validation
- Status management (draft/published)
- Filters & search
- Pagination

---

### ✅ 3.2 Taxonomy API Routes
**Bestand:** `api/routes/recipe_routes.py` (zelfde file)

```python
GET /api/recipes/taxonomies           # All taxonomies
GET /api/recipes/taxonomies/keukens   # Specific taxonomy
```

---

### ✅ 3.3 AI Recipe Generator Logic
**Bestand:** `api/lib/recipe_generator.py`

**Flow:**
1. User input: URL / foto / tekst
2. Gemini parseert → JSON (recept schema)
3. Tavily zoekt matching image (optioneel)
4. Return structured data voor preview
5. User bewerkt → Save to Firestore

**Prompts:**
```python
RECIPE_EXTRACTION_PROMPT = """
Extraheer uit deze tekst/foto een recept in JSON formaat:
{
  "recept_naam": "...",
  "recept_samenvatting": "...",
  "recept_keuken": ["..."],
  ...
}
"""
```

---

### ✅ 3.4 Router Integration
**Bestand:** `api/lib/router.py`

```python
# Import recipe routes
from routes.recipe_routes import recipe_bp

# Register blueprint
app.register_blueprint(recipe_bp, url_prefix='/api/recipes')
```

---

## 📱 FASE 4: FRONTEND PAGES (2-3 dagen)

### ✅ 4.1 Recepten Layout & Navigation
**Bestand:** `frontend/app/(recepten)/recepten/layout.tsx`

```tsx
export default function ReceptenLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <ReceptenNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

**ReceptenNav features:**
- Logo / branding
- Search bar
- "Nieuw Recept" button (admin only)
- User menu
- Sticky header

---

### ✅ 4.2 Receptenlijst Pagina
**Bestand:** `frontend/app/(recepten)/recepten/page.tsx`

**Features:**
- Grid layout (3 columns desktop, responsive)
- RecipeCard components
- Filter sidebar (keukens, types, etc.)
- Search functionaliteit
- Sorting (nieuwste, populairste, A-Z)
- Pagination
- Loading states
- Empty states

**UI:**
```
┌─────────────────────────────────────┐
│  [Search bar]  [Filter] [+ Nieuw]  │
├─────────┬───────────────────────────┤
│ Filters │  [Card] [Card] [Card]    │
│ ├ Keuken│  [Card] [Card] [Card]    │
│ ├ Gang  │  [Card] [Card] [Card]    │
│ ├ Type  │                           │
│ └ Chef  │  [Load more...]           │
└─────────┴───────────────────────────┘
```

---

### ✅ 4.3 Recept Detail Pagina
**Bestand:** `frontend/app/(recepten)/recepten/[id]/page.tsx`

**Features:**
- Hero image met gradient overlay
- Titel + samenvatting + badges
- Personen calculator (2 → 4 personen)
- Ingrediëntenlijst met checkboxes
- Stap-voor-stap bereiding
- "Kopieer boodschappenlijst" button
- Print-friendly view
- Share buttons (optioneel)
- Edit button (admin only)

**Layout:**
```
┌──────────────────────────────────┐
│  [Large Hero Image]              │
│  ┌─ Gyros Kip                    │
│  └─ 🕐 30 min | 👤 2 pers | 🇬🇷 │
├──────────────────────────────────┤
│ Ingrediënten    │  Bereiding      │
│ ☐ 350g kip      │  1. Snij ui...  │
│ ☐ 1 bosui       │  2. Doe olie... │
│ ☐ 2 teen...     │  3. Bak de...   │
│                 │                  │
│ [Kopieer lijst] │  [Print]  [Edit]│
└──────────────────────────────────┘
```

---

### ✅ 4.4 Handmatig Recept Toevoegen
**Bestand:** `frontend/app/(recepten)/recepten/nieuw/page.tsx`

**Features:**
- Protected route (admin only)
- RecipeForm component
- Image upload (Firebase Storage)
- Taxonomie selectie (button groups)
- Multi-line inputs (ingrediënten, bereiding)
- Draft/Publish toggle
- Preview mode
- Auto-save (optioneel)

**Form fields:**
- Titel
- Samenvatting
- Foto (upload of URL)
- Keuken (multi-select)
- Gang (multi-select)
- Type gerecht (multi-select)
- Gerechtsbasis (multi-select)
- Chef
- Bereidingstijd
- Aantal personen
- Ingrediënten (list)
- Bereiding (list)
- Status (draft/published)

---

### ✅ 4.5 AI Recipe Generator
**Bestand:** `frontend/app/(recepten)/recepten/generator/page.tsx`

**Features:**
- Protected route (admin only)
- Large textarea voor input
- Example prompts
- "Genereer Recept" button
- Loading state (streaming)
- Preview card met gegenereerd recept
- Edit mogelijkheid
- "Opslaan als Recept" button

**User Flow:**
1. Plak URL of beschrijving
2. Click "Genereer"
3. AI parseert → JSON
4. Preview in RecipeDetail format
5. Bewerk indien nodig
6. Save naar Firestore

**UI:**
```
┌──────────────────────────────────┐
│  AI Recept Generator             │
├──────────────────────────────────┤
│  [Large Textarea]                │
│  Bijv: "Pasta carbonara recept"  │
│  of "Vegetarische lasagne met    │
│  courgette" of plak een URL...   │
│                                   │
│  [Genereer Recept]               │
├──────────────────────────────────┤
│  Preview:                         │
│  ┌────────────────────────────┐  │
│  │ [Generated Recipe Card]    │  │
│  │ [Editable fields]          │  │
│  └────────────────────────────┘  │
│                                   │
│  [Opslaan] [Opnieuw genereren]   │
└──────────────────────────────────┘
```

---

## 🔐 FASE 5: SECURITY & PERMISSIONS (parallel met fase 4)

### ✅ 5.1 Firestore Rules Update
**Bestand:** `firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Recepten
    match /recepten/{recipeId} {
      // Iedereen kan published recepten lezen
      allow read: if resource.data.status == 'published' || isAdmin();
      
      // Alleen admins kunnen schrijven
      allow create, update, delete: if isAdmin() || canWriteRecipes();
    }
    
    // Taxonomies (read-only voor iedereen)
    match /taxonomies/{doc=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Authorized users
    match /authorized_users/{email} {
      allow read: if request.auth != null && request.auth.token.email == email;
      allow write: if false; // Only via backend
    }
    
    // Helper functions
    function isAdmin() {
      return request.auth != null && 
        exists(/databases/$(database)/documents/authorized_users/$(request.auth.token.email)) &&
        get(/databases/$(database)/documents/authorized_users/$(request.auth.token.email)).data.admin == true;
    }
    
    function canWriteRecipes() {
      return request.auth != null && 
        exists(/databases/$(database)/documents/authorized_users/$(request.auth.token.email)) &&
        get(/databases/$(database)/documents/authorized_users/$(request.auth.token.email)).data.permissions.recipes.write == true;
    }
  }
}
```

---

### ✅ 5.2 Protected Routes Middleware
**Bestand:** `frontend/lib/hooks/useProtectedRoute.ts` (updaten)

```typescript
export function useProtectedRoute(requiredPermission: string) {
  // Check permissions
  // Redirect if unauthorized
}
```

**Usage:**
```tsx
// In generator page
export default function GeneratorPage() {
  useProtectedRoute('recipes.write');
  // ...
}
```

---

### ✅ 5.3 API Authentication Middleware
**Bestand:** `api/lib/auth_middleware.py` (nieuw)

```python
def require_recipe_write(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check Firebase auth token
        # Check permissions
        # Return 403 if unauthorized
    return decorated_function
```

---

## 🎨 FASE 6: IMAGE HANDLING (1 dag)

### ✅ 6.1 Firebase Storage Setup
**Buckets:**
```
recepten/
  {recipe_id}/
    hero.jpg
    thumbnail.jpg
```

---

### ✅ 6.2 Image Upload Component
**Bestand:** `frontend/components/ui/ImageUpload.tsx`

**Features:**
- Drag & drop
- Preview
- Crop/resize (optioneel)
- Upload naar Firebase Storage
- Return public URL
- Loading states

---

### ✅ 6.3 Image Optimization
**Options:**
- Next.js Image component
- Firebase Storage resize extension (auto thumbnails)
- Lazy loading
- Blur placeholders

---

## 🔍 FASE 7: SEARCH & FILTERS (1 dag)

### ✅ 7.1 Client-Side Filtering
**Bestand:** `frontend/components/recepten/RecipeFilters.tsx`

**Features:**
- Multi-select filters
- URL state (query params)
- Clear all filters
- Active filter badges
- Count per filter option

---

### ✅ 7.2 Search Implementation
**Options:**

**A) Firestore queries** (simple)
- Limited text search
- Filter op velden

**B) Algolia** (advanced, kost geld)
- Full-text search
- Typo tolerance
- Faceted search

**C) Backend full-text** (DIY)
- Python search in Firestore
- Basic matching

**Keuze:** Start met A, upgrade naar B als nodig

---

### ✅ 7.3 Tavily Integration (voor AI search)
**Bestand:** `api/lib/recipe_generator.py`

```python
# Als user een URL geeft
tavily_client.search(f"recipe image for {recipe_name}")
# Return beste image URL
```

---

## 🧪 FASE 8: TESTING & REFINEMENT (1 dag)

### ✅ 8.1 Manual Testing Checklist
- [ ] Receptenlijst laadt correct
- [ ] Filters werken
- [ ] Detail pagina toont alles
- [ ] Handmatig recept toevoegen werkt
- [ ] AI generator genereert valid JSON
- [ ] Image upload werkt
- [ ] Permissions blokkeren non-admins
- [ ] Mobile responsive
- [ ] Print view correct

---

### ✅ 8.2 Data Seeding
**Script:** `api/scripts/seed_recipes.py`

```python
# Add 10-20 sample recepten
# Add all taxonomies
# Add test users with different permissions
```

---

### ✅ 8.3 Performance
- [ ] Image lazy loading
- [ ] Pagination (niet alles laden)
- [ ] Firestore indexes voor filters
- [ ] Cache taxonomies

---

## 🚀 FASE 9: DEPLOYMENT (1 dag)

### ✅ 9.1 Firebase Multi-Site Setup

**Stappen:**
1. **Firebase Console** → Hosting
2. "Add another site" → `recepten-daanblom`
3. Link naar project
4. Update `firebase.json`
5. Deploy: `firebase deploy --only hosting:recepten-daanblom`

---

### ✅ 9.2 DNS Configuration

**Bij DNS provider (Cloudflare/TransIP/etc):**

```
Type: CNAME
Name: recepten
Target: recepten-daanblom.web.app
Proxy: Yes (als Cloudflare)
```

**Of A records (Firebase geeft IPs):**
```
Type: A
Name: recepten
Target: [Firebase IP 1]

Type: A  
Name: recepten
Target: [Firebase IP 2]
```

**Verificatie:**
1. Firebase Console → Hosting → recepten-daanblom
2. "Add custom domain"
3. Volg verificatie stappen (TXT record)
4. Wacht op SSL provisioning (15 min - 24u)

---

### ✅ 9.3 Build & Deploy

```bash
# Build frontend
cd frontend
npm run build

# Deploy both functions and hosting
firebase deploy

# Of specifiek
firebase deploy --only functions,hosting
```

---

### ✅ 9.4 Environment Variables

**Firebase Functions:**
```bash
firebase functions:config:set \
  gemini.api_key="..." \
  tavily.api_key="..."
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
```

---

## 📈 FASE 10: ANALYTICS & MONITORING (optioneel)

### ✅ 10.1 Google Analytics
- [ ] GA4 setup
- [ ] Event tracking (recept views, searches)

### ✅ 10.2 Firebase Performance Monitoring
- [ ] Page load times
- [ ] API response times

### ✅ 10.3 Error Logging
- [ ] Sentry integratie (optioneel)
- [ ] Firebase Crashlytics

---

## 🎯 QUICK WIN FEATURES (na MVP)

### Later toevoegen:
- [ ] **Favoriten** - Users kunnen recepten liken/saven
- [ ] **Ratings** - 5-ster reviews
- [ ] **Comments** - Feedback op recepten
- [ ] **Collections** - "Zomer BBQ", "Kerst menu"
- [ ] **Meal Planning** - Week menu plannen
- [ ] **Shopping List Export** - PDF/Email boodschappenlijst
- [ ] **Print Optimization** - Clean print stylesheet
- [ ] **Recipe Variations** - "Vegetarische variant" koppelen
- [ ] **Nutrition Info** - Calorieën, macros (via API)
- [ ] **Timer Integration** - Countdown timers per stap
- [ ] **Voice Control** - Hands-free cooking mode
- [ ] **Social Sharing** - Open Graph meta tags

---

## 📋 CHECKLIST SUMMARY

### Week 1: Foundation
- [ ] 1.1 Permission system (backend)
- [ ] 1.2 Permission hook (frontend)
- [ ] 1.3 Firestore data model
- [ ] 1.4 Next.js route groups
- [ ] 1.5 Firebase multi-site setup
- [ ] 1.6 DNS configuration
- [ ] 2.1 Design tokens update
- [ ] 2.2 UI components (Select, Textarea, ImageUpload, TagInput)
- [ ] 2.3 Recipe components (alle 9 components)

### Week 2: Backend & Core Features
- [ ] 3.1 Recipe API routes (CRUD)
- [ ] 3.2 Taxonomy API
- [ ] 3.3 AI generator logic
- [ ] 3.4 Router integration
- [ ] 4.1 Recepten layout
- [ ] 4.2 Receptenlijst pagina
- [ ] 4.3 Detail pagina

### Week 3: Advanced Features & Deploy
- [ ] 4.4 Handmatig toevoegen
- [ ] 4.5 AI generator UI
- [ ] 5.1 Firestore rules
- [ ] 5.2 Protected routes
- [ ] 5.3 API auth middleware
- [ ] 6.1 Firebase Storage setup
- [ ] 6.2 Image upload component
- [ ] 7.1 Filters
- [ ] 7.2 Search
- [ ] 8.1 Testing
- [ ] 8.2 Data seeding
- [ ] 9.1 Firebase deploy
- [ ] 9.2 DNS setup
- [ ] 9.3 Go live! 🚀

---

## 🎓 KEY LEARNINGS

### Waarom Multi-App in 1 Repo:
✅ Shared code (design system, auth, components)
✅ Single deployment pipeline
✅ Easier maintenance
✅ Same Firebase project (cost efficiency)
✅ Can split later if needed

### Waarom Route Groups:
✅ Different layouts per app
✅ Clean URL structure
✅ Separate navigation/branding
✅ Still share components

### Waarom Granular Permissions:
✅ Scales naar meerdere users
✅ Different roles (editor, accountant, etc.)
✅ Future-proof voor meer apps
✅ Security best practice

---

## 🔗 LINKS & RESOURCES

- Firebase Console: https://console.firebase.google.com
- Next.js Route Groups: https://nextjs.org/docs/app/building-your-application/routing/route-groups
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/get-started
- Firebase Multi-Site Hosting: https://firebase.google.com/docs/hosting/multisites

---

**Laatste Update:** 19 oktober 2025
**Status:** Ready to implement! 🚀
