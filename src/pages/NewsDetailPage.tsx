import React from 'react';
import { Locale, PageRoute } from '../types';
import { tf } from '../i18n/messages';
import { store } from '../services/store';
import { getAssetUrl } from '../utils/assetHelper';
import { ArrowLeft, Calendar } from 'lucide-react';

interface NewsDetailPageProps {
  currentLocale: Locale;
  newsSlug: string;
  onRouteChange: (route: PageRoute) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  currentLocale,
  newsSlug,
  onRouteChange,
}) => {
  const l = currentLocale;
  const item = store.getNews().find((n) => n.slug === newsSlug);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-36 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Article not found</h1>
        <p className="mt-2 text-zinc-500">The requested news article does not exist or has been removed.</p>
        <button
          onClick={() => onRouteChange('news')}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to News
        </button>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-36">
      <button
        onClick={() => onRouteChange('news')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to all news
      </button>

      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Calendar size={14} />
        <span>
          {new Date(item.publishedAt).toLocaleDateString(
            l === 'am' ? 'am-ET' : l === 'af' ? 'aa-ET' : 'en-US',
            { dateStyle: 'full' }
          )}
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl leading-tight">
        {tf(item, 'title', l)}
      </h1>

      {item.coverImage && (
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl bg-zinc-100 sm:h-96 shadow-lg">
          <img
            src={getAssetUrl(item.coverImage)}
            alt={tf(item, 'title', l)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mt-8 whitespace-pre-line leading-relaxed text-zinc-800 text-base sm:text-lg">
        {tf(item, 'content', l)}
      </div>
    </article>
  );
};
