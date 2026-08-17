import React, { useState, useEffect } from 'react';
import {
  AdminUser,
  ContactMessage,
  Directorate,
  Event,
  FaqItem,
  GalleryItem,
  Locale,
  News,
  PageRoute,
  Publication,
  Sector,
  SiteSetting
} from '../types';
import { messages } from '../i18n/messages';
import { store } from '../services/store';
import {
  Lock,
  LogOut,
  LayoutDashboard,
  Newspaper,
  Calendar,
  Layers,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  RefreshCw,
  Search,
  ArrowRight,
  ShieldCheck,
  Save,
  X
} from 'lucide-react';

interface AdminDashboardPageProps {
  currentLocale: Locale;
  onRouteChange: (route: PageRoute) => void;
}

type AdminTab =
  | 'overview'
  | 'news'
  | 'events'
  | 'directorates'
  | 'sectors'
  | 'gallery'
  | 'publications'
  | 'faqs'
  | 'messages'
  | 'settings';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  currentLocale,
  onRouteChange
}) => {
  const t = messages[currentLocale];
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(store.getCurrentUser());
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@sitb.afar.gov.et');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Data states
  const [news, setNews] = useState<News[]>(store.getNews());
  const [events, setEvents] = useState<Event[]>(store.getEvents());
  const [directorates, setDirectorates] = useState<Directorate[]>(store.getDirectorates());
  const [sectors, setSectors] = useState<Sector[]>(store.getSectors());
  const [gallery, setGallery] = useState<GalleryItem[]>(store.getGallery());
  const [publications, setPublications] = useState<Publication[]>(store.getPublications());
  const [faqs, setFaqs] = useState<FaqItem[]>(store.getFaqs());
  const [messagesList, setMessagesList] = useState<ContactMessage[]>(store.getMessages());
  const [siteSettings, setSiteSettings] = useState<SiteSetting>(store.getSettings());

  // Edit/Modal States
  const [editingNews, setEditingNews] = useState<Partial<News> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [editingDir, setEditingDir] = useState<Partial<Directorate> | null>(null);
  const [editingSector, setEditingSector] = useState<Partial<Sector> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const [editingPublication, setEditingPublication] = useState<Partial<Publication> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FaqItem> | null>(null);

  // Sync with store
  useEffect(() => {
    const unsub = store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setNews(store.getNews());
      setEvents(store.getEvents());
      setDirectorates(store.getDirectorates());
      setSectors(store.getSectors());
      setGallery(store.getGallery());
      setPublications(store.getPublications());
      setFaqs(store.getFaqs());
      setMessagesList(store.getMessages());
      setSiteSettings(store.getSettings());
    });
    return () => unsub();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = store.login(loginEmail, loginPassword);
    if (!success) {
      setLoginError('Invalid credentials. Use admin@sitb.afar.gov.et / admin123');
    } else {
      setLoginError('');
    }
  };

  const handleLogout = () => {
    store.logout();
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all mock databases to default seed values?')) {
      store.resetToDefaults();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-md">
              <Lock size={26} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Afar SITB Admin Portal
            </h2>
            <p className="text-xs text-slate-400">
              Authorized personnel login to manage news, events, and bureau directorates.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xl">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Email Address</label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="p-3 bg-blue-950/60 border border-blue-800/40 rounded-xl text-[11px] text-blue-200">
              <span className="font-bold">Test Credentials:</span> admin@sitb.afar.gov.et / admin123
            </div>

            <button
              type="submit"
              className="cg-gradient-btn w-full py-3 rounded-xl text-white font-bold text-xs shadow-md inline-flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
            >
              <Lock size={14} />
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => onRouteChange('home')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to public website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              SITB
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Bureau Control Console</h3>
              <p className="text-[10px] text-slate-400">Authenticated as {currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onRouteChange('laravel-architecture')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950 text-red-300 border border-red-800/50 text-xs font-semibold"
            >
              <span>Laravel Spec</span>
            </button>

            <button
              onClick={handleResetData}
              title="Reset all content to original seed data"
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs flex items-center gap-1"
            >
              <RefreshCw size={14} />
              <span className="hidden md:inline">Reset Seed</span>
            </button>

            <button
              onClick={() => onRouteChange('home')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold"
            >
              View Site
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-950/80 text-red-300 hover:bg-red-900 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-slate-200">
          {[
            { key: 'overview', label: 'Overview', icon: LayoutDashboard },
            { key: 'news', label: `News (${news.length})`, icon: Newspaper },
            { key: 'events', label: `Events (${events.length})`, icon: Calendar },
            { key: 'directorates', label: `Directorates (${directorates.length})`, icon: Layers },
            { key: 'sectors', label: `Sectors (${sectors.length})`, icon: Layers },
            { key: 'publications', label: `Publications (${publications.length})`, icon: FileText },
            { key: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
            { key: 'faqs', label: `FAQs (${faqs.length})`, icon: HelpCircle },
            {
              key: 'messages',
              label: `Inquiries (${messagesList.length})`,
              icon: Mail,
              badge: messagesList.filter((m) => !m.isRead).length
            },
            { key: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as AdminTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {tab.badge && tab.badge > 0 ? (
                  <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-bold text-[10px]">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">News Articles</span>
                <p className="text-3xl font-black text-blue-600">{news.length}</p>
                <span className="text-[11px] text-green-600">All Published</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Scheduled Events</span>
                <p className="text-3xl font-black text-indigo-600">{events.length}</p>
                <span className="text-[11px] text-indigo-600">Summits & Labs</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Directorates</span>
                <p className="text-3xl font-black text-purple-600">{directorates.length}</p>
                <span className="text-[11px] text-purple-600">Active Units</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Citizen Inquiries</span>
                <p className="text-3xl font-black text-amber-600">{messagesList.length}</p>
                <span className="text-[11px] text-amber-600">
                  {messagesList.filter((m) => !m.isRead).length} Unread
                </span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Direct Publishing Quick-Access</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setEditingNews({ titleEn: '', titleAm: '', titleAf: '', contentEn: '', published: true });
                    setActiveTab('news');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  <span>New News Article</span>
                </button>

                <button
                  onClick={() => {
                    setEditingEvent({ titleEn: '', location: '', startDate: new Date().toISOString() });
                    setActiveTab('events');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  <span>New Event</span>
                </button>

                <button
                  onClick={() => {
                    setEditingGallery({ titleEn: '', imageUrl: '', type: 'IMAGE' });
                    setActiveTab('gallery');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  <span>Upload Media</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: News Management */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">News Articles Database</h3>
              <button
                onClick={() =>
                  setEditingNews({
                    titleEn: '',
                    titleAm: '',
                    titleAf: '',
                    excerptEn: '',
                    contentEn: '',
                    coverImage: '/uploads/news/583713910_1370145308140505_2477020799977289523_n.jpg',
                    published: true
                  })
                }
                className="cg-gradient-btn px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Plus size={14} />
                <span>Add Article</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                  <tr>
                    <th className="p-4">Cover</th>
                    <th className="p-4">Title (En / Am / Af)</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80">
                      <td className="p-4">
                        <img
                          src={item.coverImage || '/logo.png'}
                          alt=""
                          className="w-12 h-10 rounded-lg object-cover bg-slate-100"
                        />
                      </td>
                      <td className="p-4 font-semibold text-slate-800 max-w-xs">
                        <p className="line-clamp-1">{item.titleEn || item.titleAm || item.titleAf}</p>
                        <p className="text-[10px] text-slate-400">{item.slug}</p>
                      </td>
                      <td className="p-4 text-slate-500 whitespace-nowrap">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold text-[10px]">
                          Published
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setEditingNews(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => store.deleteNews(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Edit News */}
        {editingNews && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingNews.id ? 'Edit News Article' : 'Create New Article'}
                </h3>
                <button onClick={() => setEditingNews(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Title (English)</label>
                  <input
                    type="text"
                    value={editingNews.titleEn || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, titleEn: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Title (Amharic - አማርኛ)</label>
                  <input
                    type="text"
                    value={editingNews.titleAm || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, titleAm: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Title (Afar - Qafaraf)</label>
                  <input
                    type="text"
                    value={editingNews.titleAf || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, titleAf: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Cover Image URL</label>
                  <input
                    type="text"
                    value={editingNews.coverImage || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, coverImage: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Content (English)</label>
                  <textarea
                    rows={4}
                    value={editingNews.contentEn || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, contentEn: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setEditingNews(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    store.saveNews(editingNews);
                    setEditingNews(null);
                  }}
                  className="cg-gradient-btn px-5 py-2 text-xs font-bold text-white rounded-xl shadow-xs"
                >
                  Save Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Events */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Events Management</h3>
              <button
                onClick={() =>
                  setEditingEvent({
                    titleEn: '',
                    titleAm: '',
                    titleAf: '',
                    location: 'Semera, Afar',
                    startDate: new Date().toISOString()
                  })
                }
                className="cg-gradient-btn px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Plus size={14} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Start Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-slate-50/80">
                      <td className="p-4 font-semibold text-slate-800">
                        {ev.titleEn || ev.titleAm || ev.titleAf}
                      </td>
                      <td className="p-4 text-slate-500">{ev.location}</td>
                      <td className="p-4 text-slate-500">{new Date(ev.startDate).toLocaleDateString()}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => store.deleteEvent(ev.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Messages Inbox */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Citizen Inquiries & Feedback</h3>
            <div className="space-y-4">
              {messagesList.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    msg.isRead ? 'bg-white border-slate-200' : 'bg-blue-50/60 border-blue-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                      <span className="text-xs text-slate-400">({msg.email})</span>
                      {msg.phone && <span className="text-xs text-slate-500">• {msg.phone}</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      <button
                        onClick={() => store.markMessageRead(msg.id, !msg.isRead)}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => store.deleteMessage(msg.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {msg.subject && (
                    <h5 className="font-bold text-xs text-blue-700 mb-1">Subject: {msg.subject}</h5>
                  )}
                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 mt-2">
                    {msg.message}
                  </p>
                </div>
              ))}

              {messagesList.length === 0 && (
                <div className="text-center py-16 text-slate-400 text-xs">No inquiries received yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Site Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 max-w-3xl">
            <h3 className="text-lg font-bold text-slate-900">Bureau Contact & Speech Configuration</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Bureau Head Name</label>
                <input
                  type="text"
                  value={siteSettings.bureauHeadName || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, bureauHeadName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Bureau Head Speech (English)</label>
                <textarea
                  rows={3}
                  value={siteSettings.bureauHeadMsgEn || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, bureauHeadMsgEn: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Official Phone</label>
                <input
                  type="text"
                  value={siteSettings.phone || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Official Email</label>
                <input
                  type="text"
                  value={siteSettings.email || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <button
                onClick={() => {
                  store.updateSettings(siteSettings);
                  alert('Settings updated successfully!');
                }}
                className="cg-gradient-btn px-6 py-2.5 rounded-xl text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
              >
                <Save size={14} />
                <span>Save Site Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
