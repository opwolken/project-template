"""
Routes voor search endpoints
Tavily web search met optionele AI samenvatting
"""
from firebase_functions import https_fn
from typing import Dict, Any
import json
import os
from lib.tavily_client import TavilyClient, search_and_summarize
from lib.utils import get_tavily_client, create_json_response, validate_required_fields


def handle_search(req: https_fn.Request) -> https_fn.Response:
    """
    POST /api/search
    Web search met Tavily (optioneel met AI samenvatting)
    
    Body:
        query: str (required)
        max_results: int (optional, default: 5)
        summarize: bool (optional, default: False)
    """
    try:
        data = req.get_json()
        
        # Validatie
        missing = validate_required_fields(data, ['query'])
        if missing:
            return create_json_response(
                {"error": f"Missing required fields: {', '.join(missing)}"},
                status=400
            )
        
        query = data.get("query")
        max_results = data.get("max_results", 5)
        summarize = data.get("summarize", False)
        
        if summarize:
            # Search + AI samenvatting
            summary = search_and_summarize(
                query,
                max_results=max_results,
                tavily_key=os.getenv("TAVILY_API_KEY"),
                gemini_key=os.getenv("GEMINI_API_KEY")
            )
            return create_json_response({
                "query": query,
                "summary": summary
            })
        else:
            # Alleen search resultaten
            client = get_tavily_client()
            results = client.get_clean_results(query, max_results=max_results)
            return create_json_response({
                "query": query,
                "results": results
            })
        
    except ValueError as e:
        return create_json_response(
            {"error": str(e)},
            status=500
        )
    except Exception as e:
        return create_json_response(
            {"error": f"Search error: {str(e)}"},
            status=500
        )
