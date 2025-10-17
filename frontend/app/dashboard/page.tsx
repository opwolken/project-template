'use client';

import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function Dashboard() {
  const { user, isAuthorized, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted) {
      if (!user) {
        router.push('/');
      } else if (!isAuthorized) {
        router.push('/unauthorized');
      }
    }
  }, [user, isAuthorized, loading, router, mounted]);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return null;
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Container size="lg" className="py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-900">Dashboard</h1>
              <p className="text-neutral-600">Welkom terug, {user.displayName || user.email}</p>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        <Card padding="md" className="mb-8 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 rounded-lg p-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-green-900 mb-1">✓ Je bent geautoriseerd!</p>
              <p className="text-sm text-green-700">
                Je hebt toegang tot alle beveiligde pagina&apos;s. Je e-mailadres is goedgekeurd door de beheerder.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card padding="lg" hover>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="info">Account</Badge>
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mb-1">Email</p>
            <p className="text-lg font-semibold text-neutral-900 truncate">{user.email}</p>
          </Card>

          <Card padding="lg" hover>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="success">Status</Badge>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mb-1">Toegang</p>
            <p className="text-lg font-semibold text-neutral-900">Geautoriseerd</p>
          </Card>

          <Card padding="lg" hover>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="default">Rol</Badge>
              <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mb-1">Rechten</p>
            <p className="text-lg font-semibold text-neutral-900">Volledige toegang</p>
          </Card>
        </div>

        {/* Features Section */}
        <Card padding="lg" className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Beschikbare functies</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Content beheren</h3>
                  <p className="text-sm text-neutral-600">Maak en bewerk je content met volledige controle</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Statistieken bekijken</h3>
                  <p className="text-sm text-neutral-600">Krijg inzicht in je data en prestaties</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Team samenwerken</h3>
                  <p className="text-sm text-neutral-600">Werk samen met je team aan projecten</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Instellingen beheren</h3>
                  <p className="text-sm text-neutral-600">Pas je account en voorkeuren aan</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/admin">
            <Button variant="primary" size="lg">
              Admin Panel →
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              ← Terug naar Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
