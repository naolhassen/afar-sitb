import React from 'react';
import { router } from '@inertiajs/react';
import { Locale } from '../types';
import { messages, tf } from '../i18n/messages';
import { getAssetUrl } from '../utils/assetHelper';
import PageHero from '../Components/PageHero';
import { Publication } from '../types';
import { StaggerGroup, StaggerItem } from '../Components/StaggerGroup';
import { FileText, Download } from 'lucide-react';

interface PublicationsPageProps {
  currentLocale: Locale;
  publications: { data: Publication[] } | Publication[];
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ currentLocale, publications }) => {
  const l = currentLocale;
  const t = messages[l];
  const allPublications = Array.isArray(publications) ? publications : publications.data;

  return (
    <div>
      <PageHero title={t.nav.publications} />
      <section className="mx-auto max-w-5xl px-4 py-14">
        {allPublications.length === 0 ? (
          <p className="text-sm text-zinc-500">No publications available at this moment.</p>
        ) : (
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {allPublications.map((p) => (
              <StaggerItem key={p.id}>
                <div
                  onClick={() => router.get(`/${currentLocale}/publications/${p.id}`)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md bg-white group cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="text-blue-700 shrink-0 group-hover:scale-110 transition-transform" size={22} />
                    <span>
                      <span className="block text-sm font-semibold text-zinc-800 group-hover:text-blue-700">
                        {tf(p, 'title', l)}
                      </span>
                      {p.descriptionAf && (
                        <span className="block text-xs text-zinc-500 mt-0.5">
                          {tf(p, 'description', l)}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="p-2 rounded-lg bg-zinc-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Download size={16} />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
};
