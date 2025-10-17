'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginButton from '../LoginButton';
import { useAuth } from '../../lib/AuthContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard', protected: true },
  { name: 'Admin', href: '/admin', protected: true },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthorized } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-semibold text-neutral-900 tracking-tight">
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
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }
                  `}
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
