import React from 'react';
import { Locale } from '../types';
import { messages, tf } from '../i18n/messages';
import { store } from '../services/store';
import PageHero from '../components/PageHero';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';

interface FaqPageProps {
  currentLocale: Locale;
}

export const FaqPage: React.FC<FaqPageProps> = ({ currentLocale }) => {
  const l = currentLocale;
  const t = messages[l];
  const faqs = store.getFaqs();

  return (
    <div>
      <PageHero title={t.nav.faq} />
      <section className="mx-auto max-w-3xl px-4 py-14">
        {faqs.length === 0 ? (
          <p className="text-sm text-zinc-500">No FAQs available at this moment.</p>
        ) : (
          <StaggerGroup className="space-y-4">
            {faqs.map((f) => (
              <StaggerItem key={f.id}>
                <details className="group rounded-xl border border-zinc-200 p-5 transition-colors hover:border-blue-200 bg-white">
                  <summary className="cursor-pointer font-semibold text-blue-900 list-none flex items-center justify-between">
                    <span>{tf(f, 'question', l)}</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-700 pt-3 border-t border-zinc-100">
                    {tf(f, 'answer', l)}
                  </p>
                </details>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
};
