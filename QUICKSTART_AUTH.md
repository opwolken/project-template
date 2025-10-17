# 🚀 Quick Start - Authenticatie Implementatie

Je website heeft nu een complete login module! Hier is de snelste manier om het werkend te krijgen:

## 📋 Wat is er Toegevoegd?

### Nieuwe Bestanden:
- ✅ `frontend/lib/AuthContext.tsx` - Authenticatie context provider
- ✅ `frontend/components/LoginButton.tsx` - Google login knop component
- ✅ `frontend/app/dashboard/page.tsx` - Beveiligde dashboard pagina
- ✅ `frontend/app/admin/page.tsx` - Admin pagina voor gebruikersbeheer
- ✅ `frontend/app/unauthorized/page.tsx` - Niet-geautoriseerd pagina
- ✅ `firestore.rules` - Database security rules
- ✅ `AUTHENTICATIE_SETUP.md` - Gedetailleerde setup instructies

### Gewijzigde Bestanden:
- ✅ `frontend/lib/firebase.ts` - Firebase Auth toegevoegd
- ✅ `frontend/app/layout.tsx` - AuthProvider wrapper
- ✅ `frontend/app/page.tsx` - Login UI geïntegreerd

## ⚡ Snelle Setup (5 minuten)

### 1. Firebase Console Setup

**A. Enable Google Authentication:**
1. Ga naar [Firebase Console](https://console.firebase.google.com)
2. Selecteer je project
3. **Authentication** → **Sign-in method** → **Google** → **Enable** → Save

**B. Get Firebase Config:**
1. **Project Settings** (tandwiel icoon) → **General**
2. Scroll naar "Your apps" → Web app
3. Kopieer de config waarden

### 2. Environment Variables

Maak een `.env.local` bestand in de `frontend` folder:

```bash
cd frontend
cp .env.example .env.local
```

Vul het in met je Firebase config (zie stap 1B):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jouw-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jouw-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jouw-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Installeer Dependencies (indien nodig)

```bash
cd frontend
npm install
```

Firebase is al toegevoegd aan package.json, maar run dit voor de zekerheid.

### 4. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 5. Eerste Login & Autorisatie

**Optie A - Via de Website (Makkelijkst):**
1. Klik op "Inloggen met Google"
2. Log in met je Google account
3. Ga direct naar: http://localhost:3000/admin
4. Voeg je eigen email adres toe
5. Refresh de pagina - je bent nu geautoriseerd! 🎉

**Optie B - Via Firebase Console:**
1. Log in op je site met Google
2. Ga naar Firebase Console → **Firestore Database**
3. Maak een nieuwe collection: `authorized_users`
4. Maak een document met je email als ID (bijv. `daan@opwolken.com`)
5. Voeg field toe: `approved` (boolean) = `true`
6. Save en refresh je website

## 🔐 Firestore Security Rules Deployen

Je hebt nu een `firestore.rules` bestand. Deploy het:

```bash
firebase deploy --only firestore:rules
```

Of via Firebase Console:
1. **Firestore Database** → **Rules** tab
2. Kopieer de inhoud van `firestore.rules`
3. Plak het in de editor
4. **Publish**

## 🎯 Gebruik

### Pagina's:

| URL | Beschrijving | Toegang |
|-----|-------------|---------|
| `/` | Home pagina | Openbaar |
| `/dashboard` | Beveiligd dashboard | Login + Autorisatie |
| `/admin` | Gebruikersbeheer | Login + Autorisatie |
| `/unauthorized` | Geen toegang pagina | Automatisch |

### Gebruikers Toevoegen:

**Via Admin Pagina (recommended):**
- Ga naar `/admin`
- Voer email adres in
- Klik "Toevoegen"
- Gebruiker kan nu inloggen en heeft direct toegang

### Nieuwe Beveiligde Pagina Maken:

```tsx
'use client';

import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MijnPagina() {
  const { user, isAuthorized, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!loading && mounted && (!user || !isAuthorized)) {
      router.push(user ? '/unauthorized' : '/');
    }
  }, [user, isAuthorized, loading, router, mounted]);

  if (loading || !mounted || !user || !isAuthorized) return null;

  return <div>Beveiligde content!</div>;
}
```

## 🐛 Troubleshooting

### "Popup geblokkeerd"
→ Schakel popup blocker uit of test in incognito mode

### "Not authorized" na login
→ Check of je email exact klopt in Firestore (lowercase!)

### Environment variables niet geladen
→ Herstart de dev server na het aanmaken van `.env.local`

### Firebase errors in console
→ Check of je alle stappen in Firebase Console hebt gedaan

## 📚 Meer Info

Zie `AUTHENTICATIE_SETUP.md` voor:
- Gedetailleerde uitleg van het systeem
- Firestore structuur
- Security best practices
- Production deployment tips

## ✅ Checklist

- [ ] Google Authentication enabled in Firebase
- [ ] `.env.local` bestand aangemaakt met Firebase config
- [ ] Development server draait
- [ ] Succesvol ingelogd met Google
- [ ] Jezelf toegevoegd als geautoriseerde gebruiker
- [ ] Firestore rules gedeployed
- [ ] Toegang tot `/dashboard` werkt

**Klaar? Geniet van je beveiligde applicatie! 🎉**

Vragen? Check `AUTHENTICATIE_SETUP.md` of de code comments.
