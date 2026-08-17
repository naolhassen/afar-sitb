import React from 'react';
import { Locale } from '../types';
import { messages, tf } from '../i18n/messages';
import { store } from '../services/store';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import Reveal from '../components/Reveal';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactPageProps {
  currentLocale: Locale;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLocale }) => {
  const l = currentLocale;
  const t = messages[l];
  const settings = store.getSiteSettings();

  return (
    <div>
      <PageHero title={t.contact.title} />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 lg:grid-cols-3">
        <StaggerGroup className="space-y-4 lg:col-span-1">
          {settings?.phone && (
            <StaggerItem className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <Phone className="text-blue-700 shrink-0" size={18} />
              <span className="text-sm text-zinc-700">{settings.phone}</span>
            </StaggerItem>
          )}
          {settings?.email && (
            <StaggerItem className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <Mail className="text-blue-700 shrink-0" size={18} />
              <span className="text-sm text-zinc-700">{settings.email}</span>
            </StaggerItem>
          )}
          {settings?.addressAf && (
            <StaggerItem className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <MapPin className="text-blue-700 shrink-0" size={18} />
              <span className="text-sm text-zinc-700">{tf(settings, 'address', l)}</span>
            </StaggerItem>
          )}
        </StaggerGroup>
        <Reveal direction="left" className="lg:col-span-2">
          <ContactForm currentLocale={l} />
        </Reveal>
      </section>

      <Reveal className="mx-auto max-w-6xl px-4 pb-20">
        <div className="h-80 overflow-hidden rounded-2xl border border-zinc-200 shadow-md sm:h-96">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Semera,Afar,Ethiopia&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </div>
  );
};
