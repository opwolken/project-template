'use client';

import { useProtectedRoute } from '@/lib/hooks/useProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ChatInterface from '@/components/ai/ChatInterface';
import SearchInterface from '@/components/ai/SearchInterface';
import Link from 'next/link';
import { useState } from 'react';

export default function AIPage() {
  const { isReady, loading, user } = useProtectedRoute();
  const [activeTab, setActiveTab] = useState<'chat' | 'search'>('chat');

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isReady || !user) {
    return null;
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Container size="lg" className="py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-900">AI Features</h1>
              <p className="text-neutral-600">Chat met AI en doorzoek het web</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <Card padding="md" className="mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-900 mb-1">🤖 AI Demo</p>
              <p className="text-sm text-blue-700">
                Deze features gebruiken Gemini AI voor chat en Tavily voor web search. 
                Voor productie gebruik heb je API keys nodig (zie .env.example in de api folder).
              </p>
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'chat' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('chat')}
          >
            💬 AI Chat
          </Button>
          <Button
            variant={activeTab === 'search' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('search')}
          >
            🔍 Web Search
          </Button>
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === 'chat' && (
            <ChatInterface
              title="Gemini AI Chat"
              placeholder="Stel een vraag aan Gemini..."
              systemPrompt="Je bent een behulpzame AI assistent. Geef duidelijke en beknopte antwoorden in het Nederlands."
            />
          )}
          {activeTab === 'search' && (
            <SearchInterface
              title="Web Search + AI Samenvatting"
              enableSummarize={true}
              maxResults={5}
            />
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card hover padding="lg">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              AI Chat
            </h3>
            <p className="text-neutral-600 text-sm mb-4">
              Chat met Gemini AI voor vragen, brainstorming, of hulp bij problemen.
            </p>
            <Badge variant="success" size="sm">
              Actief
            </Badge>
          </Card>

          <Card hover padding="lg">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Web Search
            </h3>
            <p className="text-neutral-600 text-sm mb-4">
              Doorzoek het web met Tavily en krijg relevante resultaten terug.
            </p>
            <Badge variant="success" size="sm">
              Actief
            </Badge>
          </Card>

          <Card hover padding="lg">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              AI Samenvatting
            </h3>
            <p className="text-neutral-600 text-sm mb-4">
              Combineer search met AI voor slimme samenvattingen van zoekresultaten.
            </p>
            <Badge variant="success" size="sm">
              Actief
            </Badge>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              ← Terug naar Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Terug naar Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
