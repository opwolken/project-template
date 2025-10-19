'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/lib/ToastContext';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import Link from 'next/link';
import { Rocket, Shield, Zap, Palette, ArrowRight, Check, X, AlertTriangle, Info, Hand } from 'lucide-react';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { colors } from '@/lib/design-system';

export default function Home() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const { user, isAuthorized } = useAuth();
  const { success, error, warning, info } = useToast();
  const { execute: executeHello, loading: helloLoading } = useAsyncAction();
  const { execute: executeHealth, loading: healthLoading } = useAsyncAction();

  const loading = helloLoading || healthLoading;

  const handleHello = async () => {
    setMessage('');
    
    const result = await executeHello(
      async () => {
        const response = await fetch(`/api/hello?name=${encodeURIComponent(name || 'World')}`);
        return response.json();
      },
      {
        successMessage: 'API Call Success',
        successDescription: 'Hello endpoint bereikt!',
        errorMessage: 'API Error',
        errorDescription: 'Er is iets misgegaan bij het aanroepen van de API',
      }
    );
    
    if (result) {
      setMessage(result.message || JSON.stringify(result));
    }
  };

  const handleHealth = async () => {
    setMessage('');
    
    const result = await executeHealth(
      async () => {
        const response = await fetch('/api/health');
        return response.json();
      }
    );
    
    if (result) {
      setMessage(`Status: ${result.status} - ${result.message}`);
      info('Health Check', `Status: ${result.status}`);
    }
  };

  return (
    <div style={{ paddingTop: '64px' }}> {/* Account for fixed header */}
      {/* Hero Section - Dark with Overlapping Elements */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: colors.accent.primary,
          backgroundImage: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.secondary})`,
          paddingTop: '10rem',
          paddingBottom: '10rem',
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
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <Rocket className="inline-block w-4 h-4 mr-2" />
              Next.js + Firebase + Python
            </Badge>
            
            <h1 
              className="mt-8 font-bold tracking-tight font-serif leading-tight" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                animation: 'fadeInUp 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              Modern platform voor jouw projecten
            </h1>
            
            <div 
              className="mt-8 text-lg md:text-xl leading-relaxed space-y-4" 
              style={{ 
                color: colors.accent.lighter,
                textAlign: 'justify',
                hyphens: 'auto',
                maxWidth: '600px',
                animation: 'fadeInUp 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.2s backwards',
              }}
            >
              <p>
                Een volledig uitgeruste template met authenticatie, API integratie en een modern design systeem. 
                Gebouwd met de nieuwste technologieën en best practices voor snelle ontwikkeling.
              </p>
              <p>
                Deze template biedt je alles wat je nodig hebt om direct te starten met je project. 
                Van gebruikersbeheer tot AI-integraties, het zit er allemaal in.
              </p>
            </div>
            
            <div 
              className="mt-12 flex flex-col sm:flex-row gap-4"
              style={{
                animation: 'fadeInUp 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.4s backwards',
              }}
            >
              {user && isAuthorized ? (
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    style={{
                      backgroundColor: colors.text.inverse,
                      color: colors.accent.primary,
                      border: 'none',
                      transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                    }}
                  >
                    Ga naar Dashboard
                    <ArrowRight className="inline-block w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  variant="secondary"
                  disabled
                  style={{
                    backgroundColor: colors.text.inverse,
                    color: colors.accent.primary,
                    border: 'none',
                  }}
                >
                  Log in om te starten
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleHealth}
                style={{
                  borderColor: colors.text.inverse,
                  color: colors.text.inverse,
                  transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                Bekijk Status
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* API Demo Section with Unsplash Image & Geometric Overlay */}
      <section 
        className="relative overflow-hidden border-y" 
        style={{ 
          backgroundColor: colors.background,
          borderColor: colors.border,
          paddingTop: '8rem', // luxury spacing
          paddingBottom: '8rem',
        }}
      >
        {/* Background Image with Duotone Effect */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.accent.primary}20, ${colors.accent.light}40)`,
          }}
        />
        
        <Container size="md">
          <div className="max-w-2xl relative z-10">
            <h2 
              className="font-bold font-serif" 
              style={{ 
                color: colors.text.primary,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', // 32-56px dramatic
              }}
            >
              Test de API
            </h2>
            <p 
              className="mt-6 text-base md:text-lg leading-relaxed" 
              style={{ 
                color: colors.text.secondary,
                textAlign: 'justify',
                hyphens: 'auto'
              }}
            >
              Probeer de backend API met een eenvoudige demo. Deze interface laat zien hoe eenvoudig 
              het is om met de Python backend te communiceren. De API is gebouwd met Firebase Functions 
              en kan uitgebreid worden met je eigen endpoints voor specifieke functionaliteit die je 
              applicatie nodig heeft.
            </p>
          </div>

          <Card 
            padding="lg" 
            className="max-w-2xl mt-12 relative z-10"
            style={{
              transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          >
            <div className="space-y-6">
              <Input
                label="Jouw naam"
                placeholder="Voer je naam in"
                value={name}
                onChange={(e) => setName(e.target.value)}
                helpText="Test de hello endpoint met een eigen naam"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleHello}
                  disabled={loading}
                  variant="primary"
                  fullWidth
                >
                  {loading ? 'Laden...' : 'Zeg Hallo'}
                </Button>
                
                <Button
                  onClick={handleHealth}
                  disabled={loading}
                  variant="secondary"
                  fullWidth
                >
                  Health Check
                </Button>
              </div>

              {message && (
                <div 
                  className="p-4 border" 
                  style={{ 
                    backgroundColor: colors.accent.lighter,
                    borderColor: colors.border,
                    borderRadius: '2px',
                    animation: 'fadeInUp 0.4s ease-out',
                  }}
                >
                  <p className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>
                    API Response:
                  </p>
                  <p className="font-mono text-sm break-all" style={{ color: colors.text.primary }}>
                    {message}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </Container>
      </section>

      {/* Toast Demo Section - Dark with Geometric Elements */}
      <section 
        className="relative overflow-hidden border-b" 
        style={{ 
          backgroundColor: colors.accent.secondary,
          borderColor: colors.accent.hover,
          paddingTop: '8rem',
          paddingBottom: '8rem',
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
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              Nieuw Feature
            </Badge>
            <h2 
              className="font-bold font-serif mt-6" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              Toast Notificaties
            </h2>
            <p 
              className="mt-6 text-base md:text-lg leading-relaxed" 
              style={{ 
                color: colors.accent.lighter,
                textAlign: 'justify',
                hyphens: 'auto'
              }}
            >
              Geef gebruikers direct feedback met elegante toast notificaties. Deze component zorgt 
              voor consistente communicatie met je gebruikers bij acties zoals het opslaan van data, 
              het versturen van formulieren, of wanneer er iets mis gaat. Elke notificatie verdwijnt 
              automatisch na een paar seconden, maar kan ook handmatig gesloten worden.
            </p>
          </div>

          <Card 
            padding="lg" 
            className="mt-12 max-w-2xl relative z-10"
            style={{
              transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          >
            <h3 className="text-xl font-semibold mb-4 font-serif" style={{ color: colors.text.primary }}>
              Test de notificaties
            </h3>
            <p 
              className="mb-6 leading-relaxed" 
              style={{ 
                color: colors.text.secondary,
                textAlign: 'justify',
                hyphens: 'auto'
              }}
            >
              Klik op de buttons om verschillende soorten toast notificaties te zien. 
              Elke variant heeft zijn eigen kleurcodering en icoon voor maximale duidelijkheid.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => success('Succes!', 'De actie is succesvol uitgevoerd')}
              >
                <Check className="inline-block w-4 h-4 mr-1" /> Success
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => error('Error!', 'Er is iets misgegaan')}
              >
                <X className="inline-block w-4 h-4 mr-1" /> Error
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => warning('Let op!', 'Dit is een waarschuwing')}
              >
                <AlertTriangle className="inline-block w-4 h-4 mr-1" /> Warning
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => info('Info', 'Dit is een informatief bericht')}
              >
                <Info className="inline-block w-4 h-4 mr-1" /> Info
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* Features Section with Background Image */}
      <section 
        className="relative overflow-hidden" 
        style={{ 
          backgroundColor: colors.background,
          paddingTop: '8rem',
          paddingBottom: '8rem',
        }}
      >
        {/* Background Image with Duotone */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${colors.background}00, ${colors.accent.light}60)`,
          }}
        />
        
        <Container size="lg">
          <div className="max-w-2xl mb-16 relative z-10">
            <h2 
              className="font-bold font-serif" 
              style={{ 
                color: colors.text.primary,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              Wat zit er in deze template?
            </h2>
            <p 
              className="mt-6 text-base md:text-lg leading-relaxed" 
              style={{ 
                color: colors.text.secondary,
                textAlign: 'justify',
                hyphens: 'auto'
              }}
            >
              Deze template is ontworpen om je een vliegende start te geven. Alle basis-componenten 
              zijn al gebouwd en getest, zodat je direct kunt focussen op de unieke features van jouw 
              applicatie. Van authenticatie tot API-integraties, alles is production-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <Card 
              hover 
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-4" style={{ color: colors.accent.primary }}>
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: colors.text.primary }}>
                Firebase Auth
              </h3>
              <p 
                className="leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                  textAlign: 'justify',
                  hyphens: 'auto'
                }}
              >
                Volledige authenticatie met Google login en geautoriseerde gebruikers beheer. 
                Het systeem ondersteunt role-based access control en kan eenvoudig uitgebreid 
                worden met andere OAuth providers zoals GitHub of Microsoft.
              </p>
            </Card>

            <Card 
              hover 
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-4" style={{ color: colors.accent.primary }}>
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: colors.text.primary }}>
                Python Backend
              </h3>
              <p 
                className="leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                  textAlign: 'justify',
                  hyphens: 'auto'
                }}
              >
                Krachtige API gebouwd met Python en Firebase Functions voor serverless computing. 
                De backend is geoptimaliseerd voor snelheid en schaalbaarheid, met ondersteuning 
                voor Firestore, externe API&apos;s en machine learning integraties.
              </p>
            </Card>

            <Card 
              hover 
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="mb-4" style={{ color: colors.accent.primary }}>
                <Palette className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: colors.text.primary }}>
                Modern Design
              </h3>
              <p 
                className="leading-relaxed" 
                style={{ 
                  color: colors.text.secondary,
                  textAlign: 'justify',
                  hyphens: 'auto'
                }}
              >
                Earthy design systeem met warme aardtinten, strakke lijnen en herbruikbare componenten. 
                Geïnspireerd door Scandinavische meubel-design en moderne architectuur, met focus op 
                leesbaarheid, toegankelijkheid en visuele hiërarchie.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Auth Status - Dark with Geometric Elements */}
      {user && (
        <section 
          className="relative overflow-hidden border-t" 
          style={{ 
            backgroundColor: colors.accent.primary,
            borderColor: colors.accent.hover,
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <Container size="md">
            <Card 
              padding="lg" 
              className="max-w-2xl relative z-10"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div style={{ color: colors.accent.primary }}>
                  <Hand className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: colors.text.primary }}>
                    Welkom, {user.displayName || user.email}
                  </h3>
                  {isAuthorized ? (
                    <div className="space-y-4">
                      <Badge variant="success" size="md">
                        <Check className="inline-block w-4 h-4 mr-1" /> Geautoriseerd
                      </Badge>
                      <p 
                        className="leading-relaxed" 
                        style={{ 
                          color: colors.text.secondary,
                          textAlign: 'justify',
                          hyphens: 'auto'
                        }}
                      >
                        Je hebt toegang tot alle beveiligde pagina&apos;s. Je account is volledig 
                        geactiveerd en je kunt alle functionaliteit van het platform gebruiken. 
                        Ga naar het dashboard om te beginnen.
                      </p>
                      <Link href="/dashboard">
                        <Button variant="primary">
                          Open Dashboard →
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Badge variant="warning" size="md">
                        Wachtend op autorisatie
                      </Badge>
                      <p 
                        className="leading-relaxed" 
                        style={{ 
                          color: colors.text.secondary,
                          textAlign: 'justify',
                          hyphens: 'auto'
                        }}
                      >
                        Je bent succesvol ingelogd maar je account wacht nog op autorisatie door 
                        een beheerder. Dit is een beveiligingsmaatregel om ervoor te zorgen dat alleen 
                        geautoriseerde gebruikers toegang hebben tot de applicatie. Neem contact op 
                        met de beheerder voor meer informatie.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Container>
        </section>
      )}
    </div>
  );
}
