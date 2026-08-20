import React from 'react';
import { Locale, PageRoute } from '../types';
import { messages, tf } from '../i18n/messages';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SiteSetting } from '../types';
import {
  FacebookIcon,
  TelegramIcon,
  XIcon,
  InstagramIcon,
  YoutubeIcon,
} from './icons/SocialIcons';

interface FooterProps {
  currentLocale: Locale;
  onRouteChange: (route: PageRoute) => void;
  settings: SiteSetting;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale, onRouteChange, settings }) => {
  const l = currentLocale;
  const t = messages[l];

  const socials = [
    { href: settings?.facebookUrl, icon: FacebookIcon },
    { href: settings?.telegramUrl, icon: TelegramIcon },
    { href: settings?.twitterUrl, icon: XIcon },
    { href: settings?.instagramUrl, icon: InstagramIcon },
    { href: settings?.youtubeUrl, icon: YoutubeIcon },
  ].filter((s) => s.href);

  const usefulLinks: { route: PageRoute; label: string }[] = [
    { route: 'news', label: t.nav.news },
    { route: 'gallery', label: t.nav.gallery },
    { route: 'about', label: t.nav.about },
    { route: 'events', label: t.nav.events },
    { route: 'sectors', label: t.nav.sectors },
    { route: 'faq', label: t.nav.faq },
  ];

  return (
    <footer className="cg-dark relative isolate overflow-hidden text-white/60">
      <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[110px]" />

      <div className="relative z-10 border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <span className="cg-gradient-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
              <MapPin size={20} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">{t.footer.headOffice}</p>
              <p className="mt-0.5 text-sm font-medium text-white">
                {settings ? tf(settings, 'address', l) : t.footer.headOfficeFallback}
              </p>
            </div>
          </div>
          {settings?.phone && (
            <div className="flex items-center gap-4">
              <span className="cg-gradient-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
                <Phone size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">{t.footer.callUs}</p>
                <p className="mt-0.5 text-sm font-medium text-white">{settings.phone}</p>
              </div>
            </div>
          )}
          {settings?.email && (
            <div className="flex items-center gap-4">
              <span className="cg-gradient-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
                <Mail size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">{t.footer.emailUs}</p>
                <p className="mt-0.5 text-sm font-medium text-white">{settings.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{t.siteNameShort}</p>
          <p className="mt-2 text-sm text-white/45">{t.siteName}</p>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/5 p-2 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-blue-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="font-semibold text-white">{t.footer.usefulLinks}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {usefulLinks.map((item) => (
              <li key={item.route}>
                <button
                  onClick={() => onRouteChange(item.route)}
                  className="transition-colors hover:text-blue-300 text-left cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">{t.footer.directorates}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <button
                onClick={() => onRouteChange('directorates')}
                className="transition-colors hover:text-blue-300 text-left cursor-pointer"
              >
                {t.nav.directorates}
              </button>
            </li>
            <li>
              <button
                onClick={() => onRouteChange('publications')}
                className="transition-colors hover:text-blue-300 text-left cursor-pointer"
              >
                {t.nav.publications}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">{t.contact.title}</p>
          <button
            onClick={() => onRouteChange('contact')}
            className="cg-gradient-btn mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
          >
            {t.hero.contact}
          </button>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-5 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} {t.siteNameShort} — {t.footer.rights}
      </div>
    </footer>
  );
};
