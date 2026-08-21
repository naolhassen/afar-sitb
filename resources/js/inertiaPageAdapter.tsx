import React from 'react';
import { router, usePage } from '@inertiajs/react';
import { Locale, PageRoute } from './types';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

let lastNewsSlug = '';
let lastEventSlug = '';

const componentRouteMap: Record<string, PageRoute> = {
    HomePage: 'home',
    AboutPage: 'about',
    SectorsPage: 'sectors',
    DirectoratesPage: 'directorates',
    NewsPage: 'news',
    NewsDetailPage: 'news-detail',
    EventsPage: 'events',
    EventDetailPage: 'event-detail',
    PublicationsPage: 'publications',
    GalleryPage: 'gallery',
    FaqPage: 'faq',
    ContactPage: 'contact',
    DashboardPage: 'admin-dashboard',
    LoginPage: 'admin-login',
    AdminCrudPage: 'admin-dashboard',
    LaravelArchitecturePage: 'laravel-architecture',
};

const bareLayoutPages = new Set(['DashboardPage', 'LoginPage', 'AdminCrudPage', 'LaravelArchitecturePage', 'AdminListPage', 'AdminFormPage']);

const urlFor = (route: PageRoute, locale: string): string => {
    switch (route) {
        case 'home':
            return `/${locale}`;
        case 'news-detail':
            return `/${locale}/news/${lastNewsSlug}`;
        case 'event-detail':
            return `/${locale}/events/${lastEventSlug}`;
        case 'admin-login':
            return `/${locale}/admin/login`;
        case 'laravel-architecture':
            return `/${locale}`;
        default:
            if (route.startsWith('admin')) return `/${locale}/admin`;
            return `/${locale}/${route}`;
    }
};

export function withInertiaAdapter(Component: React.ComponentType<any>): React.ComponentType<any> {
    return function InertiaAdaptedPage(props: any) {
        const locale: Locale = props.locale ?? 'en';

        if (props.article) lastNewsSlug = String(props.article.slug ?? props.article.id);
        if (props.event) lastEventSlug = String(props.event.slug ?? props.event.id);

        const pageName = usePage().component as string;
        const currentRoute: PageRoute = componentRouteMap[pageName] ?? 'home';
        const onRouteChange = (route: PageRoute) => router.visit(urlFor(route, locale));
        const onLocaleChange = (next: Locale) => {
            const rest = window.location.pathname.replace(/^\/(en|am|af)(?=\/|$)/, '');
            router.visit(`/${next}${rest}`);
        };

        const adapted = {
            ...props,
            currentLocale: locale,
            newsSlug: props.article ? String(props.article.slug ?? props.article.id) : props.newsSlug,
            eventSlug: props.event ? String(props.event.slug ?? props.event.id) : props.eventSlug,
            onRouteChange,
            onSelectNewsSlug: (slug: string) => {
                lastNewsSlug = slug;
            },
            onSelectEventSlug: (slug: string) => {
                lastEventSlug = slug;
            },
        };

        if (bareLayoutPages.has(pageName)) {
            return <Component {...adapted} />;
        }

        return (
            <>
                <Header
                    currentLocale={locale}
                    onLocaleChange={onLocaleChange}
                    currentRoute={currentRoute}
                    onRouteChange={onRouteChange}
                />
                <main className="min-h-screen">
                    <Component {...adapted} />
                </main>
                <Footer currentLocale={locale} onRouteChange={onRouteChange} settings={props.settings} />
            </>
        );
    };
}
