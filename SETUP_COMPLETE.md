# ✅ Setup Complete!

## 🎉 Alles is nu Werkend!

### Frontend + Backend draaien samen:

```bash
npm run dev
```

**Je kunt nu:**
- ✅ Frontend op http://localhost:3000
- ✅ Python API endpoints werken via `/api/*`
- ✅ Firestore emulator draait
- ✅ Emulator UI op http://localhost:4000

## 🔐 Volgende Stap: Authenticatie Setup

### 1. Enable Google Auth in Firebase Console

1. Ga naar [Firebase Console](https://console.firebase.google.com)
2. Selecteer je project: **project-template-7b1d0**
3. **Authentication** → **Get Started** → **Sign-in method**
4. Klik op **Google**
5. **Enable** toggle aanzetten
6. Support email kiezen
7. **Save**

### 2. Log in en Maak Jezelf Admin

**Optie A - Via Firebase Console:**
1. Open http://localhost:3000
2. Klik "Inloggen met Google"
3. Log in met je Google account
4. Ga naar Firebase Console → **Firestore Database**
5. **Start collection**: `authorized_users`
6. **Document ID**: je email (bijv. `daan@opwolken.com`)
7. **Field**: `approved` (boolean) = `true`
8. **Save**
9. Refresh je website → Je bent nu admin! 🎉

**Optie B - Via de Website:**
1. Log in met Google op http://localhost:3000
2. Ga naar http://localhost:3000/admin
3. Voeg je eigen email toe
4. Klaar!

## 📍 URLs

| Service | URL |
|---------|-----|
| 🏠 Frontend | http://localhost:3000 |
| 🔒 Dashboard | http://localhost:3000/dashboard |
| ⚙️ Admin Panel | http://localhost:3000/admin |
| 🔥 Emulator UI | http://localhost:4000 |
| 🔧 API Direct | http://localhost:5001/project-template-7b1d0/europe-west1/api |

## 🧪 Test de API

Open http://localhost:3000 en klik op:
- "Zeg Hallo" → Test `/api/hello`
- "Health Check" → Test `/api/health`

Deze endpoints gaan nu naar je lokale Python backend! 🐍

## 📚 Documentatie

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development workflow details
- **[QUICKSTART_AUTH.md](QUICKSTART_AUTH.md)** - Authenticatie quick start
- **[AUTHENTICATIE_SETUP.md](AUTHENTICATIE_SETUP.md)** - Volledige auth documentatie

## 🎯 Checklist

- [x] Concurrently package geïnstalleerd
- [x] Firebase emulators geconfigureerd
- [x] Next.js rewrites ingesteld
- [x] Development script werkend
- [ ] Google Authentication enabled in Firebase Console
- [ ] Eerste admin gebruiker toegevoegd
- [ ] Firestore rules deployed

## 🚀 Commands

```bash
# Start alles (frontend + backend)
npm run dev

# Alleen frontend
npm run dev:frontend

# Alleen emulators
npm run dev:emulators

# Build voor productie
npm run build

# Deploy alles
npm run deploy
```

**Je bent klaar om te ontwikkelen! 🎉**

Veel plezier met je full-stack Firebase app!
