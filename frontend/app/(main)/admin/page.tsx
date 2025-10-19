'use client';

import { useProtectedRoute } from '@/lib/hooks/useProtectedRoute';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/ToastContext';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { colors } from '@/lib/design-system';
import { Shield, UserPlus, Users, Check, Trash2, Info, ArrowLeft, Home } from 'lucide-react';

interface AuthorizedUser {
  email: string;
  approved: boolean;
  addedAt?: string;
}

export default function Admin() {
  const { isReady, loading, user } = useProtectedRoute();
  const { warning } = useToast();
  const { execute: executeAdd, loading: addLoading } = useAsyncAction();
  const { execute: executeRemove, loading: removeLoading } = useAsyncAction();
  const [users, setUsers] = useState<AuthorizedUser[]>([]);
  const [newEmail, setNewEmail] = useState('');

  const actionLoading = addLoading || removeLoading;

  useEffect(() => {
    if (isReady) {
      loadUsers();
    }
  }, [isReady]);

  const loadUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'authorized_users'));
      const usersList: AuthorizedUser[] = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ email: doc.id, ...doc.data() } as AuthorizedUser);
      });
      setUsers(usersList.sort((a, b) => a.email.localeCompare(b.email)));
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@')) {
      warning('Ongeldig e-mailadres', 'Voer een geldig e-mailadres in');
      return;
    }

    await executeAdd(
      async () => {
        await setDoc(doc(db, 'authorized_users', newEmail.toLowerCase()), {
          approved: true,
          addedAt: new Date().toISOString(),
        });
        setNewEmail('');
        await loadUsers();
      },
      {
        successMessage: 'Gebruiker toegevoegd',
        successDescription: `${newEmail} heeft nu toegang`,
        errorMessage: 'Fout bij toevoegen',
        errorDescription: 'Kon gebruiker niet toevoegen',
      }
    );
  };

  const removeUser = async (email: string) => {
    if (!confirm(`Weet je zeker dat je ${email} wilt verwijderen?`)) {
      return;
    }

    await executeRemove(
      async () => {
        await deleteDoc(doc(db, 'authorized_users', email));
        await loadUsers();
      },
      {
        successMessage: 'Gebruiker verwijderd',
        successDescription: `${email} heeft geen toegang meer`,
        errorMessage: 'Fout bij verwijderen',
        errorDescription: 'Kon gebruiker niet verwijderen',
      }
    );
  };

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
              <Shield className="inline-block w-4 h-4 mr-2" />
              Administrator rechten
            </Badge>
            
            <h1 
              className="mt-6 font-bold tracking-tight font-serif leading-tight" 
              style={{ 
                color: colors.text.inverse,
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              }}
            >
              Admin Panel
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
              Beheer wie toegang heeft tot beveiligde pagina&apos;s. Voeg gebruikers toe of 
              verwijder ze uit het systeem.
            </p>
          </div>
        </Container>
      </section>

      {/* Add User Section */}
      <section style={{ backgroundColor: colors.background, paddingTop: '6rem', paddingBottom: '3rem' }}>
        <Container size="md">
          <Card 
            padding="lg" 
            style={{ 
              backgroundColor: colors.accent.lighter,
              borderColor: colors.accent.light,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <UserPlus className="w-6 h-6" style={{ color: colors.accent.primary }} />
              <h2 className="text-xl font-semibold font-serif" style={{ color: colors.text.primary }}>
                Nieuwe gebruiker toevoegen
              </h2>
            </div>
            
            <form onSubmit={addUser} className="space-y-4">
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="email@voorbeeld.nl"
                disabled={actionLoading}
                helpText="Voeg je eigen e-mailadres toe om toegang te krijgen tot beveiligde pagina's"
              />
              <Button
                type="submit"
                disabled={actionLoading}
                variant="primary"
                fullWidth
                style={{
                  transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                {actionLoading ? 'Bezig...' : 'Gebruiker toevoegen'}
              </Button>
            </form>
          </Card>
        </Container>
      </section>

      {/* Users List Section - Dark Background */}
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop)',
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
          <Card 
            padding="lg" 
            className="relative z-10"
            style={{
              transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" style={{ color: colors.accent.primary }} />
                <h2 className="text-2xl font-bold font-serif" style={{ color: colors.text.primary }}>
                  Geautoriseerde gebruikers
                </h2>
              </div>
              <Badge variant="default" size="md">
                {users.length} {users.length === 1 ? 'gebruiker' : 'gebruikers'}
              </Badge>
            </div>

            {users.length === 0 ? (
              <div 
                className="text-center py-12 rounded-xl" 
                style={{ backgroundColor: colors.accent.lighter }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: colors.accent.light }}
                >
                  <Users className="w-8 h-8" style={{ color: colors.accent.primary }} />
                </div>
                <p className="font-medium mb-2 font-serif" style={{ color: colors.text.primary }}>
                  Nog geen geautoriseerde gebruikers
                </p>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  Voeg je eigen e-mailadres toe om te beginnen
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((authorizedUser) => (
                  <div
                    key={authorizedUser.email}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ 
                      backgroundColor: colors.accent.lighter,
                      transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="rounded-lg p-2"
                        style={{ backgroundColor: colors.accent.light }}
                      >
                        <Check className="w-5 h-5" style={{ color: colors.accent.primary }} />
                      </div>
                      <div>
                        <p className="font-medium font-serif" style={{ color: colors.text.primary }}>
                          {authorizedUser.email}
                        </p>
                        {authorizedUser.email === user.email && (
                          <Badge variant="info" size="sm">
                            <Info className="inline-block w-3 h-3 mr-1" /> Dit ben jij
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => removeUser(authorizedUser.email)}
                      disabled={actionLoading}
                      variant="danger"
                      size="sm"
                      style={{
                        transition: 'all 600ms cubic-bezier(0.65, 0, 0.35, 1)',
                      }}
                    >
                      <Trash2 className="inline-block w-4 h-4 mr-1" /> Verwijderen
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Container>
      </section>

      {/* Quick Actions */}
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
