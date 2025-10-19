'use client';

import { useState, useRef, useEffect } from 'react';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
}

interface ChatInterfaceProps {
  systemPrompt?: string;
  placeholder?: string;
  title?: string;
  useStreaming?: boolean;
}

export default function ChatInterface({ 
  systemPrompt,
  placeholder = 'Stel een vraag...',
  title = 'AI Chat',
  useStreaming = true
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const { execute, loading } = useAsyncAction();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastChunkTimeRef = useRef<number>(0);
  const userScrolledUpRef = useRef<boolean>(false);

  // Scroll alleen naar beneden als gebruiker niet omhoog heeft gescrolld
  const scrollToBottom = () => {
    if (!userScrolledUpRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check of gebruiker handmatig heeft gescrolld
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    userScrolledUpRef.current = !isNearBottom;
  };

  // Auto-scroll bij nieuwe berichten (alleen als gebruiker onderaan is)
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStreamingChat = async (
    userMessage: string, 
    history: Array<{ role: string; parts: string[] }>
  ) => {
    setIsStreaming(true);
    lastChunkTimeRef.current = 0;
    
    // Add assistant message placeholder
    const assistantMessageIndex = messages.length + 1;
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: '', 
      streaming: true 
    }]);

    try {
      abortControllerRef.current = new AbortController();
      
      const response = await fetch('/api/ai/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history,
          system_prompt: systemPrompt
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `API call failed: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let accumulatedContent = '';
      let displayedContent = '';

      // Functie om characters gradueel toe te voegen met adaptieve snelheid
      const animateChunk = async (newChunk: string) => {
        const now = Date.now();
        const timeSinceLastChunk = lastChunkTimeRef.current > 0 
          ? now - lastChunkTimeRef.current 
          : 100;
        
        lastChunkTimeRef.current = now;
        
        // Bereken adaptieve delay gebaseerd op chunk arrival snelheid
        // Snellere chunks = snellere display
        // Langzamere chunks = langzamere display voor smooth overgang
        const baseDelay = 2; // minimum delay
        const maxDelay = 8; // maximum delay
        const adaptiveDelay = Math.min(
          maxDelay,
          Math.max(baseDelay, timeSinceLastChunk / newChunk.length * 0.3)
        );
        
        // Voeg chunk toe aan accumulated content
        accumulatedContent += newChunk;
        
        // Animate character by character met fade-in
        const chars = newChunk.split('');
        for (let i = 0; i < chars.length; i++) {
          displayedContent += chars[i];
          
          // Update het assistant bericht met fade-in class
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[assistantMessageIndex] = {
              role: 'assistant',
              content: displayedContent,
              streaming: true
            };
            return newMessages;
          });
          
          // Adaptieve delay
          if (i < chars.length - 1) {
            await new Promise(resolve => setTimeout(resolve, adaptiveDelay));
          }
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          // Skip SSE comments (lines starting with :)
          if (line.startsWith(':')) {
            continue;
          }
          
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.chunk) {
                // Animate de chunk character by character
                await animateChunk(data.chunk);
              } else if (data.done) {
                // Mark streaming als compleet
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[assistantMessageIndex] = {
                    role: 'assistant',
                    content: accumulatedContent,
                    streaming: false
                  };
                  return newMessages;
                });
              } else if (data.error) {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Stream cancelled');
      } else {
        console.error('Streaming error:', error);
        // Verwijder placeholder message bij error
        setMessages(prev => prev.slice(0, -1));
        throw error;
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleNormalChat = async (
    userMessage: string, 
    history: Array<{ role: string; parts: string[] }>
  ) => {
    const result = await execute(
      async () => {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            history,
            system_prompt: systemPrompt
          })
        });
        
        if (!response.ok) {
          throw new Error('API call failed');
        }
        
        return response.json();
      },
      {
        errorMessage: 'Chat mislukt',
        errorDescription: 'Kon geen antwoord krijgen van de AI'
      }
    );

    if (result?.response) {
      setMessages(prev => [...prev, { role: 'assistant', content: result.response }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || isStreaming) return;

    const userMessage = input.trim();
    setInput('');

    // Reset scroll state - we want to scroll for new messages
    userScrolledUpRef.current = false;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Convert to Gemini history format
    const history = messages
      .filter(msg => !msg.streaming) // Filter out incomplete streaming messages
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [msg.content]
      }));

    // Choose streaming or normal based on prop
    if (useStreaming) {
      await handleStreamingChat(userMessage, history);
    } else {
      await handleNormalChat(userMessage, history);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const isProcessing = loading || isStreaming;

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600 mt-1">
            Powered by Gemini AI {useStreaming && '• Streaming'}
          </p>
        </div>
        <div className="flex gap-2">
          {isStreaming && (
            <Button variant="ghost" size="sm" onClick={stopStreaming}>
              Stop streaming
            </Button>
          )}
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearChat}>
              Wis chat
            </Button>
          )}
        </div>
      </div>

      {/* Chat messages */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="space-y-4 mb-6 max-h-96 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            <div className="text-4xl mb-3">💬</div>
            <p>Begin een gesprek met de AI</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              {message.role === 'user' ? (
                // User message: praatbubbel rechts, max 75% breedte
                <div className="max-w-[75%]">
                  <div className="bg-neutral-200 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                    <p className="text-sm text-neutral-900 whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ) : (
                // AI message: volle breedte, geen bubble
                <div className="w-full">
                  {message.streaming && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                      <span className="text-xs text-neutral-500">AI is aan het typen...</span>
                    </div>
                  )}
                  <div 
                    className="text-sm prose prose-sm max-w-none text-neutral-900"
                    style={{
                      animation: message.streaming ? 'fadeIn 0.35s ease-in' : 'none'
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        // Styling voor code blocks
                        code: ({ className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          ) : (
                            <code className="bg-neutral-200 px-1.5 py-0.5 rounded text-xs" {...props}>
                              {children}
                            </code>
                          );
                        },
                        // Styling voor links
                        a: ({ children, ...props }) => (
                          <a 
                            className="text-primary-600 hover:underline font-medium" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                        // Styling voor lists
                        ul: ({ children, ...props }) => (
                          <ul className="list-disc list-inside space-y-1 my-2" {...props}>
                            {children}
                          </ul>
                        ),
                        ol: ({ children, ...props }) => (
                          <ol className="list-decimal list-inside space-y-1 my-2" {...props}>
                            {children}
                          </ol>
                        ),
                        // Styling voor paragraphs
                        p: ({ children, ...props }) => (
                          <p className="mb-2 last:mb-0" {...props}>
                            {children}
                          </p>
                        ),
                      }}
                    >
                      {message.content || (message.streaming ? '...' : '')}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        {(loading || isStreaming) && !messages.some(m => m.streaming) && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500" />
              <span className="text-sm text-neutral-500">AI denkt na...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isProcessing}
          className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
        />
        <Button
          type="submit"
          disabled={isProcessing || !input.trim()}
          variant="primary"
        >
          {isProcessing ? 'Bezig...' : 'Verstuur'}
        </Button>
      </form>
    </Card>
  );
}
