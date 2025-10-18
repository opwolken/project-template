import Link from 'next/link';
import { colors } from '@/lib/design-system';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="border-t"
      style={{ 
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: colors.accent.primary }}
            >
              <span className="font-bold text-sm" style={{ color: colors.text.inverse }}>
                P
              </span>
            </div>
            <span className="text-sm font-medium font-serif" style={{ color: colors.text.primary }}>
              Project Template
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-sm transition-colors"
              style={{ color: colors.text.secondary }}
            >
              Home
            </Link>
            <Link 
              href="/dashboard"
              className="text-sm transition-colors"
              style={{ color: colors.text.secondary }}
            >
              Dashboard
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm" style={{ color: colors.text.tertiary }}>
            © {currentYear} Project. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}

