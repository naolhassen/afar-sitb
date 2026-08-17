import React, { useState, useEffect } from 'react';
import { Locale, PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DirectoratesPage } from './pages/DirectoratesPage';
import { SectorsPage } from './pages/SectorsPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { GalleryPage } from './pages/GalleryPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LaravelArchitecturePage } from './pages/LaravelArchitecturePage';

export default function App() {
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('afar_sitb_locale_v1');
      if (saved === 'en' || saved === 'am' || saved === 'af') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedNewsSlug, setSelectedNewsSlug] = useState<string | null>(null);
  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('afar_sitb_locale_v1', currentLocale);
    } catch {
      // ignore
    }
  }, [currentLocale]);

  const handleRouteChange = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNews = (slug: string) => {
    setSelectedNewsSlug(slug);
    setCurrentRoute('news-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEvent = (slug: string) => {
    setSelectedEventSlug(slug);
    setCurrentRoute('event-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = currentRoute.startsWith('admin');

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Global Header */}
      {!isAdminRoute && (
        <Header
          currentRoute={currentRoute}
          onRouteChange={handleRouteChange}
          currentLocale={currentLocale}
          onLocaleChange={setCurrentLocale}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            currentLocale={currentLocale}
            onRouteChange={handleRouteChange}
            onSelectNewsSlug={handleSelectNews}
            onSelectEventSlug={handleSelectEvent}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            currentLocale={currentLocale}
          />
        )}

        {currentRoute === 'directorates' && (
          <DirectoratesPage
            currentLocale={currentLocale}
          />
        )}

        {currentRoute === 'sectors' && (
          <SectorsPage
            currentLocale={currentLocale}
          />
        )}

        {currentRoute === 'news' && (
          <NewsPage
            currentLocale={currentLocale}
            onRouteChange={handleRouteChange}
            onSelectNewsSlug={handleSelectNews}
          />
        )}

        {currentRoute === 'news-detail' && (
          <NewsDetailPage
            newsSlug={selectedNewsSlug || ''}
            currentLocale={currentLocale}
            onRouteChange={handleRouteChange}
          />
        )}

        {currentRoute === 'events' && (
          <EventsPage
            currentLocale={currentLocale}
            onRouteChange={handleRouteChange}
            onSelectEventSlug={handleSelectEvent}
          />
        )}

        {currentRoute === 'event-detail' && (
          <EventDetailPage
            eventSlug={selectedEventSlug || ''}
            currentLocale={currentLocale}
            onRouteChange={handleRouteChange}
          />
        )}

        {currentRoute === 'publications' && (
          <PublicationsPage
            currentLocale={currentLocale}
          />
        )}

        {currentRoute === 'gallery' && (
          <GalleryPage
            currentLocale={currentLocale}
          />
        )}

        {currentRoute === 'faq' && (
          <FaqPage
            currentLocale={currentLocale}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            currentLocale={currentLocale}
          />
        )}

        {isAdminRoute && (
          <AdminDashboardPage
            currentLocale={currentLocale}
            onRouteChange={handleRouteChange}
          />
        )}

        {currentRoute === 'laravel-architecture' && (
          <LaravelArchitecturePage
            currentLocale={currentLocale}
            onRouteChange={handleRouteChange}
          />
        )}
      </main>

      {/* Global Footer */}
      {!isAdminRoute && (
        <Footer
          currentLocale={currentLocale}
          onRouteChange={handleRouteChange}
        />
      )}
    </div>
  );
}
