import Link from 'next/link';
import { colors } from '@/lib/design-system';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="border-t"
      style={{ 
        backgroundColor: colors.accent.primary,
        borderColor: colors.accent.hover,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand + Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-6 h-6 flex items-center justify-center"
                style={{ 
                  backgroundColor: colors.text.inverse,
                  borderRadius: '2px'
                }}
              >
                <span className="font-bold text-sm" style={{ color: colors.accent.primary }}>
                  P
                </span>
              </div>
              <span className="text-sm font-medium font-serif" style={{ color: colors.text.inverse }}>
                Project Template
              </span>
            </div>
            <p 
              className="text-sm leading-relaxed max-w-xs" 
              style={{ 
                color: colors.accent.lighter,
                textAlign: 'justify',
                hyphens: 'auto'
              }}
            >
              Een moderne template voor snelle ontwikkeling van webapplicaties. 
              Gebouwd met Next.js, Firebase en Python voor maximale flexibiliteit.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold mb-4" style={{ color: colors.text.inverse }}>
              Navigatie
            </h4>
            <div className="flex flex-col gap-3">
              <Link 
                href="/"
                className="text-sm transition-colors"
                style={{ color: colors.accent.lighter }}
              >
                Home
              </Link>
              <Link 
                href="/dashboard"
                className="text-sm transition-colors"
                style={{ color: colors.accent.lighter }}
              >
                Dashboard
              </Link>
              <Link 
                href="/ai"
                className="text-sm transition-colors"
                style={{ color: colors.accent.lighter }}
              >
                AI Features
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="md:col-span-1">
            <p className="text-sm" style={{ color: colors.accent.lighter }}>
              © {currentYear} Project
            </p>
            <p className="text-xs mt-2" style={{ color: colors.accent.light }}>
              Alle rechten voorbehouden
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

