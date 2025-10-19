"""
Router voor API endpoints
Clean routing naar specifieke handlers
"""
from firebase_functions import https_fn
from lib.utils import create_json_response, normalize_path, parse_route

# Import route handlers
from routes import basic_routes, ai_routes, search_routes, firestore_routes


def route_request(req: https_fn.Request) -> https_fn.Response:
    """
    Main router die requests naar correcte handlers stuurt
    
    Args:
        req: Firebase Functions Request object
    
    Returns:
        https_fn.Response van de juiste handler
    """
    # Normalize path
    path = normalize_path(req.path)
    method = req.method
    
    # Parse route
    main_route, sub_route = parse_route(path)
    
    # Root endpoint
    if main_route == '/' or not main_route:
        return basic_routes.handle_root(req)
    
    # Health check
    if main_route == 'health':
        return basic_routes.handle_health(req)
    
    # Hello endpoint
    if main_route == 'hello':
        return basic_routes.handle_hello(req)
    
    # AI routes
    if main_route == 'ai':
        # Check for nested routes (e.g., ai/chat/stream)
        if sub_route == 'chat/stream' and method == 'POST':
            return ai_routes.handle_chat_stream(req)
        elif sub_route == 'chat' and method == 'POST':
            return ai_routes.handle_chat(req)
        elif sub_route == 'image' and method == 'POST':
            return ai_routes.handle_image_analysis(req)
        else:
            return create_json_response(
                {"error": f"AI endpoint not found: {sub_route}"},
                status=404
            )
    
    # Search route
    if main_route == 'search' and method == 'POST':
        return search_routes.handle_search(req)
    
    # Firestore items routes
    if main_route == 'items':
        if method == 'POST':
            return firestore_routes.handle_create_item(req)
        elif method == 'GET':
            return firestore_routes.handle_get_items(req)
        else:
            return create_json_response(
                {"error": f"Method {method} not allowed for /items"},
                status=405
            )
    
    # 404 - Route niet gevonden
    return create_json_response(
        {
            "error": "Not found",
            "path": path,
            "available_routes": [
                "GET /api",
                "GET /api/health",
                "GET /api/hello?name=X",
                "POST /api/ai/chat",
                "POST /api/ai/chat/stream",
                "POST /api/ai/image",
                "POST /api/search",
                "GET /api/items",
                "POST /api/items"
            ]
        },
        status=404
    )
