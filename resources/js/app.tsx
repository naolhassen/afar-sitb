/// <reference types="vite/client" />
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { withInertiaAdapter } from './inertiaPageAdapter';

const appName = import.meta.env.VITE_APP_NAME || 'Afar Regional Science, Innovation & Technology Bureau';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page: any = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        );
        const component = page.default ?? page[name.split('/').pop() as string] ?? page;
        return withInertiaAdapter(component);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#2563eb',
        showSpinner: true,
    },
});
