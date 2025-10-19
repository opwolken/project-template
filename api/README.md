# API Backend Structure

**Clean, DRY, Minimalistisch**

## 📁 File Structuur

```
api/
├── main.py                    # Entry point (minimaal!)
├── routes/                    # Route handlers (gescheiden per feature)
│   ├── __init__.py
│   ├── basic_routes.py        # Health, hello, root
│   ├── ai_routes.py           # Gemini AI endpoints
│   ├── search_routes.py       # Tavily search
│   └── firestore_routes.py    # Firestore CRUD
├── lib/                       # Shared utilities & clients
│   ├── __init__.py
│   ├── router.py              # Main routing logic
│   ├── utils.py               # Shared helpers
│   ├── gemini_client.py       # Gemini AI client
│   └── tavily_client.py       # Tavily search client
├── .env                       # Environment variables (gitignored)
├── .env.example               # Template voor env vars
└── requirements.txt           # Python dependencies
```

---

## 🎯 Design Principes

### DRY (Don't Repeat Yourself)
- ✅ Routing logic in `lib/router.py`
- ✅ Response helpers in `lib/utils.py`
- ✅ Client initialization in `lib/utils.py`
- ✅ Route handlers in `routes/`

### Separation of Concerns
- **main.py**: Alleen Firebase Functions setup + router call
- **lib/router.py**: URL parsing + routing naar handlers
- **routes/*.py**: Specifieke endpoint logic
- **lib/utils.py**: Gedeelde helpers (geen business logic)
- **lib/*_client.py**: External API clients

### Minimalistisch
- Elke file heeft 1 duidelijke verantwoordelijkheid
- Geen duplicate code
- Clean imports
- Type hints overal

---

## 📝 Code Patterns

### Route Handler Pattern

```python
# routes/example_routes.py
from firebase_functions import https_fn
from lib.utils import create_json_response, validate_required_fields, get_db

def handle_example(req: https_fn.Request) -> https_fn.Response:
    """
    POST /api/example
    Beschrijving van wat de endpoint doet
    
    Body:
        field: type (required/optional)
    """
    try:
        data = req.get_json()
        
        # Validatie
        missing = validate_required_fields(data, ['field'])
        if missing:
            return create_json_response(
                {"error": f"Missing: {', '.join(missing)}"},
                status=400
            )
        
        # Business logic hier
        result = do_something(data['field'])
        
        return create_json_response({"result": result})
        
    except Exception as e:
        return create_json_response(
            {"error": str(e)},
            status=500
        )
```

### Nieuwe Route Toevoegen

1. **Maak handler** in `routes/feature_routes.py`:
```python
def handle_new_endpoint(req: https_fn.Request) -> https_fn.Response:
    """Handler voor /api/new-endpoint"""
    # ... implementation
```

2. **Update router** in `lib/router.py`:
```python
from routes import feature_routes

def route_request(req):
    # ... existing code
    
    # Nieuwe route
    if main_route == 'new-endpoint' and method == 'POST':
        return feature_routes.handle_new_endpoint(req)
```

3. **Test**:
```bash
curl -X POST http://localhost:5001/.../api/new-endpoint \
  -H "Content-Type: application/json" \
  -d '{"data": "test"}'
```

---

## 🛠️ Utilities

### `lib/utils.py`

**Client Initialization** (lazy loading):
```python
from lib.utils import get_db, get_gemini_client, get_tavily_client

db = get_db()  # Firestore
gemini = get_gemini_client()  # Gemini AI
tavily = get_tavily_client()  # Tavily Search
```

**Response Helpers**:
```python
from lib.utils import create_json_response

# Success
return create_json_response({"data": "value"})

# Error
return create_json_response({"error": "message"}, status=400)
```

**Validation**:
```python
from lib.utils import validate_required_fields

missing = validate_required_fields(data, ['name', 'email'])
if missing:
    return create_json_response({"error": f"Missing: {missing}"}, 400)
```

**Path Utilities**:
```python
from lib.utils import normalize_path, parse_route

path = normalize_path(req.path)  # '/api/ai/chat'
main, sub = parse_route(path)    # ('ai', 'chat')
```

---

## 📍 Available Routes

### Basic
- `GET /api` - Root endpoint
- `GET /api/health` - Health check
- `GET /api/hello?name=X` - Hello endpoint

### AI (Gemini)
- `POST /api/ai/chat` - Chat met Gemini
  ```json
  {
    "message": "Hallo!",
    "history": [],
    "system_prompt": "Je bent..."
  }
  ```

- `POST /api/ai/image` - Image analyse
  ```json
  {
    "image_data": "base64_string",
    "message": "Beschrijf dit"
  }
  ```

### Search (Tavily)
- `POST /api/search` - Web search
  ```json
  {
    "query": "Python tutorial",
    "max_results": 5,
    "summarize": false
  }
  ```

### Firestore
- `GET /api/items` - Haal items op
- `POST /api/items` - Maak item
  ```json
  {
    "name": "Item naam"
  }
  ```

---

## 🔒 Environment Variables

Zet in `api/.env`:
```bash
GEMINI_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

**Development**: Emulators laden automatisch `.env`

**Production**: Gebruik Firebase Functions config:
```bash
firebase functions:config:set gemini.api_key="key"
firebase functions:config:set tavily.api_key="key"
```

---

## 🧪 Testing

### Start Emulators
```bash
firebase emulators:start
```

### Test Endpoints
```bash
# Health check
curl http://127.0.0.1:5001/project-template-7b1d0/europe-west1/api/health

# Chat
curl -X POST http://127.0.0.1:5001/.../api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hallo!"}'

# Search
curl -X POST http://127.0.0.1:5001/.../api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "Firebase", "max_results": 3}'
```

---

## 📊 Code Metrics

| Metric | Waarde |
|--------|--------|
| main.py | ~30 lijnen (was: ~250) |
| Route handlers | 4 files, georganiseerd |
| Utilities | Gedeeld, herbruikbaar |
| Duplicate code | 0 |
| Separation | ✅ Perfect |

---

## ✅ Best Practices

1. **1 Handler = 1 Functie** - Elke endpoint krijgt eigen handler
2. **Type Hints** - Altijd Python type hints gebruiken
3. **Docstrings** - Documenteer wat endpoint doet + body format
4. **Validation Eerst** - Check required fields voor business logic
5. **Consistent Errors** - Gebruik `create_json_response` voor errors
6. **DRY** - Als je 2x hetzelfde doet → utility functie
7. **Clean Imports** - Only import wat je nodig hebt

---

## 🚀 Voor Nieuwe Features

1. Is het een nieuwe feature? → Nieuwe file in `routes/`
2. Is het shared logic? → Voeg toe aan `lib/utils.py`
3. Is het een external API? → Nieuwe client in `lib/`
4. Update router in `lib/router.py`
5. Test met curl of frontend
6. Document in deze README

---

**Laatste Update**: 19 oktober 2025  
**Volgende**: Middleware toevoegen (auth, rate limiting, CORS)
