import Link from 'next/link';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Admin', href: '/admin' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentatie', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Support', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'Over ons', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-lg font-semibold text-neutral-900">
                Project
              </span>
            </div>
            <p className="text-sm text-neutral-600 max-w-xs">
              Een modern platform gebouwd met Next.js en Firebase.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-neutral-900 mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Project Template. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
