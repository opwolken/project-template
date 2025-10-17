# Project Template

Next.js frontend + Python backend op Firebase

## 📁 Structuur

```
template-project/
├── frontend/          # Next.js app (static export)
│   ├── app/          # App router pages
│   ├── public/       # Static assets (images, fonts)
│   └── out/          # Build output (gegenereerd, niet committen)
├── api/              # Python Firebase Functions
│   ├── main.py       # API endpoints
│   └── requirements.txt
├── firebase.json     # Firebase configuratie
└── .firebaserc       # Firebase project ID
```

## 🚀 Setup

### 1. Frontend installeren
```bash
cd frontend
npm install
```

### 2. Firebase CLI installeren
```bash
npm install -g firebase-tools
firebase login
```

### 3. Firebase project aanmaken/linken
```bash
# Maak nieuw project op https://console.firebase.google.com
# Update .firebaserc met je project ID
firebase use --add
```

### 4. Python dependencies (optioneel lokaal)
```bash
cd api
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

## 🛠️ Development

### Frontend lokaal draaien
```bash
cd frontend
npm run dev
# Open http://localhost:3000
```

### Firebase emulators (hosting + functions)
```bash
# Vanuit root
npm run build:frontend
firebase emulators:start
# Open http://localhost:5000
```

## 📦 Deployment

### Build en deploy
```bash
# Vanuit root
cd frontend && npm run build && cd ..
firebase deploy
```

### Alleen hosting
```bash
firebase deploy --only hosting
```

### Alleen functions
```bash
firebase deploy --only functions
```

## 🔗 API Endpoints

- `GET /api/health` - Health check
- `GET /api/hello?name=John` - Hello endpoint

## 📝 Notities

- `public/` bevat statische assets (bijv. images, favicon)
- `out/` is build output, wordt automatisch gegenereerd
- Python backend draait als Firebase Functions
- Frontend wordt als statische site gehost op Firebase Hosting
