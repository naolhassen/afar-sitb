import React, { useState } from 'react';
import { Locale, PageRoute } from '../types';
import { messages, tf } from '../i18n/messages';
import { store } from '../services/store';
import PageHero from '../components/PageHero';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import { getAssetUrl } from '../utils/assetHelper';
import { Search } from 'lucide-react';

interface NewsPageProps {
  currentLocale: Locale;
  onRouteChange: (route: PageRoute) => void;
  onSelectNewsSlug: (slug: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  currentLocale,
  onRouteChange,
  onSelectNewsSlug,
}) => {
  const l = currentLocale;
  const t = messages[l];
  const allNews = store.getNews().filter((n) => n.published);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = allNews.filter((item) => {
    const text = (
      (item.titleEn || '') +
      (item.titleAm || '') +
      (item.titleAf || '') +
      (item.contentEn || '') +
      (item.contentAm || '')
    ).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <PageHero title={t.nav.news} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mb-12">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-center text-zinc-500">No news articles found.</p>
        ) : (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n) => (
              <StaggerItem key={n.id}>
                <div
                  onClick={() => {
                    onSelectNewsSlug(n.slug);
                    onRouteChange('news-detail');
                  }}
                  className="group block overflow-hidden rounded-xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg cursor-pointer bg-white"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-blue-100">
                    {n.coverImage && (
                      <img
                        src={getAssetUrl(n.coverImage)}
                        alt={tf(n, 'title', l)}
                        referrerPolicy="no-referrer"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-zinc-500">
                      {new Date(n.publishedAt).toLocaleDateString(l === 'am' ? 'am-ET' : l === 'af' ? 'aa-ET' : 'en-US')}
                    </p>
                    <h3 className="mt-1 font-semibold text-blue-900 group-hover:underline line-clamp-2">
                      {tf(n, 'title', l)}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{tf(n, 'excerpt', l)}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
};
