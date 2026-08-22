import React from 'react';
import { Locale, PageRoute, Publication } from '../types';
import { messages, tf } from '../i18n/messages';
import { getAssetUrl } from '../utils/assetHelper';
import { ArrowLeft, Calendar, Download, FileText } from 'lucide-react';

interface PublicationDetailPageProps {
  currentLocale: Locale;
  onRouteChange: (route: PageRoute) => void;
  publication: Publication;
}

export const PublicationDetailPage: React.FC<PublicationDetailPageProps> = ({
  currentLocale,
  onRouteChange,
  publication,
}) => {
  const l = currentLocale;
  const t = messages[l];
  const p = publication;

  if (!p) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-36 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Publication not found</h1>
        <p className="mt-2 text-zinc-500">The requested publication is not available.</p>
        <button
          onClick={() => onRouteChange('publications')}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Publications
        </button>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-36">
      <button
        onClick={() => onRouteChange('publications')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to all publications
      </button>

      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar size={15} className="text-blue-600" />
          <span>
            {new Date(p.published_at || p.publishedAt).toLocaleDateString(
              l === 'am' ? 'am-ET' : l === 'af' ? 'aa-ET' : 'en-US',
              { dateStyle: 'full' }
            )}
          </span>
        </div>
        {p.file_type && (
          <div className="flex items-center gap-1.5">
            <FileText size={15} className="text-blue-600" />
            <span>{p.file_type}</span>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl leading-tight">
        {tf(p, 'title', l)}
      </h1>

      {p.descriptionAf && (
        <div className="mt-6 whitespace-pre-line leading-relaxed text-zinc-700 text-base sm:text-lg">
          {tf(p, 'description', l)}
        </div>
      )}

      <a
        href={getAssetUrl(p.file_url || p.fileUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
      >
        <Download size={16} /> {t.news?.download || 'Download'}
      </a>
    </article>
  );
};
