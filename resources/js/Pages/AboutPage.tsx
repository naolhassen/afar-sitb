import React from 'react';
import { Locale } from '../types';
import { messages, tf } from '../i18n/messages';
import { getAssetUrl } from '../utils/assetHelper';
import { SiteSetting } from '../types';
import PageHero from '../Components/PageHero';
import Reveal from '../Components/Reveal';
import HeroVisual from '../Components/HeroVisual';
import { StaggerGroup, StaggerItem } from '../Components/StaggerGroup';
import { Target, Eye, Heart, LucideIcon } from 'lucide-react';

interface AboutPageProps {
  currentLocale: Locale;
  settings: SiteSetting;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLocale, settings }) => {
  const l = currentLocale;
  const t = messages[l];

  const blocks: { title: string; text: string; icon: LucideIcon; gradient: string }[] = [
    {
      title: t.about.mission,
      text: settings ? tf(settings, 'mission', l) : '',
      icon: Target,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: t.about.vision,
      text: settings ? tf(settings, 'vision', l) : '',
      icon: Eye,
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      title: t.about.values,
      text: settings ? tf(settings, 'values', l) : '',
      icon: Heart,
      gradient: 'from-pink-500 to-orange-400',
    },
  ];

  const leaders = [
    {
      name: 'Mr. Seid Mohammed Seid',
      photo: '/images/leaders/mr-seid-mohammed-seid.jpg',
      position: 'Science Innovation & Technology Bureau Head',
    },
    {
      name: 'Mr. Mohammed Habib',
      photo: '/images/leaders/mr-mohammed-habib.jpg',
      position: 'Science Innovation & Technology Bureau Deputy Head',
    },
  ];

  return (
    <div>
      <PageHero title={t.about.title} />

      <section className="relative overflow-hidden bg-white px-4 py-12 pt-8">
        <div className="cg-dot-pattern pointer-events-none absolute left-0 top-10 h-40 w-56 opacity-40" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-[22rem_1fr] lg:items-center">
          <Reveal direction="scale" className="flex justify-start self-start pt-4">
            <div className="w-fit">
              <HeroVisual src={getAssetUrl('/logo-removebg.png')} alt={t.siteNameShort} />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              {t.about.duties}
            </h2>
            <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-zinc-600 sm:text-base">
              {t.about.dutiesText}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-100 bg-zinc-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {blocks.map((b) => {
              const Icon = b.icon;
              return (
                <StaggerItem
                  key={b.title}
                  className="group relative flex min-h-[13rem] flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/15"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${b.gradient} opacity-70 blur-[1px] transition-all duration-700 ease-out group-hover:-bottom-6 group-hover:-right-6 group-hover:h-40 group-hover:w-40 group-hover:opacity-90`}
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-14 -right-2 h-20 w-20 rounded-full bg-gradient-to-br ${b.gradient} opacity-50 blur-[1px] transition-all duration-700 ease-out group-hover:-bottom-8 group-hover:-right-1 group-hover:h-28 group-hover:w-28 group-hover:opacity-70`}
                  />

                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${b.gradient} text-white shadow-md`}
                  >
                    <Icon size={22} />
                  </div>

                  <h2 className="relative z-10 mt-5 text-lg font-bold text-zinc-900">{b.title}</h2>
                  <p className="relative z-10 mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-600">
                    {b.text || '—'}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          {settings?.historyAf || settings?.historyEn ? (
            <Reveal className="mt-10 rounded-2xl border border-zinc-100 bg-white p-8 shadow-xs">
              <h2 className="text-xl font-bold text-blue-900">{t.about.history}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-zinc-700">
                {tf(settings, 'history', l)}
              </p>
            </Reveal>
          ) : null}

          {settings?.bureauHeadMsgAf || settings?.bureauHeadMsgEn ? (
            <Reveal className="cg-gradient-btn mt-10 grid grid-cols-1 gap-8 rounded-2xl p-8 text-white lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="h-32 w-32 rounded-full overflow-hidden ring-4 ring-white/30 bg-white/20">
                  <img
                    src={getAssetUrl(settings?.bureau_head_photo || settings?.bureauHeadPhoto || '/uploads/gallery/583713910_1370145308140505_2477020799977289523_n.jpg')}
                    alt={settings?.bureauHeadName || 'Bureau Head'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 font-semibold text-white">{settings?.bureauHeadName}</p>
                <p className="text-sm text-white/70">{t.home.bureauHead}</p>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-white">{t.home.bureauHead}</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-white/85">
                  {tf(settings, 'bureauHeadMsg', l)}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-100 bg-white px-4 py-20">
        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Our Leadership</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">Meet the dedicated leaders guiding the Bureau.</p>
          </Reveal>
          <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {leaders.map((leader, i) => (
              <StaggerItem
                key={leader.name + i}
                className="group relative mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/15"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 max-h-[22rem]">
                  <img
                    src={getAssetUrl(leader.photo)}
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-zinc-900">{leader.name}</h3>
                  <p className="mt-1 text-sm text-blue-600">{leader.position}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
};
