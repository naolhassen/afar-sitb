import React, { useEffect, useState } from 'react';
import { Locale, PageRoute } from '../types';
import { messages } from '../i18n/messages';
import { getAssetUrl } from '../utils/assetHelper';
import { Menu, X, Phone, Mail, LogIn, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocale,
  onLocaleChange,
  currentRoute,
  onRouteChange,
}) => {
  const t = messages[currentLocale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = currentRoute === 'home';
  const solid = scrolled || open || !isHome;

  const links: { route: PageRoute; label: string }[] = [
    { route: 'home', label: t.nav.home },
    { route: 'about', label: t.nav.about },
    { route: 'sectors', label: t.nav.sectors },
    { route: 'directorates', label: t.nav.directorates },
    { route: 'news', label: t.nav.news },
    { route: 'events', label: t.nav.events },
    { route: 'publications', label: t.nav.publications },
    { route: 'gallery', label: t.nav.gallery },
    { route: 'contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        solid
          ? 'border-b border-zinc-100 bg-white/95 shadow-xs backdrop-blur-md'
          : 'border-b border-white/10 bg-transparent'
      }`}
    >
      {/* Top Bar */}
      <div
        className={`hidden border-b sm:block ${
          solid
            ? 'border-zinc-100 bg-zinc-50 text-zinc-500'
            : 'border-white/10 bg-white/5 text-white/70 backdrop-blur-xs'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={12} /> +251-XX-XXX-XXXX
            </span>
            <span className="flex items-center gap-1">
              <Mail size={12} /> itdb@afar.gov.et
            </span>
          </div>

          {/* Locale switcher */}
          <div className="flex items-center gap-1 text-xs">
            {(['af', 'en', 'am'] as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => onLocaleChange(loc)}
                className={`px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  currentLocale === loc
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : solid
                    ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {loc === 'af' ? 'Qafár' : loc === 'en' ? 'EN' : 'አማ'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button
            onClick={() => onRouteChange('home')}
            className="flex items-center gap-3 text-left cursor-pointer"
          >
            <div
              className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ${
                solid ? 'ring-zinc-100' : 'ring-white/20'
              }`}
            >
              <img
                src={getAssetUrl('/logo.jpg')}
                alt={t.siteNameShort}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = getAssetUrl('/logo.png');
                }}
              />
            </div>
            <div className="leading-tight">
              <p className={`text-sm font-bold ${solid ? 'text-zinc-900' : 'text-white'}`}>
                {t.siteNameShort}
              </p>
              <p
                className={`hidden text-[11px] sm:block ${
                  solid ? 'text-zinc-400' : 'text-white/50'
                }`}
              >
                {t.siteName}
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((l) => {
              const active = currentRoute === l.route;
              return (
                <button
                  key={l.route}
                  onClick={() => onRouteChange(l.route)}
                  className={`group relative text-sm font-medium transition-colors cursor-pointer ${
                    solid
                      ? active
                        ? 'text-blue-700 font-semibold'
                        : 'text-zinc-600 hover:text-blue-700'
                      : active
                      ? 'text-white font-semibold'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {l.label}
                  <span
                    className={`cg-gradient-btn absolute -bottom-1.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onRouteChange('admin')}
              className="cg-gradient-btn hidden items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 lg:inline-flex cursor-pointer"
            >
              {t.nav.adminLogin} <LogIn size={15} />
            </button>

            {/* Mobile Locale Switcher */}
            <div className="sm:hidden flex items-center gap-1 text-xs">
              {(['af', 'en', 'am'] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => onLocaleChange(loc)}
                  className={`px-2 py-0.5 rounded-full uppercase text-[10px] font-bold ${
                    currentLocale === loc
                      ? 'bg-blue-600 text-white'
                      : solid
                      ? 'text-zinc-600'
                      : 'text-white/70'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <button
              className={`rounded-md p-2 lg:hidden cursor-pointer ${solid ? 'text-zinc-700' : 'text-white'}`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <nav className="flex flex-col gap-1 border-t border-zinc-100 bg-white px-4 py-3 lg:hidden shadow-xl animate-fade-in-up">
            {links.map((l) => (
              <button
                key={l.route}
                onClick={() => {
                  onRouteChange(l.route);
                  setOpen(false);
                }}
                className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${
                  currentRoute === l.route
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-blue-700'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                onRouteChange('admin');
                setOpen(false);
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white cursor-pointer"
            >
              {t.nav.adminLogin} <LogIn size={15} />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
