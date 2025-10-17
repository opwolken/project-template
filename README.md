# Project Template

**Clean Firebase Stack:** Next.js (static) + Firebase Functions (Python) + Firestore (real-time)

## 📁 Structuur

```
template-project/
├── frontend/          # Next.js app (static export)
│   ├── app/          # App router pages
│   ├── components/   # React components
│   ├── lib/          # Firebase client config
│   ├── public/       # Static assets
│   └── out/          # Build output (gegenereerd)
├── api/              # Python Firebase Functions
│   ├── main.py       # API endpoints
│   └── requirements.txt
├── firebase.json     # Firebase configuratie
└── .firebaserc       # Firebase project ID
```

## 🚀 Setup

### 1. Firebase project aanmaken
1. Ga naar https://console.firebase.google.com
2. Klik "Add project" en volg de stappen
3. **Activeer Firestore**: Firestore Database → Create database → Start in test mode
4. Kopieer je project ID

### 2. Frontend configureren
```bash
cd frontend
npm install

# Maak .env.local aan (kopieer van .env.local.example)
cp .env.local.example .env.local

# Vul Firebase credentials in .env.local in:
# Je vindt deze in Firebase Console → Project Settings → Your apps → Web app
```

### 3. Firebase CLI setup
```bash
# Installeer dependencies (vanuit root)
npm install

# Login bij Firebase
firebase login

# Link project (update .firebaserc met je project ID)
firebase use --add
```

### 4. Firestore Security Rules instellen
In Firebase Console → Firestore Database → Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write voor development
    // In productie: voeg authenticatie toe
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 🛠️ Development

### Start Frontend + Backend (Aanbevolen)
```bash
# Vanuit root - start alles tegelijk
npm run dev

# Dit start:
# - Frontend op http://localhost:3000
# - Python Functions emulator
# - Firestore emulator
# - Emulator UI op http://localhost:4000
```

### Alleen Frontend
```bash
npm run dev:frontend
# Open http://localhost:3000
```

### Alleen Emulators
```bash
npm run dev:emulators
# Functions + Firestore emulators
```

**Zie [DEVELOPMENT.md](DEVELOPMENT.md) voor gedetailleerde development workflow!**

## 📦 Deployment

### Build en deploy alles
```bash
npm run deploy
```

### Alleen hosting
```bash
npm run deploy:hosting
```

### Alleen functions
```bash
npm run deploy:functions
```

## 🔗 API Endpoints (Firebase Functions)

- `GET /api` - API info
- `GET /api/health` - Health check
- `GET /api/hello?name=John` - Hello endpoint
- `POST /api/items` - Create item in Firestore
- `GET /api/items` - Get all items from Firestore

## 🔥 Real-time Features (Firestore)

Frontend gebruikt Firestore client SDK voor real-time updates:
- Zie `frontend/components/RealtimeExample.tsx` voor voorbeeld
- Automatische sync tussen clients
- Geen WebSocket setup nodig - Firestore regelt dit

## 📝 Stack Details

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Firebase Web SDK (Firestore client)

**Backend:**
- Firebase Functions (Python 3.11)
- Firebase Admin SDK
- Firestore database

**Hosting:**
- Firebase Hosting (gratis tier: 10GB/maand)
- Automatische SSL
- Global CDN

## 🔐 Authenticatie & Beveiliging

Deze template heeft een **complete Google login module** geïmplementeerd!

### ⚡ Quick Start
Zie **[QUICKSTART_AUTH.md](QUICKSTART_AUTH.md)** voor een snelle 5-minuten setup.

### 📖 Gedetailleerde Gids
Zie **[AUTHENTICATIE_SETUP.md](AUTHENTICATIE_SETUP.md)** voor volledige documentatie.

### Wat is er geïmplementeerd:
- ✅ Google Authentication (Sign in with Google)
- ✅ Gebruikersautorisatie via Firestore
- ✅ Beveiligde routes (`/dashboard`, `/admin`)
- ✅ Admin panel voor gebruikersbeheer
- ✅ AuthContext voor state management
- ✅ Firestore Security Rules

### Pagina's:
- `/` - Openbare home pagina
- `/dashboard` - Beveiligd dashboard (vereist login + autorisatie)
- `/admin` - Gebruikersbeheer (vereist login + autorisatie)
- `/unauthorized` - Getoond wanneer niet geautoriseerd

## 🎯 Volgende Stappen

1. ~~**Authenticatie toevoegen**~~: ✅ Firebase Authentication geïmplementeerd!
2. **Storage**: Firebase Storage voor file uploads
3. ~~**Security Rules**~~: ✅ Firestore rules toegevoegd
4. **Analytics**: Google Analytics integratie
5. **Testing**: Firebase Emulator Suite gebruiken
6. **Email verificatie**: Extra security layer toevoegen
