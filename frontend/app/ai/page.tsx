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
      {/* Hero Section - Dark */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: colors.accent.primary,
          backgroundImage: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.secondary})`,
          paddingTop: '8rem',
          paddingBottom: '8rem',
        }}
      >
        <Container size="lg">
          <div className="max-w-3xl relative z-10">
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
              className="mt-6 font-bold tracking-tight font-serif leading-tight" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              }}
            >
              AI Features
            </h1>
            
            <p 
              className="mt-6 text-lg md:text-xl leading-relaxed" 
              style={{ 
                color: colors.accent.lighter,
                textAlign: 'justify',
                hyphens: 'auto',
                maxWidth: '600px',
              }}
            >
              Chat met AI en doorzoek het web. Deze features gebruiken Gemini AI voor conversaties 
              en Tavily voor intelligente web search met samenvattingen.
            </p>
          </div>
        </Container>
      </section>

      {/* Info Banner - Light */}
      <section style={{ backgroundColor: colors.background, paddingTop: '6rem', paddingBottom: '3rem' }}>
        <Container size="md">
          <Card 
            padding="lg" 
            style={{ 
              backgroundColor: colors.accent.lighter,
              borderColor: colors.accent.light,
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: colors.accent.light }}
              >
                <Info className="w-6 h-6" style={{ color: colors.accent.primary }} />
              </div>
              <div className="flex-1">
                <p 
                  className="font-semibold mb-2 font-serif text-lg" 
                  style={{ color: colors.text.primary }}
                >
                  AI Demo Omgeving
                </p>
                <p 
                  className="text-sm leading-relaxed" 
                  style={{ 
                    color: colors.text.secondary,
                    textAlign: 'justify',
                    hyphens: 'auto',
                  }}
                >
                  Deze features gebruiken Gemini AI voor chat en Tavily voor web search. 
                  Voor productie gebruik heb je API keys nodig (zie .env.example in de api folder). 
                  De huidige implementatie toont de functionaliteit en kan eenvoudig uitgebreid worden.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Tab Navigation */}
      <section style={{ backgroundColor: colors.background, paddingBottom: '3rem' }}>
        <Container size="md">
          <div className="flex gap-3">
            <Button
              variant={activeTab === 'chat' ? 'primary' : 'outline'}
              size="lg"
              onClick={() => setActiveTab('chat')}
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <MessageSquare className="inline-block w-5 h-5 mr-2" /> AI Chat
            </Button>
            <Button
              variant={activeTab === 'search' ? 'primary' : 'outline'}
              size="lg"
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

      {/* Content Section */}
      <section style={{ backgroundColor: colors.background, paddingBottom: '6rem' }}>
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

      {/* Features Grid - Dark Background with Image */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: colors.accent.secondary,
          paddingTop: '8rem',
          paddingBottom: '8rem',
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
        
        <Container size="lg">
          <div className="max-w-2xl mb-12 relative z-10">
            <h2 
              className="font-bold font-serif" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
              }}
            >
              Mogelijkheden
            </h2>
            <p 
              className="mt-6 text-base md:text-lg leading-relaxed" 
              style={{ 
                color: colors.accent.lighter,
                textAlign: 'justify',
                hyphens: 'auto',
              }}
            >
              Ontdek wat je allemaal kunt doen met deze AI integraties. Van simpele vragen 
              tot complexe zoekacties, alles is mogelijk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <Card 
              hover 
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-4" style={{ color: colors.accent.primary }}>
                <MessageSquare className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: colors.text.primary }}>
                AI Chat
              </h3>
              <p 
                className="text-sm mb-4 leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                  textAlign: 'justify',
                  hyphens: 'auto',
                }}
              >
                Chat met Gemini AI voor vragen, brainstorming, of hulp bij problemen. 
                De AI begrijpt context en kan uitgebreide gesprekken voeren.
              </p>
              <Badge variant="success" size="sm">
                <Sparkles className="inline-block w-3 h-3 mr-1" /> Actief
              </Badge>
            </Card>

            <Card 
              hover 
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-4" style={{ color: colors.accent.primary }}>
                <Search className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: colors.text.primary }}>
                Web Search
              </h3>
              <p 
                className="text-sm mb-4 leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                  textAlign: 'justify',
                  hyphens: 'auto',
                }}
              >
                Doorzoek het web met Tavily en krijg relevante resultaten terug. 
                Perfect voor research en het vinden van actuele informatie.
              </p>
              <Badge variant="success" size="sm">
                <Sparkles className="inline-block w-3 h-3 mr-1" /> Actief
              </Badge>
            </Card>

            <Card 
              hover 
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-4" style={{ color: colors.accent.primary }}>
                <Sparkles className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: colors.text.primary }}>
                AI Samenvatting
              </h3>
              <p 
                className="text-sm mb-4 leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                  textAlign: 'justify',
                  hyphens: 'auto',
                }}
              >
                Combineer search met AI voor slimme samenvattingen van zoekresultaten. 
                Krijg het beste uit beide werelden.
              </p>
              <Badge variant="success" size="sm">
                <Sparkles className="inline-block w-3 h-3 mr-1" /> Actief
              </Badge>
            </Card>
          </div>
        </Container>
      </section>

      {/* Quick Actions - Light */}
      <section style={{ backgroundColor: colors.background, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <Container size="md">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
