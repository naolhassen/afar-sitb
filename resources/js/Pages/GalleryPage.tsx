import React from 'react';
import { Locale } from '../types';
import { messages } from '../i18n/messages';
import PageHero from '../Components/PageHero';
import GalleryGrid from '../Components/GalleryGrid';
import { GalleryItem } from '../types';

interface GalleryPageProps {
  currentLocale: Locale;
  items: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ currentLocale, items }) => {
  const l = currentLocale;
  const t = messages[l];

  return (
    <div>
      <PageHero title={t.nav.gallery} />
      <section className="relative overflow-hidden bg-white px-4 py-16">
        <div className="cg-dot-pattern pointer-events-none absolute right-0 top-10 h-40 w-56 opacity-40" />
        <div className="relative mx-auto max-w-6xl">
          <GalleryGrid
            items={items}
            labels={{
              all: t.gallery.all,
              photos: t.gallery.photos,
              videos: t.gallery.videos,
              noResults: 'No media items found.',
            }}
            currentLocale={l}
          />
        </div>
      </section>
    </div>
  );
};
