"""
Basis routes
Health check, hello, root endpoint
"""
from firebase_functions import https_fn
from typing import Dict, Any
from lib.utils import create_json_response


def handle_root(req: https_fn.Request) -> https_fn.Response:
    """GET /api - Root endpoint"""
    return create_json_response({
        "message": "Project Template API",
        "version": "1.0.0",
        "path": req.path
    })


def handle_health(req: https_fn.Request) -> https_fn.Response:
    """GET /api/health - Health check endpoint"""
    return create_json_response({
        "status": "ok",
        "message": "API is running"
    })


def handle_hello(req: https_fn.Request) -> https_fn.Response:
    """GET /api/hello?name=X - Hello endpoint"""
    name = req.args.get("name", "World")
    return create_json_response({
        "message": f"Hello, {name}!"
    })
