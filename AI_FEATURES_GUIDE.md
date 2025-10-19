# AI Features Setup Guide

**Datum**: 19 oktober 2025  
**Fase 3**: AI Features Implementeren - Voltooid ✅

---

## 🎯 Wat is er gebouwd?

### Backend API Endpoints

Drie nieuwe endpoints toegevoegd aan `/api/main.py`:

#### 1. **Chat Endpoint** - `/api/ai/chat`
**POST** endpoint voor chat met Gemini AI

**Request body:**
```json
{
  "message": "Wat is de hoofdstad van Nederland?",
  "history": [
    {
      "role": "user",
      "parts": ["Hallo"]
    },
    {
      "role": "model", 
      "parts": ["Hallo! Hoe kan ik je helpen?"]
    }
  ],
  "system_prompt": "Je bent een behulpzame assistent"
}
```

**Response:**
```json
{
  "response": "De hoofdstad van Nederland is Amsterdam.",
  "message": "Wat is de hoofdstad van Nederland?"
}
```

---

#### 2. **Image Analysis** - `/api/ai/image`
**POST** endpoint voor image analyse met Gemini

**Request body:**
```json
{
  "message": "Beschrijf deze afbeelding",
  "image_data": "base64_encoded_image_string"
}
```

**Response:**
```json
{
  "response": "Dit is een foto van...",
  "message": "Beschrijf deze afbeelding"
}
```

---

#### 3. **Web Search** - `/api/search`
**POST** endpoint voor web search met Tavily

**Request body:**
```json
{
  "query": "latest news about AI",
  "max_results": 5,
  "summarize": false
}
```

**Response (zonder summarize):**
```json
{
  "query": "latest news about AI",
  "results": [
    {
      "title": "Article title",
      "url": "https://...",
      "content": "Article content..."
    }
  ]
}
```

**Response (met summarize):**
```json
{
  "query": "latest news about AI",
  "summary": "AI samenvatting van alle resultaten..."
}
```

---

## 🎨 Frontend Components

### ChatInterface Component
**Locatie**: `frontend/components/ai/ChatInterface.tsx`

**Features**:
- ✅ Real-time chat met Gemini AI
- ✅ Conversatie geschiedenis
- ✅ Custom system prompts
- ✅ Loading states
- ✅ Error handling
- ✅ Wis chat functie

**Gebruik**:
```tsx
<ChatInterface
  title="AI Assistent"
  placeholder="Stel je vraag..."
  systemPrompt="Je bent een vriendelijke assistent"
/>
```

---

### SearchInterface Component
**Locatie**: `frontend/components/ai/SearchInterface.tsx`

**Features**:
- ✅ Web search met Tavily
- ✅ Optionele AI samenvatting
- ✅ Configureerbaar aantal resultaten
- ✅ Loading states
- ✅ Klikbare links naar bronnen
- ✅ Wis resultaten functie

**Gebruik**:
```tsx
<SearchInterface
  title="Web Search"
  enableSummarize={true}
  maxResults={5}
/>
```

---

## 📄 AI Demo Page

**Locatie**: `frontend/app/ai/page.tsx`

**Features**:
- ✅ Protected route (login vereist)
- ✅ Tab navigatie tussen Chat en Search
- ✅ Info banner over API keys
- ✅ Feature grid met uitleg
- ✅ Links naar dashboard en home

**URL**: `/ai` (requires authentication)

---

## 🔑 API Keys Setup

### Development (Emulators)

1. **Maak een `.env` file** in de `api/` folder:
```bash
cd api
cp .env.example .env
```

2. **Voeg je API keys toe** in `api/.env`:
```bash
GEMINI_API_KEY=your_actual_gemini_key_here
TAVILY_API_KEY=your_actual_tavily_key_here
```

3. **Waar krijg je de keys?**
   - **Gemini**: https://aistudio.google.com/app/apikey
   - **Tavily**: https://app.tavily.com/

4. **Herstart emulators** zodat de env vars geladen worden:
```bash
# Stop de emulators (Ctrl+C)
firebase emulators:start
```

---

### Production (Firebase)

Voor productie gebruik Firebase Functions config:

```bash
# Set Gemini key
firebase functions:config:set gemini.api_key="your_gemini_key"

# Set Tavily key
firebase functions:config:set tavily.api_key="your_tavily_key"

# Deploy
firebase deploy --only functions
```

**Update** `api/main.py` om config te lezen:
```python
import firebase_functions

# In production
gemini_key = firebase_functions.params.GEMINI_API_KEY.value
tavily_key = firebase_functions.params.TAVILY_API_KEY.value
```

---

## 🧪 Testen

### 1. Test Chat Endpoint

```bash
curl -X POST http://127.0.0.1:5001/project-template-7b1d0/europe-west1/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hallo, wie ben jij?",
    "history": []
  }'
```

### 2. Test Search Endpoint

```bash
curl -X POST http://127.0.0.1:5001/project-template-7b1d0/europe-west1/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Firebase?",
    "max_results": 3,
    "summarize": false
  }'
```

### 3. Test via Frontend

1. Start emulators: `firebase emulators:start`
2. Start frontend: `cd frontend && npm run dev`
3. Login op `http://localhost:3000`
4. Ga naar `http://localhost:3000/ai`
5. Test chat en search functies

---

## 📊 File Structuur

```
api/
├── .env                    ✨ NEW (gitignored)
├── .env.example           ✨ NEW (template)
├── main.py                ✅ UPDATED (AI endpoints)
└── lib/
    ├── gemini_client.py   ✅ (unchanged)
    └── tavily_client.py   ✅ (unchanged)

frontend/
├── app/
│   └── ai/
│       └── page.tsx       ✨ NEW (AI demo page)
└── components/
    ├── index.ts           ✅ UPDATED (exports)
    └── ai/                ✨ NEW
        ├── ChatInterface.tsx
        └── SearchInterface.tsx
```

---

## 🔒 Security Notes

### ⚠️ Belangrijk voor Productie

1. **API Keys**: Nooit committen naar Git
   - ✅ `.env` is in `.gitignore`
   - ✅ Gebruik Firebase Functions config voor productie

2. **Rate Limiting**: Voeg rate limiting toe om misbruik te voorkomen
   - TODO: Implementeer in Fase 5

3. **Authentication**: AI endpoints zijn NIET automatisch protected
   - TODO: Voeg auth verificatie toe aan endpoints
   - Huidige state: Iedereen met de URL kan de API gebruiken

4. **Kosten**: Gemini en Tavily hebben free tiers, maar monitor je gebruik
   - Gemini: 60 requests per minute (free)
   - Tavily: 1000 searches per maand (free tier)

---

## 🚀 Volgende Stappen

### Fase 3 Features - Nog Te Doen

- [ ] **Image Upload UI**: Component voor foto's uploaden en analyseren
- [ ] **Streaming Responses**: Real-time token streaming voor chat
- [ ] **Conversation History**: Opslaan in Firestore
- [ ] **API Authentication**: Protect endpoints (alleen geautoriseerde users)
- [ ] **Rate Limiting**: Voorkom misbruik
- [ ] **Error Boundary**: Betere error handling
- [ ] **Loading Skeletons**: Mooiere loading states

### Voor Fase 4

- [ ] Dashboard integreren met AI features
- [ ] User analytics (hoeveel requests, etc.)
- [ ] Admin panel: monitor API usage

---

## 💡 Tips & Tricks

### Chat Context Verbeteren
```tsx
<ChatInterface
  systemPrompt="Je bent een expert in {onderwerp}. 
                Geef praktische en concrete voorbeelden.
                Houd je antwoorden kort en bondig."
/>
```

### Search + Summarize Combineren
```tsx
<SearchInterface
  enableSummarize={true}  // Samenvatting aan
  maxResults={3}          // Minder resultaten = sneller
/>
```

### Custom Hook voor AI
```tsx
// lib/hooks/useAI.ts
export function useAI() {
  const chat = async (message: string) => {
    // ... chat logic
  };
  
  const search = async (query: string) => {
    // ... search logic
  };
  
  return { chat, search };
}
```

---

## 📝 Changelog

**19 oktober 2025**:
- ✅ Backend: 3 AI endpoints toegevoegd
- ✅ Frontend: ChatInterface en SearchInterface components
- ✅ Frontend: /ai demo page
- ✅ Docs: Setup guide en API documentatie
- ✅ Config: .env.example voor development

---

**Voltooid door**: GitHub Copilot  
**Status**: Fase 3 compleet - AI features werkend! 🎉

**Let op**: Voor volledige functionaliteit heb je valide API keys nodig. Zie de "API Keys Setup" sectie hierboven.
