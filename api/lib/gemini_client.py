"""
Gemini AI Client
Simple wrapper voor Google's Gemini API met chat en image support
"""
import os
from typing import Optional, List, Dict, Any
import google.generativeai as genai
from PIL import Image
import io
import base64


class GeminiClient:
    """Client voor Gemini AI interacties"""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialiseer Gemini client
        
        Args:
            api_key: Gemini API key (gebruikt GEMINI_API_KEY env var als niet gegeven)
        """
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("Gemini API key is vereist")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash-exp')
    
    def chat(
        self,
        message: str,
        history: Optional[List[Dict[str, str]]] = None,
        system_prompt: Optional[str] = None
    ) -> str:
        """
        Stuur chat bericht naar Gemini
        
        Args:
            message: Gebruiker bericht
            history: Optionele chat geschiedenis [{"role": "user/model", "parts": ["text"]}]
            system_prompt: Optionele systeem instructies
            
        Returns:
            Gemini response text
        """
        # Start chat sessie met optionele geschiedenis
        chat = self.model.start_chat(history=history or [])
        
        # Voeg system prompt toe als eerste bericht als gegeven
        if system_prompt and not history:
            chat.send_message(system_prompt)
        
        response = chat.send_message(message)
        return response.text
    
    def chat_with_image(
        self,
        message: str,
        image_data: str,
        image_format: str = "base64"
    ) -> str:
        """
        Chat met image upload
        
        Args:
            message: Gebruiker vraag over de image
            image_data: Image als base64 string of file path
            image_format: "base64" of "path"
            
        Returns:
            Gemini response text
        """
        # Laad image
        if image_format == "base64":
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
        elif image_format == "path":
            image = Image.open(image_data)
        else:
            raise ValueError("image_format moet 'base64' of 'path' zijn")
        
        # Stuur naar Gemini
        response = self.model.generate_content([message, image])
        return response.text
    
    def stream_chat(
        self,
        message: str,
        history: Optional[List[Dict[str, str]]] = None
    ):
        """
        Stream chat response (voor real-time output)
        
        Args:
            message: Gebruiker bericht
            history: Optionele chat geschiedenis
            
        Yields:
            Text chunks als ze binnenkomen
        """
        chat = self.model.start_chat(history=history or [])
        response = chat.send_message(message, stream=True)
        
        for chunk in response:
            if chunk.text:
                yield chunk.text


# Convenience functies
def quick_chat(message: str, api_key: Optional[str] = None) -> str:
    """Snelle one-off chat zonder client setup"""
    client = GeminiClient(api_key)
    return client.chat(message)


def analyze_image(
    image_data: str,
    question: str = "Beschrijf deze afbeelding",
    api_key: Optional[str] = None
) -> str:
    """Snelle image analyse"""
    client = GeminiClient(api_key)
    return client.chat_with_image(question, image_data)
