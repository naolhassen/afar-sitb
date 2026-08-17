import React from 'react';
import { getAssetUrl } from '../utils/assetHelper';
import { PageRoute } from '../types';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: { label: string; route?: PageRoute }[];
  onRouteChange?: (route: PageRoute) => void;
}

export default function PageHero({
  title,
  subtitle,
  badge,
  breadcrumbs,
  onRouteChange,
}: PageHeroProps) {
  return (
    <section className="cg-dark relative isolate overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('${getAssetUrl('/images/hero-bg.jpg')}')` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#050a18]/95 via-[#0a1330]/85 to-[#1a0f38]/90" />
      <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-float rounded-full bg-blue-500/25 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 animate-float-slow rounded-full bg-purple-500/25 blur-[90px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-40">
        {badge && (
          <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
            {badge}
          </span>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{subtitle}</p>}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
            <button
              onClick={() => onRouteChange && onRouteChange('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                <span>/</span>
                {b.route && onRouteChange ? (
                  <button
                    onClick={() => onRouteChange(b.route!)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {b.label}
                  </button>
                ) : (
                  <span className="text-white/80">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { PageHero };
