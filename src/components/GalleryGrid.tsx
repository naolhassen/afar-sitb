import React, { useMemo, useState } from 'react';
import { X, Play, Image as ImageIcon } from 'lucide-react';
import { StaggerGroup, StaggerItem } from './StaggerGroup';
import { GalleryItem } from '../types';
import { tf } from '../i18n/messages';
import { Locale } from '../types';

export default function GalleryGrid({
  items,
  labels,
  currentLocale = 'en',
}: {
  items: GalleryItem[];
  labels: { all: string; photos: string; videos: string; noResults: string };
  currentLocale?: Locale;
}) {
  const [filter, setFilter] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (filter === 'ALL' ? items : items.filter((i) => (i.type || 'IMAGE') === filter)),
    [items, filter]
  );

  const tabs: { key: 'ALL' | 'IMAGE' | 'VIDEO'; label: string }[] = [
    { key: 'ALL', label: labels.all },
    { key: 'IMAGE', label: labels.photos },
    { key: 'VIDEO', label: labels.videos },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === tab.key
                ? 'cg-gradient-btn text-white shadow-lg shadow-blue-900/30'
                : 'border border-zinc-200 text-zinc-600 hover:border-blue-300 hover:text-blue-600 bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-500">{labels.noResults}</p>
      ) : (
        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => {
            const isVideo = item.type === 'VIDEO';
            const itemTitle = tf(item, 'title', currentLocale) || item.titleEn || '';

            return (
              <StaggerItem
                key={item.id}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-zinc-100 shadow-xs border border-zinc-200/60"
                onClick={() => setActive(item)}
              >
                {isVideo ? (
                  <video
                    src={item.imageUrl}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={itemTitle}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                    {isVideo ? (
                      <Play className="text-blue-700 ml-0.5" size={18} />
                    ) : (
                      <ImageIcon className="text-blue-700" size={18} />
                    )}
                  </div>
                </div>

                {itemTitle && (
                  <p className="pointer-events-none absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {itemTitle}
                  </p>
                )}
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs animate-fade-in-up"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div
            className="relative max-h-[85vh] w-full max-w-4xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === 'VIDEO' ? (
              <video
                src={active.imageUrl}
                controls
                autoPlay
                className="max-h-[80vh] w-full rounded-2xl shadow-2xl"
              />
            ) : (
              <img
                src={active.imageUrl}
                alt={tf(active, 'title', currentLocale) || ''}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
            )}
            {(tf(active, 'title', currentLocale) || active.titleEn) && (
              <p className="mt-4 text-center text-sm font-medium text-white/90">
                {tf(active, 'title', currentLocale) || active.titleEn}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
