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
import { colors } from '@/lib/design-system';
import { MessageSquare, Search, Sparkles, Info, ArrowLeft, Home } from 'lucide-react';

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
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '64px' }}>
      {/* Hero Section - Dark - Compacter */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: colors.accent.primary,
          backgroundImage: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.secondary})`,
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        <Container size="md">
          <div className="max-w-2xl relative z-10">
            <Badge 
              variant="accent" 
              size="md" 
              style={{ 
                backgroundColor: colors.accent.hover,
                color: colors.text.inverse,
                border: 'none',
              }}
            >
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              Powered by Gemini AI & Tavily
            </Badge>
            
            <h1 
              className="mt-4 font-bold tracking-tight font-serif leading-tight" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              }}
            >
              AI Features
            </h1>
            
            <p 
              className="mt-4 text-sm md:text-base leading-relaxed" 
              style={{ 
                color: colors.accent.lighter,
                maxWidth: '500px',
              }}
            >
              Chat met AI en doorzoek het web met intelligente samenvattingen.
            </p>
          </div>
        </Container>
      </section>

      {/* Tab Navigation - Direct na hero */}
      <section style={{ backgroundColor: colors.background, paddingTop: '3rem', paddingBottom: '2rem' }}>
        <Container size="md">
          <div className="flex gap-3">
            <Button
              variant={activeTab === 'chat' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setActiveTab('chat')}
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <MessageSquare className="inline-block w-5 h-5 mr-2" /> AI Chat
            </Button>
            <Button
              variant={activeTab === 'search' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setActiveTab('search')}
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <Search className="inline-block w-5 h-5 mr-2" /> Web Search
            </Button>
          </div>
        </Container>
      </section>

      {/* Content Section - Direct zichtbaar */}
      <section style={{ backgroundColor: colors.background, paddingBottom: '3rem' }}>
        <Container size="md">
          <div>
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
        </Container>
      </section>

      {/* Info Banner - Onder de interface */}
      <section style={{ backgroundColor: colors.background, paddingTop: '2rem', paddingBottom: '3rem' }}>
        <Container size="md">
          <Card 
            padding="md" 
            style={{ 
              backgroundColor: colors.accent.lighter,
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="rounded p-2 flex-shrink-0"
                style={{ backgroundColor: colors.accent.light }}
              >
                <Info className="w-5 h-5" style={{ color: colors.accent.primary }} />
              </div>
              <div className="flex-1">
                <p 
                  className="text-sm leading-snug" 
                  style={{ color: colors.text.secondary }}
                >
                  Voor productie gebruik heb je API keys nodig (zie .env.example in de api folder).
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Features Grid - Dark Background with Image - Compacter */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: colors.accent.secondary,
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Background Image with Duotone */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: colors.accent.primary,
            mixBlendMode: 'multiply',
            opacity: 0.7,
          }}
        />
        
        <Container size="md">
          <div className="max-w-2xl mb-8 relative z-10">
            <h2 
              className="font-bold font-serif" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              }}
            >
              Mogelijkheden
            </h2>
            <p 
              className="mt-3 text-sm md:text-base leading-relaxed" 
              style={{ 
                color: colors.accent.lighter,
              }}
            >
              Ontdek wat je allemaal kunt doen met deze AI integraties.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 relative z-10">
            <Card 
              hover 
              padding="md"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-3" style={{ color: colors.accent.primary }}>
                <MessageSquare className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-serif" style={{ color: colors.text.primary }}>
                AI Chat
              </h3>
              <p 
                className="text-sm mb-3 leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                }}
              >
                Chat met Gemini AI voor vragen, brainstorming, of hulp bij problemen.
              </p>
              <Badge variant="success" size="sm">
                <Sparkles className="inline-block w-3 h-3 mr-1" /> Actief
              </Badge>
            </Card>

            <Card 
              hover 
              padding="md"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-3" style={{ color: colors.accent.primary }}>
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-serif" style={{ color: colors.text.primary }}>
                Web Search
              </h3>
              <p 
                className="text-sm mb-3 leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                }}
              >
                Doorzoek het web met Tavily en krijg relevante resultaten terug.
              </p>
              <Badge variant="success" size="sm">
                <Sparkles className="inline-block w-3 h-3 mr-1" /> Actief
              </Badge>
            </Card>

            <Card 
              hover 
              padding="md"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-3" style={{ color: colors.accent.primary }}>
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-serif" style={{ color: colors.text.primary }}>
                AI Samenvatting
              </h3>
              <p 
                className="text-sm mb-3 leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                }}
              >
                Combineer search met AI voor slimme samenvattingen van zoekresultaten.
              </p>
              <Badge variant="success" size="sm">
                <Sparkles className="inline-block w-3 h-3 mr-1" /> Actief
              </Badge>
            </Card>
          </div>
        </Container>
      </section>

      {/* Quick Actions - Light */}
      <section style={{ backgroundColor: colors.background, paddingTop: '3rem', paddingBottom: '3rem' }}>
        <Container size="md">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                size="lg"
                style={{
                  transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                <ArrowLeft className="inline-block w-5 h-5 mr-2" /> Terug naar Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg"
                style={{
                  transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                <Home className="inline-block w-5 h-5 mr-2" /> Terug naar Home
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
