"""
Routes voor Firestore operaties
Items CRUD voorbeeld
"""
from firebase_functions import https_fn
from firebase_admin import firestore
from typing import Dict, Any
import json
from lib.utils import get_db, create_json_response


def handle_create_item(req: https_fn.Request) -> https_fn.Response:
    """
    POST /api/items
    Maak nieuw item in Firestore
    
    Body:
        name: str (required)
    """
    try:
        data = req.get_json()
        name = data.get("name")
        
        if not name:
            return create_json_response(
                {"error": "Name is required"},
                status=400
            )
        
        doc_ref = get_db().collection("items").document()
        doc_ref.set({
            "name": name,
            "created_at": firestore.SERVER_TIMESTAMP
        })
        
        return create_json_response(
            {"id": doc_ref.id, "message": "Item created"},
            status=201
        )
        
    except Exception as e:
        return create_json_response(
            {"error": str(e)},
            status=400
        )


def handle_get_items(req: https_fn.Request) -> https_fn.Response:
    """
    GET /api/items
    Haal alle items op uit Firestore
    """
    try:
        items = []
        docs = get_db().collection("items").stream()
        
        for doc in docs:
            item = doc.to_dict()
            item["id"] = doc.id
            items.append(item)
        
        return create_json_response({"items": items})
        
    except Exception as e:
        return create_json_response(
            {"error": str(e)},
            status=500
        )
