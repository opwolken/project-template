'use client';

import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function Unauthorized() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted && !user) {
      router.push('/');
    }
  }, [user, loading, router, mounted]);

  if (loading || !mounted || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-neutral-50 px-4">
      <Container size="sm">
        <Card padding="lg" className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Header */}
          <Badge variant="warning" size="md" className="mb-4">
            Geen Toegang
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Niet Geautoriseerd
          </h1>
          <p className="text-neutral-600 mb-8">
            Je bent ingelogd als <span className="font-semibold text-neutral-900">{user.email}</span>, maar je account heeft nog geen toegang tot beveiligde pagina&apos;s.
          </p>

          {/* Info Box */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-primary-900 mb-2">
                  Hoe krijg ik toegang?
                </p>
                <p className="text-sm text-primary-800">
                  Neem contact op met de beheerder van deze applicatie om je e-mailadres toe te voegen aan de lijst met geautoriseerde gebruikers.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link href="/">
              <Button variant="primary" fullWidth size="lg">
                Terug naar Home
              </Button>
            </Link>
          </div>

          {/* User Info */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-center gap-3">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full border-2 border-neutral-200"
                />
              )}
              <div className="text-left">
                <p className="text-sm text-neutral-500">Ingelogd als:</p>
                <p className="text-sm font-semibold text-neutral-900">
                  {user.displayName || user.email}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
