from firebase_functions import https_fn, options
from firebase_admin import initialize_app, firestore
import json

# Initialize Firebase Admin SDK
initialize_app()

# Global variable for Firestore client (lazy initialization)
_db = None

def get_db():
    """Lazy initialization of Firestore client."""
    global _db
    if _db is None:
        _db = firestore.client()
    return _db


@https_fn.on_request(region="europe-west1")
def api(req: https_fn.Request) -> https_fn.Response:
    """Main API entry point for all /api/** routes."""
    
    # Get the path - handle both direct calls and Firebase hosting rewrites
    path = req.path
    # Remove function name prefix if present (for emulator/direct calls)
    if '/api/api' in path:
        path = path.replace('/api/api', '/api')
    elif path.startswith('/project-template-7b1d0/europe-west1/api'):
        path = '/api' + path.split('/api', 1)[1] if '/api' in path.split('/api', 1)[1:] else '/api'
    
    # Root endpoint
    if path == "/api" or path == "/api/" or path == "/":
        return https_fn.Response(
            json.dumps({"message": "Project Template API", "version": "1.0.0", "path": req.path}),
            status=200,
            headers={"Content-Type": "application/json"}
        )
    
    # Health check
    if path.endswith("/health") or "/health" in path:
        return https_fn.Response(
            json.dumps({"status": "ok", "message": "API is running"}),
            status=200,
            headers={"Content-Type": "application/json"}
        )
    
    # Hello endpoint
    if path.endswith("/hello") or "/hello" in path:
        name = req.args.get("name", "World")
        return https_fn.Response(
            json.dumps({"message": f"Hello, {name}!"}),
            status=200,
            headers={"Content-Type": "application/json"}
        )
    
    # Example: Create item in Firestore
    if (path.endswith("/items") or "/items" in path) and req.method == "POST":
        try:
            data = req.get_json()
            doc_ref = get_db().collection("items").document()
            doc_ref.set({
                "name": data.get("name"),
                "created_at": firestore.SERVER_TIMESTAMP
            })
            return https_fn.Response(
                json.dumps({"id": doc_ref.id, "message": "Item created"}),
                status=201,
                headers={"Content-Type": "application/json"}
            )
        except Exception as e:
            return https_fn.Response(
                json.dumps({"error": str(e)}),
                status=400,
                headers={"Content-Type": "application/json"}
            )
    
    # Example: Get all items from Firestore
    if (path.endswith("/items") or "/items" in path) and req.method == "GET":
        try:
            items = []
            docs = get_db().collection("items").stream()
            for doc in docs:
                item = doc.to_dict()
                item["id"] = doc.id
                items.append(item)
            return https_fn.Response(
                json.dumps({"items": items}),
                status=200,
                headers={"Content-Type": "application/json"}
            )
        except Exception as e:
            return https_fn.Response(
                json.dumps({"error": str(e)}),
                status=500,
                headers={"Content-Type": "application/json"}
            )
    
    # Default 404
    return https_fn.Response(
        json.dumps({"error": "Not found"}),
        status=404,
        headers={"Content-Type": "application/json"}
    )
