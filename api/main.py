from firebase_functions import https_fn
from firebase_admin import initialize_app

initialize_app()

@https_fn.on_request()
def api(req: https_fn.Request) -> https_fn.Response:
    """Main API entry point for all /api/** routes."""
    
    # Example routes
    if req.path == "/api/health":
        return https_fn.Response({"status": "ok", "message": "API is running"}, status=200)
    
    if req.path == "/api/hello":
        name = req.args.get("name", "World")
        return https_fn.Response({"message": f"Hello, {name}!"}, status=200)
    
    # Default 404
    return https_fn.Response({"error": "Not found"}, status=404)
