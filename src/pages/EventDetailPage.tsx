import React from 'react';
import { Locale, PageRoute } from '../types';
import { tf } from '../i18n/messages';
import { store } from '../services/store';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

interface EventDetailPageProps {
  currentLocale: Locale;
  eventSlug: string;
  onRouteChange: (route: PageRoute) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  currentLocale,
  eventSlug,
  onRouteChange,
}) => {
  const l = currentLocale;
  const event = store.getEvents().find((e) => e.id === eventSlug || e.slug === eventSlug);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-36 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Event not found</h1>
        <p className="mt-2 text-zinc-500">The requested event schedule is not available.</p>
        <button
          onClick={() => onRouteChange('events')}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Events
        </button>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-36">
      <button
        onClick={() => onRouteChange('events')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to all events
      </button>

      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar size={15} className="text-blue-600" />
          <span>
            {new Date(event.startDate).toLocaleDateString(
              l === 'am' ? 'am-ET' : l === 'af' ? 'aa-ET' : 'en-US',
              { dateStyle: 'full' }
            )}
          </span>
        </div>
        {event.location && (
          <div className="flex items-center gap-1.5">
            <MapPin size={15} className="text-red-500" />
            <span>{event.location}</span>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl leading-tight">
        {tf(event, 'title', l)}
      </h1>

      <div className="mt-8 rounded-2xl bg-zinc-50 p-6 sm:p-8 border border-zinc-100 whitespace-pre-line leading-relaxed text-zinc-800 text-base sm:text-lg">
        {tf(event, 'description', l)}
      </div>
    </article>
  );
};
