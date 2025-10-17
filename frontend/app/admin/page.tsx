'use client';

import { useAuth } from '../../lib/AuthContext';
import { useToast } from '../../lib/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

interface AuthorizedUser {
  email: string;
  approved: boolean;
  addedAt?: string;
}

export default function Admin() {
  const { user, isAuthorized, loading } = useAuth();
  const { success, error, warning } = useToast();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<AuthorizedUser[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted) {
      if (!user || !isAuthorized) {
        router.push('/');
      } else {
        loadUsers();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthorized, loading, router, mounted]);

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
      error('Fout bij laden', 'Kon gebruikers niet ophalen');
    }
  };

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@')) {
      warning('Ongeldig e-mailadres', 'Voer een geldig e-mailadres in');
      return;
    }

    setActionLoading(true);
    try {
      await setDoc(doc(db, 'authorized_users', newEmail.toLowerCase()), {
        approved: true,
        addedAt: new Date().toISOString(),
      });
      setNewEmail('');
      await loadUsers();
      success('Gebruiker toegevoegd', `${newEmail} heeft nu toegang`);
    } catch (err) {
      console.error('Error adding user:', err);
      error('Fout bij toevoegen', 'Kon gebruiker niet toevoegen');
    } finally {
      setActionLoading(false);
    }
  };

  const removeUser = async (email: string) => {
    if (!confirm(`Weet je zeker dat je ${email} wilt verwijderen?`)) {
      return;
    }

    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'authorized_users', email));
      await loadUsers();
      success('Gebruiker verwijderd', `${email} heeft geen toegang meer`);
    } catch (err) {
      console.error('Error removing user:', err);
      error('Fout bij verwijderen', 'Kon gebruiker niet verwijderen');
    } finally {
      setActionLoading(false);
    }
  };

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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-900">Admin Panel</h1>
              <p className="text-neutral-600">Beheer wie toegang heeft tot beveiligde pagina&apos;s</p>
            </div>
          </div>
        </div>

        {/* Add User Section */}
        <Card padding="lg" className="mb-8 bg-primary-50 border-primary-200">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Nieuwe gebruiker toevoegen
          </h2>
          <form onSubmit={addUser} className="space-y-4">
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="email@voorbeeld.nl"
              disabled={actionLoading}
              helpText="💡 Voeg je eigen e-mailadres toe om toegang te krijgen tot beveiligde pagina's"
            />
            <Button
              type="submit"
              disabled={actionLoading}
              variant="primary"
              fullWidth
            >
              {actionLoading ? 'Bezig...' : 'Gebruiker toevoegen'}
            </Button>
          </form>
        </Card>

        {/* Users List */}
        <Card padding="lg" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">
              Geautoriseerde gebruikers
            </h2>
            <Badge variant="default" size="md">
              {users.length} {users.length === 1 ? 'gebruiker' : 'gebruikers'}
            </Badge>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-xl">
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-neutral-700 font-medium mb-2">Nog geen geautoriseerde gebruikers</p>
              <p className="text-sm text-neutral-500">Voeg je eigen e-mailadres toe om te beginnen</p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((authorizedUser) => (
                <div
                  key={authorizedUser.email}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{authorizedUser.email}</p>
                      {authorizedUser.email === user.email && (
                        <Badge variant="info" size="sm">Dit ben jij</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => removeUser(authorizedUser.email)}
                    disabled={actionLoading}
                    variant="danger"
                    size="sm"
                  >
                    Verwijderen
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

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
