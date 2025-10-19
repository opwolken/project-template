"""
Utility functies voor de API
Shared helpers, clients, responses
"""
from firebase_functions import https_fn
from firebase_admin import firestore
from typing import Dict, Any, List, Optional
import json
import os
from lib.gemini_client import GeminiClient
from lib.tavily_client import TavilyClient


# Global variables voor lazy initialization
_db = None
_gemini_client = None
_tavily_client = None


def get_db():
    """
    Lazy initialization van Firestore client
    Returns: firestore.Client
    """
    global _db
    if _db is None:
        _db = firestore.client()
    return _db


def get_gemini_client() -> GeminiClient:
    """
    Lazy initialization van Gemini client
    Returns: GeminiClient instance
    Raises: ValueError als GEMINI_API_KEY niet gezet is
    """
    global _gemini_client
    if _gemini_client is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        _gemini_client = GeminiClient(api_key)
    return _gemini_client


def get_tavily_client() -> TavilyClient:
    """
    Lazy initialization van Tavily client
    Returns: TavilyClient instance
    Raises: ValueError als TAVILY_API_KEY niet gezet is
    """
    global _tavily_client
    if _tavily_client is None:
        api_key = os.getenv("TAVILY_API_KEY")
        if not api_key:
            raise ValueError("TAVILY_API_KEY environment variable not set")
        _tavily_client = TavilyClient(api_key)
    return _tavily_client


def create_json_response(
    data: Dict[str, Any],
    status: int = 200
) -> https_fn.Response:
    """
    Helper voor consistent JSON responses
    
    Args:
        data: Dictionary met response data
        status: HTTP status code (default: 200)
    
    Returns:
        https_fn.Response met JSON content
    """
    return https_fn.Response(
        json.dumps(data),
        status=status,
        headers={"Content-Type": "application/json"}
    )


def validate_required_fields(
    data: Dict[str, Any],
    required_fields: List[str]
) -> List[str]:
    """
    Valideer of alle required fields aanwezig zijn
    
    Args:
        data: Request data dictionary
        required_fields: List van required field names
    
    Returns:
        List van missing field names (empty list = alles OK)
    """
    missing = []
    for field in required_fields:
        if field not in data or data[field] is None:
            missing.append(field)
    return missing


def normalize_path(path: str) -> str:
    """
    Normaliseer API path voor consistent routing
    Verwijdert function name prefixes van emulator/direct calls
    
    Args:
        path: Request path
    
    Returns:
        Normalized path starting with /api
    """
    # Remove function name prefix als present (emulator/direct calls)
    if '/api/api' in path:
        path = path.replace('/api/api', '/api')
    elif path.startswith('/project-template-7b1d0/europe-west1/api'):
        # Extract alles na de function naam
        parts = path.split('/api', 1)
        path = '/api' + (parts[1] if len(parts) > 1 else '')
    
    # Ensure het begint met /api
    if not path.startswith('/api'):
        path = '/api' + path
    
    return path


def parse_route(path: str) -> tuple[str, Optional[str]]:
    """
    Parse path naar route en optionele sub-route
    
    Args:
        path: Normalized API path (e.g., '/api/ai/chat')
    
    Returns:
        Tuple van (main_route, sub_route)
        Bijvoorbeeld: ('/api/ai/chat', 'chat') of ('/api/hello', None)
    """
    # Remove /api prefix
    if path.startswith('/api'):
        path = path[4:]  # Remove '/api'
    
    # Remove leading/trailing slashes
    path = path.strip('/')
    
    if not path:
        return ('/', None)
    
    # Split op eerste /
    parts = path.split('/', 1)
    main_route = parts[0]
    sub_route = parts[1] if len(parts) > 1 else None
    
    return (main_route, sub_route)
