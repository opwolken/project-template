'use client';

import { useProtectedRoute } from '../../lib/hooks/useProtectedRoute';
import Link from 'next/link';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { colors } from '@/lib/design-system';
import { LayoutDashboard, Check, User, Shield, Lock, FileText, BarChart3, Users, Settings, Sparkles, Home } from 'lucide-react';

export default function Dashboard() {
  const { isReady, loading, user } = useProtectedRoute();

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
          paddingTop: '6rem',
          paddingBottom: '6rem',
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
              <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
              Beveiligde omgeving
            </Badge>
            
            <h1 
              className="mt-6 font-bold tracking-tight font-serif leading-tight" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              }}
            >
              Dashboard
            </h1>
            
            <p 
              className="mt-6 text-base md:text-lg leading-relaxed" 
              style={{ 
                color: colors.accent.lighter,
                textAlign: 'justify',
                hyphens: 'auto',
                maxWidth: '500px',
              }}
            >
              Welkom terug, {user.displayName || user.email}. Je hebt volledige toegang tot alle features 
              en functionaliteit van het platform.
            </p>
          </div>
        </Container>
      </section>

      {/* Success Alert */}
      <section style={{ backgroundColor: colors.background, paddingTop: '6rem', paddingBottom: '3rem' }}>
        <Container size="lg">
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
                <Check className="w-6 h-6" style={{ color: colors.accent.primary }} />
              </div>
              <div className="flex-1">
                <p 
                  className="font-semibold mb-2 font-serif text-lg" 
                  style={{ color: colors.text.primary }}
                >
                  Je bent geautoriseerd
                </p>
                <p 
                  className="text-sm leading-relaxed" 
                  style={{ 
                    color: colors.text.secondary,
                    textAlign: 'justify',
                    hyphens: 'auto',
                  }}
                >
                  Je hebt toegang tot alle beveiligde pagina&apos;s. Je e-mailadres is goedgekeurd 
                  door de beheerder en je account heeft volledige rechten om alle functionaliteit te gebruiken.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Stats Grid */}
      <section style={{ backgroundColor: colors.background, paddingBottom: '6rem' }}>
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              padding="lg" 
              hover
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="info">Account</Badge>
                <div 
                  className="rounded-lg p-2"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <User className="w-6 h-6" style={{ color: colors.accent.primary }} />
                </div>
              </div>
              <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>Email</p>
              <p 
                className="text-lg font-semibold font-serif truncate" 
                style={{ color: colors.text.primary }}
              >
                {user.email}
              </p>
            </Card>

            <Card 
              padding="lg" 
              hover
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="success">Status</Badge>
                <div 
                  className="rounded-lg p-2"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <Shield className="w-6 h-6" style={{ color: colors.accent.primary }} />
                </div>
              </div>
              <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>Toegang</p>
              <p 
                className="text-lg font-semibold font-serif" 
                style={{ color: colors.text.primary }}
              >
                Geautoriseerd
              </p>
            </Card>

            <Card 
              padding="lg" 
              hover
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="default">Rol</Badge>
                <div 
                  className="rounded-lg p-2"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <Lock className="w-6 h-6" style={{ color: colors.accent.primary }} />
                </div>
              </div>
              <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>Rechten</p>
              <p 
                className="text-lg font-semibold font-serif" 
                style={{ color: colors.text.primary }}
              >
                Volledige toegang
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Features Section - Dark Background */}
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop)',
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
              Beschikbare functies
            </h2>
            <p 
              className="mt-6 text-base md:text-lg leading-relaxed" 
              style={{ 
                color: colors.accent.lighter,
                textAlign: 'justify',
                hyphens: 'auto',
              }}
            >
              Als geautoriseerde gebruiker heb je toegang tot alle functionaliteit. 
              Van content beheer tot statistieken en team samenwerking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            <Card 
              hover
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="rounded-lg p-3 flex-shrink-0"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <FileText className="w-6 h-6" style={{ color: colors.accent.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold font-serif text-lg mb-2" style={{ color: colors.text.primary }}>
                    Content beheren
                  </h3>
                  <p 
                    className="text-sm leading-relaxed" 
                    style={{ 
                      color: colors.text.secondary,
                      textAlign: 'justify',
                      hyphens: 'auto',
                    }}
                  >
                    Maak en bewerk je content met volledige controle. Gebruik de intuïtieve editor 
                    om snel en efficiënt te werken.
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              hover
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="rounded-lg p-3 flex-shrink-0"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <BarChart3 className="w-6 h-6" style={{ color: colors.accent.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold font-serif text-lg mb-2" style={{ color: colors.text.primary }}>
                    Statistieken bekijken
                  </h3>
                  <p 
                    className="text-sm leading-relaxed" 
                    style={{ 
                      color: colors.text.secondary,
                      textAlign: 'justify',
                      hyphens: 'auto',
                    }}
                  >
                    Krijg inzicht in je data en prestaties met uitgebreide rapportages 
                    en real-time statistieken.
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              hover
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="rounded-lg p-3 flex-shrink-0"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <Users className="w-6 h-6" style={{ color: colors.accent.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold font-serif text-lg mb-2" style={{ color: colors.text.primary }}>
                    Team samenwerken
                  </h3>
                  <p 
                    className="text-sm leading-relaxed" 
                    style={{ 
                      color: colors.text.secondary,
                      textAlign: 'justify',
                      hyphens: 'auto',
                    }}
                  >
                    Werk samen met je team aan projecten. Deel documenten en communiceer 
                    efficiënt binnen het platform.
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              hover
              padding="lg"
              style={{
                transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="rounded-lg p-3 flex-shrink-0"
                  style={{ backgroundColor: colors.accent.lighter }}
                >
                  <Settings className="w-6 h-6" style={{ color: colors.accent.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold font-serif text-lg mb-2" style={{ color: colors.text.primary }}>
                    Instellingen beheren
                  </h3>
                  <p 
                    className="text-sm leading-relaxed" 
                    style={{ 
                      color: colors.text.secondary,
                      textAlign: 'justify',
                      hyphens: 'auto',
                    }}
                  >
                    Pas je account en voorkeuren aan. Configureer notificaties, privacy 
                    en andere persoonlijke instellingen.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Quick Actions */}
      <section style={{ backgroundColor: colors.background, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <Container size="lg">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai">
              <Button 
                variant="primary" 
                size="lg"
                style={{
                  transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                <Sparkles className="inline-block w-5 h-5 mr-2" /> AI Features
              </Button>
            </Link>
            <Link href="/admin">
              <Button 
                variant="secondary" 
                size="lg"
                style={{
                  transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                <Shield className="inline-block w-5 h-5 mr-2" /> Admin Panel
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
