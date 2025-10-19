'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginButton from '../LoginButton';
import { useAuth } from '../../lib/AuthContext';
import { colors, shadows } from '@/lib/design-system';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard', protected: true },
  { name: 'AI Features', href: '/ai', protected: true },
  { name: 'Admin', href: '/admin', protected: true },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthorized } = useAuth();

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{ 
        backgroundColor: `${colors.background}F0`, // F0 = 94% opacity
        borderColor: colors.border,
        boxShadow: shadows.card,
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform"
                style={{ 
                  backgroundColor: colors.accent.primary,
                  boxShadow: shadows.card,
                }}
              >
                <span className="font-bold text-lg" style={{ color: colors.text.inverse }}>
                  P
                </span>
              </div>
              <span 
                className="text-xl font-semibold tracking-tight font-serif"
                style={{ color: colors.text.primary }}
              >
                Project
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const canAccess = !item.protected || (user && isAuthorized);
              
              if (item.protected && !canAccess) return null;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? colors.surfaceHover : 'transparent',
                    color: isActive ? colors.text.primary : colors.text.secondary,
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            <LoginButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
