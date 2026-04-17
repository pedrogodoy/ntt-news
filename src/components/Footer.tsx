import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Notícias', href: '/' },
  { label: 'FAQ', href: '#' },
  { label: 'Contato', href: '#' },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-950 py-6">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-xs text-gray-500">
          © 2026 Portal de Notícias. Todos os direitos reservados.
        </p>
        <nav className="flex items-center gap-5">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
