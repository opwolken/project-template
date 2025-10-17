'use client';

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useToast } from '../lib/ToastContext';
import Link from 'next/link';
import Container from '../components/layout/Container';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const { user, isAuthorized } = useAuth();
  const { success, error, warning, info } = useToast();

  const handleHello = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`/api/hello?name=${encodeURIComponent(name || 'World')}`);
      const data = await response.json();
      setMessage(data.message || JSON.stringify(data));
      success('API Call Success', 'Hello endpoint bereikt!');
    } catch (err) {
      const errorMsg = `Error: ${err}`;
      setMessage(errorMsg);
      error('API Error', 'Er is iets misgegaan bij het aanroepen van de API');
    } finally {
      setLoading(false);
    }
  };

  const handleHealth = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setMessage(`Status: ${data.status} - ${data.message}`);
      info('Health Check', `Status: ${data.status}`);
    } catch (err) {
      const errorMsg = `Error: ${err}`;
      setMessage(errorMsg);
      error('Health Check Failed', 'Kon de server status niet ophalen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container size="lg">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="info" size="md">
              🚀 Next.js + Firebase + Python
            </Badge>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold text-neutral-900 tracking-tight">
              Modern platform voor jouw projecten
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              Een volledig uitgeruste template met authenticatie, API integratie en een modern design systeem.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {user && isAuthorized ? (
                <Link href="/dashboard">
                  <Button size="lg" variant="primary">
                    Ga naar Dashboard →
                  </Button>
                </Link>
              ) : (
                <Button size="lg" variant="primary" disabled>
                  Log in om te starten
                </Button>
              )}
              <Button size="lg" variant="outline" onClick={handleHealth}>
                Bekijk Status
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* API Demo Section */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Test de API
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Probeer de backend API met een eenvoudige demo
            </p>
          </div>

          <Card padding="lg" className="max-w-2xl mx-auto">
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
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="text-sm font-medium text-neutral-600 mb-2">
                    API Response:
                  </p>
                  <p className="text-neutral-900 font-mono text-sm break-all">
                    {message}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </Container>
      </section>

      {/* Toast Demo Section */}
      <section className="py-20 bg-neutral-50">
        <Container size="md">
          <div className="text-center mb-12">
            <Badge variant="info" size="md">
              Nieuw Feature
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-4">
              Toast Notificaties
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Geef gebruikers direct feedback met elegante toast notificaties
            </p>
          </div>

          <Card padding="lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Test de notificaties
            </h3>
            <p className="text-neutral-600 mb-6">
              Klik op de buttons om verschillende soorten toast notificaties te zien
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => success('Succes!', 'De actie is succesvol uitgevoerd')}
              >
                ✓ Success
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => error('Error!', 'Er is iets misgegaan')}
              >
                ✕ Error
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => warning('Let op!', 'Dit is een waarschuwing')}
              >
                ⚠ Warning
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => info('Info', 'Dit is een informatief bericht')}
              >
                ℹ Info
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container size="lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Wat zit er in deze template?
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Alles wat je nodig hebt om snel te starten
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card hover padding="lg">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Firebase Auth
              </h3>
              <p className="text-neutral-600">
                Volledige authenticatie met Google login en geautoriseerde gebruikers beheer.
              </p>
            </Card>

            <Card hover padding="lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Python Backend
              </h3>
              <p className="text-neutral-600">
                Krachtige API gebouwd met Python en Firebase Functions voor serverless computing.
              </p>
            </Card>

            <Card hover padding="lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Modern Design
              </h3>
              <p className="text-neutral-600">
                OpenAI-geïnspireerd design systeem met herbruikbare componenten en Tailwind CSS.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Auth Status */}
      {user && (
        <section className="py-12 bg-neutral-50">
          <Container size="md">
            <Card padding="lg">
              <div className="text-center">
                <div className="text-3xl mb-3">👋</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Welkom, {user.displayName || user.email}
                </h3>
                {isAuthorized ? (
                  <div className="space-y-4">
                    <Badge variant="success" size="md">
                      ✓ Geautoriseerd
                    </Badge>
                    <p className="text-neutral-600">
                      Je hebt toegang tot alle beveiligde pagina&apos;s
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
                    <p className="text-neutral-600">
                      Je bent ingelogd maar nog niet geautoriseerd. Neem contact op met de beheerder.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </Container>
        </section>
      )}
    </div>
  );
}
