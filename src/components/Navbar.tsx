'use client';

import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CATEGORIAS_NAV, TOPICOS_DESTAQUE } from '@/mock/data-news';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Notícias', href: '/' },
  { label: 'FAQ', href: '#' },
  { label: 'Contato', href: '#' },
];

export function Navbar() {
  const [aoVivo, ...categorias] = CATEGORIAS_NAV;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main bar */}
      <div className="bg-gray-950">
        <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3">
          {/* Logo */}
          <Link href="/" className="shrink-0 text-lg font-extrabold tracking-tight">
            <span className="text-white">PORTAL</span>{' '}
            <span className="text-red-500">NOTÍCIAS</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3 overflow-hidden">
            {/* Ao vivo */}
            <Link
              href="#"
              className="flex shrink-0 items-center gap-1 rounded-full border border-red-600 px-2.5 py-0.5 text-xs font-semibold text-red-500"
            >
              <FiberManualRecordIcon sx={{ fontSize: 8 }} className="animate-pulse text-red-500" />
              {aoVivo}
            </Link>

            {/* Category pills */}
            <div className="hidden items-center gap-2 overflow-hidden lg:flex">
              {categorias.map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  className="shrink-0 whitespace-nowrap text-xs text-gray-400 transition-colors hover:text-white"
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex shrink-0 items-center gap-2 pl-2">
              <button className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
                <SearchIcon sx={{ fontSize: 20 }} />
              </button>
              <button className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
                <PersonOutlineIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Topics bar */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl items-center gap-6 overflow-x-auto px-4 py-2.5 scrollbar-none">
          {TOPICOS_DESTAQUE.map((topico) => (
            <Link
              key={topico}
              href={`/?category=${topico}`}
              className="shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {topico}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
