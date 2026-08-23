import React from 'react';
import { router } from '@inertiajs/react';
import { Locale, PageRoute } from '../types';
import { messages, tf } from '../i18n/messages';
import PageHero from '../Components/PageHero';
import { Event } from '../types';
import { StaggerGroup, StaggerItem } from '../Components/StaggerGroup';
import { MapPin } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

interface EventsPageProps {
  currentLocale: Locale;
  onRouteChange: (route: PageRoute) => void;
  upcomingEvents: Event[];
  pastEvents?: Event[];
}

export const EventsPage: React.FC<EventsPageProps> = ({
  currentLocale,
  upcomingEvents,
  pastEvents = [],
}) => {
  const l = currentLocale;
  const t = messages[l];

  const renderEvent = (e: Event) => (
    <StaggerItem key={e.id}>
      <div
        onClick={() => router.get(`/${currentLocale}/events/${e.id}`)}
        className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg cursor-pointer overflow-hidden"
      >
        {e.image_url && (
          <img
            src={getAssetUrl(e.image_url)}
            alt={tf(e, 'title', l)}
            className="h-16 w-16 shrink-0 rounded-lg object-cover"
          />
        )}
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-800 text-white">
          <span className="text-xl font-bold">{new Date(e.startDate).getDate()}</span>
          <span className="text-[10px] uppercase">
            {new Date(e.startDate).toLocaleDateString(l === 'am' ? 'am-ET' : l === 'af' ? 'aa-ET' : 'en-US', { month: 'short' })}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-blue-900">{tf(e, 'title', l)}</h3>
          <p className="mt-1 text-sm text-zinc-600 line-clamp-2">
            {tf(e, 'description', l)}
          </p>
          {e.location && (
            <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
              <MapPin size={12} /> {e.location}
            </p>
          )}
        </div>
      </div>
    </StaggerItem>
  );

  return (
    <div>
      <PageHero title={t.nav.events} />
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="mb-6 text-2xl font-bold text-zinc-900">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-zinc-500">No events scheduled at this time.</p>
        ) : (
          <StaggerGroup className="space-y-4">
            {upcomingEvents.map(renderEvent)}
          </StaggerGroup>
        )}

        {pastEvents.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900">Past Events</h2>
            <StaggerGroup className="space-y-4">
              {pastEvents.map(renderEvent)}
            </StaggerGroup>
          </div>
        )}
      </section>
    </div>
  );
};
