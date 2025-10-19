'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { usePermissions } from '@/lib/hooks';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

export default function ReceptenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const { canWriteRecipes, loading } = usePermissions();

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Recepten Navigation */}
      <nav className="bg-white border-b border-[#E4E4E7] sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <Link href="/recepten" className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <span className="font-serif text-xl font-semibold text-[#18181B]">
                Recepten
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* New Recipe Button (admin only) */}
              {!loading && canWriteRecipes && (
                <Link href="/recepten/nieuw">
                  <Button variant="primary" size="sm">
                    + Nieuw Recept
                  </Button>
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/" className="text-sm text-[#52525B] hover:text-[#18181B]">
                    Hoofdsite
                  </Link>
                  <button
                    onClick={signOut}
                    className="text-sm text-[#52525B] hover:text-[#18181B]"
                  >
                    Uitloggen
                  </button>
                </div>
              ) : (
                <Link href="/" className="text-sm text-[#52525B] hover:text-[#18181B]">
                  Inloggen
                </Link>
              )}
            </div>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E4E4E7] mt-16">
        <Container>
          <div className="py-8 text-center text-sm text-[#52525B]">
            <p>© 2025 Recepten. Met ❤️ gemaakt.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
