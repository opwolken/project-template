"""
Routes voor AI endpoints
Gemini chat en image analyse
"""
from firebase_functions import https_fn
from typing import Dict, Any, Generator
import json
import time
from lib.gemini_client import GeminiClient
from lib.utils import get_gemini_client, create_json_response, validate_required_fields


def handle_chat_stream(req: https_fn.Request) -> https_fn.Response:
    """
    POST /api/ai/chat/stream
    Stream chat met Gemini AI (Server-Sent Events)
    
    Body:
        message: str (required)
        history: list (optional)
        system_prompt: str (optional)
    """
    try:
        data = req.get_json()
        
        # Validatie
        missing = validate_required_fields(data, ['message'])
        if missing:
            return create_json_response(
                {"error": f"Missing required fields: {', '.join(missing)}"},
                status=400
            )
        
        message = data.get("message")
        history = data.get("history", [])
        system_prompt = data.get("system_prompt")
        
        # Generator functie voor streaming
        def generate():
            try:
                client = get_gemini_client()
                
                # Add system prompt to history if provided
                if system_prompt and not history:
                    history.append({
                        "role": "user",
                        "parts": [system_prompt]
                    })
                
                # Send initial SSE comment to establish connection
                yield ": connected\n\n".encode('utf-8')
                
                # Stream response
                for chunk in client.stream_chat(message, history=history):
                    # Format als SSE en encode to bytes
                    chunk_data = json.dumps({'chunk': chunk})
                    sse_message = f"data: {chunk_data}\n\n"
                    yield sse_message.encode('utf-8')
                
                # Stuur done signaal
                done_message = f"data: {json.dumps({'done': True})}\n\n"
                yield done_message.encode('utf-8')
                
            except Exception as e:
                error_data = json.dumps({'error': str(e)})
                error_message = f"data: {error_data}\n\n"
                yield error_message.encode('utf-8')
        
        # Return streaming response
        return https_fn.Response(
            generate(),
            status=200,
            headers={
                'Content-Type': 'text/event-stream; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no',
                'Access-Control-Allow-Origin': '*'
            }
        )
        
    except ValueError as e:
        return create_json_response(
            {"error": str(e)},
            status=500
        )
    except Exception as e:
        return create_json_response(
            {"error": f"Stream chat error: {str(e)}"},
            status=500
        )


def handle_chat(req: https_fn.Request) -> https_fn.Response:
    """
    POST /api/ai/chat
    Chat met Gemini AI
    
    Body:
        message: str (required)
        history: list (optional)
        system_prompt: str (optional)
    """
    try:
        data = req.get_json()
        
        # Validatie
        missing = validate_required_fields(data, ['message'])
        if missing:
            return create_json_response(
                {"error": f"Missing required fields: {', '.join(missing)}"},
                status=400
            )
        
        message = data.get("message")
        history = data.get("history", [])
        system_prompt = data.get("system_prompt")
        
        # Call Gemini
        client = get_gemini_client()
        response = client.chat(message, history=history, system_prompt=system_prompt)
        
        return create_json_response({
            "response": response,
            "message": message
        })
        
    except ValueError as e:
        return create_json_response(
            {"error": str(e)},
            status=500
        )
    except Exception as e:
        return create_json_response(
            {"error": f"Chat error: {str(e)}"},
            status=500
        )


def handle_image_analysis(req: https_fn.Request) -> https_fn.Response:
    """
    POST /api/ai/image
    Analyseer afbeelding met Gemini
    
    Body:
        image_data: str (required, base64)
        message: str (optional, default: "Beschrijf deze afbeelding")
    """
    try:
        data = req.get_json()
        
        # Validatie
        missing = validate_required_fields(data, ['image_data'])
        if missing:
            return create_json_response(
                {"error": f"Missing required fields: {', '.join(missing)}"},
                status=400
            )
        
        message = data.get("message", "Beschrijf deze afbeelding")
        image_data = data.get("image_data")
        
        # Call Gemini
        client = get_gemini_client()
        response = client.chat_with_image(message, image_data, image_format="base64")
        
        return create_json_response({
            "response": response,
            "message": message
        })
        
    except ValueError as e:
        return create_json_response(
            {"error": str(e)},
            status=500
        )
    except Exception as e:
        return create_json_response(
            {"error": f"Image analysis error: {str(e)}"},
            status=500
        )
