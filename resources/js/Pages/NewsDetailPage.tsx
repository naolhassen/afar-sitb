import React, { useState } from 'react';
import { Locale, PageRoute, News } from '../types';
import { tf } from '../i18n/messages';
import { getAssetUrl } from '../utils/assetHelper';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsDetailPageProps {
  currentLocale: Locale;
  onRouteChange: (route: PageRoute) => void;
  article: News;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  currentLocale,
  onRouteChange,
  article,
}) => {
  const l = currentLocale;
  const item = article;

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

  const isVideo = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
  const gallery = Array.isArray(item.gallery) ? item.gallery : [];
  const allMedia = gallery.length > 0
    ? gallery
    : [item.image_url].filter(Boolean) as string[];
  const [slide, setSlide] = useState(0);
  const hasMultiple = allMedia.length > 1;

  return (
    <article className="mx-auto max-w-4xl px-4 pb-20 pt-32">
      {allMedia.length > 0 && (
        <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-lg h-72 sm:h-96 lg:h-[28rem]">
          {isVideo(allMedia[slide]) ? (
            <video
              key={allMedia[slide]}
              controls
              className="w-full h-full object-cover"
              poster={getAssetUrl(item.image_url || allMedia[slide])}
            >
              <source src={getAssetUrl(allMedia[slide])} type="video/mp4" />
            </video>
          ) : (
            <img
              key={allMedia[slide]}
              src={getAssetUrl(allMedia[slide])}
              alt={tf(item, 'title', l)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          )}

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => setSlide((s) => (s === 0 ? allMedia.length - 1 : s - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-zinc-800 shadow hover:bg-white transition"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setSlide((s) => (s === allMedia.length - 1 ? 0 : s + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-zinc-800 shadow hover:bg-white transition"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allMedia.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    className={`h-2 w-2 rounded-full transition ${i === slide ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
        <button
          onClick={() => onRouteChange('news')}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:underline cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to all news
        </button>
        <span className="text-zinc-300">|</span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={14} />
          {new Date(item.publishedAt).toLocaleDateString(
            l === 'am' ? 'am-ET' : l === 'af' ? 'aa-ET' : 'en-US',
            { dateStyle: 'full' }
          )}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl leading-tight">
        {tf(item, 'title', l)}
      </h1>

      <div className="mt-8 whitespace-pre-line leading-relaxed text-zinc-700 text-base sm:text-lg">
        {tf(item, 'content', l)}
      </div>
    </article>
  );
};
