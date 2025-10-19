'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginButton from '../LoginButton';
import { useAuth } from '../../lib/AuthContext';
import { colors } from '@/lib/design-system';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard', protected: true },
  { name: 'AI Features', href: '/ai', protected: true },
  { name: 'Admin', href: '/admin', protected: true },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthorized } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down and past 100px
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className="fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-transform duration-300"
      style={{ 
        backgroundColor: `${colors.background}F5`,
        borderColor: colors.border,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div 
                className="w-8 h-8 flex items-center justify-center transition-all duration-500"
                style={{ 
                  backgroundColor: colors.accent.primary,
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
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
                  className="px-4 py-2 text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? colors.accent.light : 'transparent',
                    color: isActive ? colors.accent.primary : colors.text.secondary,
                    borderRadius: '2px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = colors.surfaceHover;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
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
