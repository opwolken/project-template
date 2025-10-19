'use client';

import { useState, useRef, useEffect } from 'react';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { colors, shadows } from '@/lib/design-system';
import { Send, Trash2, StopCircle, Sparkles, User, Bot } from 'lucide-react';
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

  // Geen auto-scroll meer - gebruiker heeft zelf controle

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
    <Card padding="none">
      {/* Header */}
      <div 
        className="px-6 py-4 flex items-center justify-between"
        style={{ 
          backgroundColor: colors.accent.lighter,
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded"
            style={{ backgroundColor: colors.accent.light }}
          >
            <Sparkles className="w-5 h-5" style={{ color: colors.accent.primary }} />
          </div>
          <div>
            <h3 className="font-semibold font-serif" style={{ color: colors.text.primary }}>
              {title}
            </h3>
            <p className="text-xs" style={{ color: colors.text.secondary }}>
              Powered by Gemini AI {useStreaming && '• Streaming'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {isStreaming && (
            <Button variant="ghost" size="sm" onClick={stopStreaming}>
              <StopCircle className="w-4 h-4 mr-1" /> Stop
            </Button>
          )}
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearChat}>
              <Trash2 className="w-4 h-4 mr-1" /> Wis
            </Button>
          )}
        </div>
      </div>

      {/* Chat messages */}
      <div 
        ref={messagesContainerRef}
        className="px-6 py-6 space-y-6 max-h-96 overflow-y-auto"
        style={{ backgroundColor: colors.background }}
      >
        {messages.length === 0 ? (
          <div className="text-center py-16" style={{ color: colors.text.tertiary }}>
            <div 
              className="inline-flex p-4 rounded-lg mb-4"
              style={{ backgroundColor: colors.accent.lighter }}
            >
              <Bot className="w-8 h-8" style={{ color: colors.accent.primary }} />
            </div>
            <p className="text-sm">Begin een gesprek met de AI</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <Bot className="w-5 h-5" style={{ color: colors.accent.primary }} />
                </div>
              )}
              
              <div className={`${message.role === 'user' ? 'max-w-[75%]' : 'flex-1'}`}>
                {message.role === 'user' ? (
                  <div 
                    className="rounded-lg px-4 py-3"
                    style={{ 
                      backgroundColor: colors.accent.primary,
                      color: colors.text.inverse,
                      boxShadow: shadows.card,
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {message.streaming && (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full animate-pulse" 
                          style={{ backgroundColor: colors.accent.primary }}
                        />
                        <span className="text-xs" style={{ color: colors.text.tertiary }}>
                          Aan het typen...
                        </span>
                      </div>
                    )}
                    <div 
                      className="text-sm prose prose-sm max-w-none"
                      style={{
                        color: colors.text.primary,
                        animation: message.streaming ? 'fadeIn 0.35s ease-in' : 'none'
                      }}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          code: ({ className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            ) : (
                              <code 
                                className="px-1.5 py-0.5 rounded text-xs font-mono"
                                style={{ backgroundColor: colors.accent.lighter }}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                          a: ({ children, ...props }) => (
                            <a 
                              className="font-medium hover:underline" 
                              style={{ color: colors.accent.primary }}
                              target="_blank" 
                              rel="noopener noreferrer"
                              {...props}
                            >
                              {children}
                            </a>
                          ),
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
                          p: ({ children, ...props }) => (
                            <p className="mb-2 last:mb-0 leading-relaxed" {...props}>
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

              {message.role === 'user' && (
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: colors.accent.light }}
                >
                  <User className="w-5 h-5" style={{ color: colors.accent.primary }} />
                </div>
              )}
            </div>
          ))
        )}
        {(loading || isStreaming) && !messages.some(m => m.streaming) && (
          <div className="flex items-center gap-3">
            <div 
              className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: colors.accent.lighter }}
            >
              <Bot className="w-5 h-5 animate-pulse" style={{ color: colors.accent.primary }} />
            </div>
            <span className="text-sm" style={{ color: colors.text.tertiary }}>
              AI denkt na...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form - Strak design met | > */}
      <div 
        className="px-6 py-4"
        style={{ 
          backgroundColor: colors.surface,
        }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 rounded text-sm transition-all duration-300 focus:outline-none disabled:opacity-50"
            style={{
              backgroundColor: colors.background,
              color: colors.text.primary,
              boxShadow: `inset 0 0 0 1.5px ${colors.border}`,
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `inset 0 0 0 2px ${colors.accent.primary}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = `inset 0 0 0 1.5px ${colors.border}`;
            }}
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            style={{
              backgroundColor: colors.accent.primary,
              boxShadow: shadows.card,
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && input.trim()) {
                e.currentTarget.style.backgroundColor = colors.accent.hover;
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.accent.primary;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div className="flex items-center gap-0.5" style={{ color: colors.text.inverse }}>
              <span className="text-lg font-light">|</span>
              <Send className="w-5 h-5" style={{ transform: 'translateX(1px)' }} />
            </div>
          </button>
        </form>
      </div>
    </Card>
  );
}
