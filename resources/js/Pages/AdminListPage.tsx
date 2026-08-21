import React, { useMemo, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Copy, Search, Filter, X, ChevronRight, ArrowLeft } from 'lucide-react';
import AdminLayout from '../Components/AdminLayout';

interface AdminListPageProps {
  locale: string;
  table: string;
  tables: Record<string, string>;
  items: any[];
  list_field: string;
  readonly: boolean;
  single: boolean;
  flash?: { success?: string };
}

const formatDate = (d: string | undefined | null) => {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const AdminListPage: React.FC = () => {
  const {
    locale,
    table,
    tables,
    items,
    list_field,
    readonly,
    single,
    flash,
  } = usePage().props as unknown as AdminListPageProps;

  const listValue = (item: any) => item[list_field] ?? `Record #${item.id}`;
  const getPublishOn = (item: any) =>
    item.published_at ?? item.publishedAt ?? item.date ?? item.startDate ?? item.created_at ?? item.createdAt ?? null;
  const getPublicUrl = (item: any) => `/${locale}/${table}/${item.slug || item.id}`;

  const [titleFilter, setTitleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ title: '', status: '', date: '' });

  const applyFilters = () => setAppliedFilters({ title: titleFilter, status: statusFilter, date: dateFilter });
  const clearFilters = () => {
    setTitleFilter('');
    setStatusFilter('');
    setDateFilter('');
    setAppliedFilters({ title: '', status: '', date: '' });
  };

  const filteredItems = useMemo(() => {
    return (items || []).filter((item: any) => {
      if (appliedFilters.title) {
        const title = String(listValue(item) || '').toLowerCase();
        if (!title.includes(appliedFilters.title.toLowerCase())) return false;
      }
      if (appliedFilters.status) {
        const published = item.published;
        if (appliedFilters.status === 'published' && published !== true) return false;
        if (appliedFilters.status === 'draft' && published !== false) return false;
      }
      if (appliedFilters.date) {
        const pub = String(getPublishOn(item) ?? '');
        if (!pub.startsWith(appliedFilters.date)) return false;
      }
      return true;
    });
  }, [items, appliedFilters]);

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    router.delete(`/${locale}/admin/${table}/${id}`);
  };

  return (
    <AdminLayout>
      {flash?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
          <span className="font-semibold">{flash.success}</span>
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <button onClick={() => router.get(`/${locale}/admin`)} className="hover:text-slate-900">Dashboard</button>
            <ChevronRight size={12} />
            <span className="text-slate-900 font-semibold">{tables[table]}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">{tables[table]}</h2>
          <p className="text-sm text-slate-500">{single ? 'Single record' : `${filteredItems.length} records found`}</p>
        </div>

        {!readonly && !single && (
          <button
            onClick={() => router.get(`/${locale}/admin/${table}/create`)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all"
          >
            <Plus size={16} />
            Add {tables[table]}
          </button>
        )}

        {single && (
          <button
            onClick={() => router.get(`/${locale}/admin/${table}/${(items[0]?.id) || 1}/edit`)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all"
          >
            <Edit2 size={16} />
            Edit {tables[table]}
          </button>
        )}
      </div>

      {/* Filters */}
      {!single && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[14rem]">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 block">Search</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                  placeholder="Search by title..."
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="w-48">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="w-44">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 block">Publish On</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={applyFilters}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
            >
              <Filter size={14} /> Filter
            </button>

            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X size={14} /> Clear
            </button>
          </div>
        </div>
      )}

      {/* Records table */}
      {single && items[0] ? (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
          <h3 className="text-lg font-bold text-slate-900 mb-4">{tables[table]}</h3>
          <p className="text-sm text-slate-500 mb-6">This is a single-record section. Use the Edit button above to update it.</p>
          <div className="space-y-2">
            {Object.entries(items[0])
              .filter(([k]) => !['id', 'created_at', 'updated_at', 'createdAt', 'updatedAt'].includes(k))
              .map(([k, v]) => (
                <div key={k} className="flex gap-4 text-sm border-b border-slate-100 py-2 last:border-0">
                  <span className="w-40 font-bold text-slate-600 capitalize">{k.replace(/_/g, ' ')}</span>
                  <span className="flex-1 text-slate-800 truncate">{String(v ?? '—')}</span>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[11px]">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4">Publish On</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4">Updated At</th>
                  <th className="p-4">Copy Url</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-800 max-w-xs truncate">{listValue(item)}</td>
                    <td className="p-4">
                      {typeof item.published === 'boolean' ? (
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${item.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {item.published ? 'Published' : 'Draft'}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      {typeof item.published === 'boolean' ? (
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${item.published ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                          {item.published ? 'Public' : 'Private'}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 whitespace-nowrap">{formatDate(getPublishOn(item))}</td>
                    <td className="p-4 text-slate-600 whitespace-nowrap">{formatDate(item.created_at || item.createdAt)}</td>
                    <td className="p-4 text-slate-600 whitespace-nowrap">{formatDate(item.updated_at || item.updatedAt)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => navigator.clipboard.writeText(getPublicUrl(item))}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        title="Copy public URL"
                      >
                        <Copy size={14} />
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {!readonly && (
                        <button
                          onClick={() => router.get(`/${locale}/admin/${table}/${item.id}/edit`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-sm text-slate-500 mb-4">No records found.</p>
              {!readonly && !single && (
                <button
                  onClick={() => router.get(`/${locale}/admin/${table}/create`)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} /> Add your first {tables[table]}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};
