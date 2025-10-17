from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore
import json

# Initialize Firebase Admin SDK
initialize_app()

# Firestore database
db = firestore.client()


@https_fn.on_request()
def api(req: https_fn.Request) -> https_fn.Response:
    """Main API entry point for all /api/** routes."""
    
    # Root endpoint
    if req.path == "/api" or req.path == "/api/":
        return https_fn.Response(
            json.dumps({"message": "Project Template API", "version": "1.0.0"}),
            status=200,
            headers={"Content-Type": "application/json"}
        )
    
    # Health check
    if req.path == "/api/health":
        return https_fn.Response(
            json.dumps({"status": "ok", "message": "API is running"}),
            status=200,
            headers={"Content-Type": "application/json"}
        )
    
    # Hello endpoint
    if req.path == "/api/hello":
        name = req.args.get("name", "World")
        return https_fn.Response(
            json.dumps({"message": f"Hello, {name}!"}),
            status=200,
            headers={"Content-Type": "application/json"}
        )
    
    # Example: Create item in Firestore
    if req.path == "/api/items" and req.method == "POST":
        try:
            data = req.get_json()
            doc_ref = db.collection("items").document()
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
    if req.path == "/api/items" and req.method == "GET":
        try:
            items = []
            docs = db.collection("items").stream()
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
