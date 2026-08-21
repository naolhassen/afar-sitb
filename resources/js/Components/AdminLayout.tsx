import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { getAssetUrl } from '../utils/assetHelper';
import {
  LogOut,
  LayoutDashboard,
  Newspaper,
  Calendar,
  Building,
  Layers,
  Image as ImageIcon,
  BookOpen,
  Settings,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

const tableIcons: Record<string, React.ReactNode> = {
  news: <Newspaper size={16} />,
  events: <Calendar size={16} />,
  directorates: <Building size={16} />,
  sectors: <Layers size={16} />,
  gallery: <ImageIcon size={16} />,
  publications: <BookOpen size={16} />,
  settings: <Settings size={16} />,
  messages: <MessageSquare size={16} />,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { locale, tables, table: activeTable } = usePage().props as any;

  const tableList = (tables as Record<string, string>) || {};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 text-white border-r border-slate-800 flex flex-col">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
          <img
            src={getAssetUrl('/logo.jpg')}
            alt="Afar SITB"
            className="h-10 w-10 rounded-full object-cover bg-white"
          />
          <div>
            <h1 className="font-bold text-sm leading-tight">Afar SITB</h1>
            <p className="text-[10px] text-slate-400">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <button
            onClick={() => router.get(`/${locale}/admin`)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-colors ${
              !activeTable
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          <div className="pt-2 pb-1 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Content
          </div>

          {Object.entries(tableList).map(([key, label]) => (
            <button
              key={key}
              onClick={() => router.get(`/${locale}/admin/${key}`)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTable === key
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className={activeTable === key ? 'text-white' : 'text-slate-400'}>
                {tableIcons[key] ?? <Settings size={16} />}
              </span>
              {label as string}
              <ChevronRight
                size={14}
                className={`ml-auto transition-transform ${
                  activeTable === key ? 'rotate-90' : ''
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.post(`/${locale}/admin/logout`);
            }}
          >
            <button
              type="submit"
              className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-3 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Top header */}
      <header className="fixed top-0 right-0 left-64 z-20 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            {activeTable && tableList[activeTable]
              ? tableList[activeTable]
              : 'Dashboard'}
          </h2>
          <p className="text-[10px] text-slate-500">
            {activeTable ? 'Manage content records' : 'Overview'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.get(`/${locale}`)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            View Site
          </button>
          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <Settings size={14} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
