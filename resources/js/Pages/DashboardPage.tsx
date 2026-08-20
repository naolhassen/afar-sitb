import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { Newspaper, Calendar, Building, Layers, Image, BookOpen, Settings, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react';

interface DashboardPageProps {
  locale: string;
  tables: Record<string, string>;
  counts: Record<string, number>;
}

const tableIcons: Record<string, React.ReactNode> = {
  news: <Newspaper size={22} />,
  events: <Calendar size={22} />,
  directorates: <Building size={22} />,
  sectors: <Layers size={22} />,
  gallery: <Image size={22} />,
  publications: <BookOpen size={22} />,
  settings: <Settings size={22} />,
  messages: <MessageSquare size={22} />,
};

const tableColors: Record<string, string> = {
  news: 'bg-blue-50 text-blue-600',
  events: 'bg-emerald-50 text-emerald-600',
  directorates: 'bg-amber-50 text-amber-600',
  sectors: 'bg-purple-50 text-purple-600',
  gallery: 'bg-rose-50 text-rose-600',
  publications: 'bg-cyan-50 text-cyan-600',
  settings: 'bg-slate-100 text-slate-600',
  messages: 'bg-orange-50 text-orange-600',
};

export const DashboardPage: React.FC = () => {
  const { locale, tables, counts } = usePage().props as unknown as DashboardPageProps;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} className="text-blue-400" />
            <h1 className="font-bold text-sm">Afar SITB Admin</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.post(`/${locale}/admin/logout`);
            }}
          >
            <button
              type="submit"
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <LogOut size={14} /> Logout
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-500">Manage the website content from one place.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(tables).map(([key, label]) => (
            <div
              key={key}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${tableColors[key] ?? 'bg-slate-100 text-slate-600'}`}>
                  {tableIcons[key] ?? <Settings size={22} />}
                </div>
                <span className="text-2xl font-black text-slate-900">{counts[key] ?? 0}</span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">{label}</h3>
              <button
                onClick={() => router.get(`/${locale}/admin`, { table: key }, { preserveState: false })}
                className="mt-4 w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:opacity-90"
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
