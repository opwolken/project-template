"""
Tavily Search Client
Simple wrapper voor Tavily search API
"""
import os
from typing import Optional, List, Dict, Any
import requests


class TavilyClient:
    """Client voor Tavily search API"""
    
    BASE_URL = "https://api.tavily.com"
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialiseer Tavily client
        
        Args:
            api_key: Tavily API key (gebruikt TAVILY_API_KEY env var als niet gegeven)
        """
        self.api_key = api_key or os.getenv("TAVILY_API_KEY")
        if not self.api_key:
            raise ValueError("Tavily API key is vereist")
    
    def search(
        self,
        query: str,
        max_results: int = 5,
        search_depth: str = "basic",
        include_domains: Optional[List[str]] = None,
        exclude_domains: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Zoek met Tavily
        
        Args:
            query: Zoek query
            max_results: Max aantal resultaten (1-10)
            search_depth: "basic" of "advanced"
            include_domains: Lijst van domains om in te filteren
            exclude_domains: Lijst van domains om uit te filteren
            
        Returns:
            Dict met search results
        """
        payload = {
            "api_key": self.api_key,
            "query": query,
            "max_results": max_results,
            "search_depth": search_depth,
        }
        
        if include_domains:
            payload["include_domains"] = include_domains
        if exclude_domains:
            payload["exclude_domains"] = exclude_domains
        
        response = requests.post(
            f"{self.BASE_URL}/search",
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    def get_clean_results(
        self,
        query: str,
        max_results: int = 5
    ) -> List[Dict[str, str]]:
        """
        Krijg alleen de essentials: title, url, content
        
        Args:
            query: Zoek query
            max_results: Max aantal resultaten
            
        Returns:
            List van dicts met title, url, content
        """
        results = self.search(query, max_results)
        
        clean_results = []
        for result in results.get("results", []):
            clean_results.append({
                "title": result.get("title", ""),
                "url": result.get("url", ""),
                "content": result.get("content", "")
            })
        
        return clean_results
    
    def search_news(
        self,
        query: str,
        max_results: int = 5,
        days: int = 7
    ) -> List[Dict[str, str]]:
        """
        Zoek recent nieuws
        
        Args:
            query: Zoek query
            max_results: Max aantal resultaten
            days: Aantal dagen terug
            
        Returns:
            List van nieuws resultaten
        """
        payload = {
            "api_key": self.api_key,
            "query": query,
            "max_results": max_results,
            "search_depth": "advanced",
            "topic": "news",
            "days": days
        }
        
        response = requests.post(
            f"{self.BASE_URL}/search",
            json=payload
        )
        response.raise_for_status()
        
        results = response.json()
        return self.get_clean_results(query, max_results)


# Convenience functies
def quick_search(query: str, max_results: int = 5, api_key: Optional[str] = None) -> List[Dict[str, str]]:
    """Snelle search zonder client setup"""
    client = TavilyClient(api_key)
    return client.get_clean_results(query, max_results)


def search_and_summarize(
    query: str,
    max_results: int = 3,
    tavily_key: Optional[str] = None,
    gemini_key: Optional[str] = None
) -> str:
    """
    Zoek met Tavily en laat Gemini samenvatten
    Combineert beide clients voor één actie
    """
    from .gemini_client import GeminiClient
    
    # Search
    tavily = TavilyClient(tavily_key)
    results = tavily.get_clean_results(query, max_results)
    
    # Format voor Gemini
    context = "\n\n".join([
        f"Bron: {r['title']}\nURL: {r['url']}\n{r['content']}"
        for r in results
    ])
    
    # Summarize
    gemini = GeminiClient(gemini_key)
    prompt = f"Geef een heldere samenvatting van deze zoekresultaten over '{query}':\n\n{context}"
    
    return gemini.chat(prompt)
