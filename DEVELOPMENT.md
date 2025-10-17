# 🚀 Development Workflow

## Lokaal Testen met Frontend + Backend

### Optie 1: Alles Tegelijk (Aanbevolen)

```bash
npm run dev
```

Dit start:
- ✅ Next.js frontend op `http://localhost:3000`
- ✅ Firebase Functions (Python) op emulator
- ✅ Firestore emulator (lokale database)

### Optie 2: Alles Handmatig

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend & Firestore:**
```bash
firebase emulators:start --only functions,firestore
```

### Optie 3: Alleen Frontend (Zonder Backend)

```bash
npm run dev:frontend
```

## 🌐 URLs

| Service | URL | Beschrijving |
|---------|-----|--------------|
| Frontend | http://localhost:3000 | Next.js applicatie |
| API | http://localhost:3000/api/* | Wordt doorgestuurd naar Functions emulator |
| Functions | http://localhost:5001 | Functions emulator (direct) |
| Firestore | http://localhost:8080 | Firestore emulator |
| Emulator UI | http://localhost:4000 | Firebase Emulator dashboard |

## ⚙️ Configuratie

### Production vs Development

**Production (Echte Firebase):**
```env
# In frontend/.env.local
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false
```

**Development (Lokale Emulators):**
```env
# In frontend/.env.local
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
```

### Wanneer Gebruik Je Wat?

**Emulators (Development):**
- ✅ Gratis, geen kosten
- ✅ Offline testen mogelijk
- ✅ Data wordt gewist bij herstart
- ✅ Snelle iteratie
- ❌ Geen echte Google login (mock authenticatie)

**Production Firebase:**
- ✅ Echte Google authenticatie
- ✅ Persistente data
- ✅ Realtime sync tussen gebruikers
- ⚠️ Kost credits (maar gratis tier is ruim)

## 🔐 Authenticatie tijdens Development

### Met Production Firebase (NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false):
- Echte Google login
- Authorisatie via production Firestore
- Beste optie voor authenticatie testen

### Met Emulators (NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true):
- Mock authenticatie (geen echte Google accounts)
- Lokale Firestore voor authorisatie
- Sneller maar minder realistisch

## 📝 Aanbevolen Setup

Voor lokaal testen met authenticatie:

```env
# frontend/.env.local
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false
```

Dit gebruikt:
- ✅ Echte Google authenticatie (production)
- ✅ Echte Firestore voor gebruikers (production)
- ✅ Lokale Python functions voor API calls

## 🛠️ Troubleshooting

### API errors tijdens development
- Check of emulators draaien: `firebase emulators:start`
- Kijk in Emulator UI: http://localhost:4000

### "Connection refused" errors
- Wacht tot emulators volledig gestart zijn (~10 sec)
- Check of poorten niet al in gebruik zijn

### Authenticatie werkt niet
- Zet `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false` voor echte Google login
- Enable Google Auth in Firebase Console

### Data blijft niet behouden
- Emulator data wordt gewist bij restart
- Voor persistente data: gebruik production Firebase

## 🎯 Quick Commands

```bash
# Start alles
npm run dev

# Start alleen frontend
npm run dev:frontend

# Start alleen emulators
npm run dev:emulators

# Start alles met hosting emulator
npm run dev:full

# Deploy naar production
npm run deploy

# Bekijk production logs
npm run logs
```

## 🔄 Workflow Tips

1. **Eerste keer setup:**
   - `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false`
   - Log in en autoriseer jezelf via production Firebase
   - Nu heb je een admin account

2. **Dagelijks development:**
   - `npm run dev` in één terminal
   - Alles draait samen
   - API calls gaan naar emulator
   - Authenticatie naar production

3. **Voor deployment:**
   - Test met `firebase emulators:start` (volledige emulator suite)
   - Check http://localhost:5000 (hosting emulator)
   - Deploy met `npm run deploy`

Geniet van je development setup! 🎉
