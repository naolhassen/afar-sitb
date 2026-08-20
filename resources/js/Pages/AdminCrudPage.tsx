import React, { useState, useEffect, useMemo } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { Trash2, Edit2, Plus, Save, Upload, LogOut, LayoutDashboard, ChevronRight, Search, X, Filter, Copy } from 'lucide-react';

type FieldType =
  | 'text'
  | 'textarea'
  | 'translatable'
  | 'translatable_textarea'
  | 'date'
  | 'datetime-local'
  | 'number'
  | 'boolean'
  | 'select'
  | 'file';

interface CrudField {
  name: string;
  label: string;
  type: FieldType;
  accept?: string;
  options?: Record<string, string>;
  required?: boolean;
}

interface CrudPageProps {
  locale: string;
  table: string;
  tables: Record<string, string>;
  items: any[];
  fields: CrudField[];
  list_field: string;
  readonly: boolean;
  single: boolean;
  flash?: { success?: string };
}

const suffixLabels: Record<string, string> = {
  aa: 'Qafar',
  am: 'Amharic',
  en: 'English',
};

const buildInitialData = (fields: CrudField[], item?: any): Record<string, any> => {
  const d: Record<string, any> = {};

  fields.forEach((f) => {
    if (f.type === 'translatable' || f.type === 'translatable_textarea') {
      ['aa', 'am', 'en'].forEach((s) => {
        d[`${f.name}_${s}`] = item?.[`${f.name}_${s}`] ?? '';
      });
    } else if (f.type === 'boolean') {
      d[f.name] = item?.[f.name] ?? false;
    } else if (f.type === 'number') {
      d[f.name] = item?.[f.name] ?? 0;
    } else if (f.type === 'select') {
      d[f.name] = item?.[f.name] ?? '';
    } else {
      d[f.name] = item?.[f.name] ?? '';
    }
  });

  return d;
};

export const AdminCrudPage: React.FC = () => {
  const {
    locale,
    table,
    tables,
    items,
    fields,
    list_field,
    readonly,
    single,
    flash,
  } = usePage().props as unknown as CrudPageProps;

  const [editingId, setEditingId] = useState<number | null>(single && items[0]?.id ? items[0].id : null);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);

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

  const initialItem = single ? items[0] : undefined;
  const { data, setData, post, put, delete: destroy, processing, errors } = useForm(
    buildInitialData(fields, initialItem)
  );

  useEffect(() => {
    const item = single ? items[0] : undefined;
    setData(buildInitialData(fields, item));
    setEditingId(single && items[0]?.id ? items[0].id : null);
  }, [table, items]);

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setData(buildInitialData(fields, item));
  };

  const startAdd = () => {
    setEditingId(null);
    setData(buildInitialData(fields));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      put(`/${locale}/admin/${table}/${editingId}`);
    } else {
      post(`/${locale}/admin/${table}`);
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    destroy(`/${locale}/admin/${table}/${id}`);
  };

  const getXsrfToken = () => {
    const token = document.cookie
      .split('; ')
      .find((r) => r.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
    return token ? decodeURIComponent(token) : '';
  };

  const handleFileUpload = async (fieldName: string, file: File) => {
    setUploading((p) => ({ ...p, [fieldName]: true }));
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`/${locale}/admin/upload`, {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': getXsrfToken(),
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const { url } = await res.json();
      setData(fieldName, url);
    } catch (err) {
      setUploadError('File upload failed. Please try again.');
    } finally {
      setUploading((p) => ({ ...p, [fieldName]: false }));
    }
  };

  const renderField = (f: CrudField) => {
    return (
      <div key={f.name} className="space-y-2">
        <label className="text-xs font-bold text-slate-700">{f.label}</label>

        {f.type === 'translatable' && (
          <div className="grid grid-cols-1 gap-3">
            {(['aa', 'am', 'en'] as const).map((s) => (
              <input
                key={s}
                type="text"
                placeholder={suffixLabels[s]}
                value={data[`${f.name}_${s}`] || ''}
                onChange={(e) => setData(`${f.name}_${s}`, e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
              />
            ))}
          </div>
        )}

        {f.type === 'translatable_textarea' && (
          <div className="grid grid-cols-1 gap-3">
            {(['aa', 'am', 'en'] as const).map((s) => (
              <textarea
                key={s}
                rows={4}
                placeholder={suffixLabels[s]}
                value={data[`${f.name}_${s}`] || ''}
                onChange={(e) => setData(`${f.name}_${s}`, e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
              />
            ))}
          </div>
        )}

        {f.type === 'text' && (
          <input
            type="text"
            value={data[f.name] || ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
          />
        )}

        {f.type === 'textarea' && (
          <textarea
            rows={4}
            value={data[f.name] || ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
          />
        )}

        {f.type === 'date' && (
          <input
            type="date"
            value={data[f.name] ? data[f.name].split('T')[0] : ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
          />
        )}

        {f.type === 'datetime-local' && (
          <input
            type="datetime-local"
            value={data[f.name] ? data[f.name].slice(0, 16) : ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
          />
        )}

        {f.type === 'number' && (
          <input
            type="number"
            value={data[f.name] || 0}
            onChange={(e) => setData(f.name, Number(e.target.value))}
            className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
          />
        )}

        {f.type === 'boolean' && (
          <label className="inline-flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={Boolean(data[f.name])}
              onChange={(e) => setData(f.name, e.target.checked)}
              className="rounded border-slate-300"
            />
            {data[f.name] ? 'Yes' : 'No'}
          </label>
        )}

        {f.type === 'select' && (
          <select
            value={data[f.name] || ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
          >
            {Object.entries(f.options ?? {}).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        )}

        {f.type === 'file' && (
          <div className="space-y-2">
            {data[f.name] && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 truncate mb-2">{data[f.name]}</p>
                {data[f.name].match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                  <img src={data[f.name]} alt="" className="h-24 w-auto rounded-lg object-cover" />
                ) : (
                  <a href={data[f.name]} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                    View file
                  </a>
                )}
              </div>
            )}
            <label className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs cursor-pointer hover:bg-slate-100 w-fit">
              <Upload size={14} />
              {uploading[f.name] ? 'Uploading...' : 'Choose file'}
              <input
                type="file"
                accept={f.accept}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(f.name, file);
                }}
              />
            </label>
          </div>
        )}

        {errors[f.name] && <p className="text-[11px] text-red-500">{errors[f.name]}</p>}
      </div>
    );
  };

  const listValue = (item: any) => item[list_field] ?? `Record #${item.id}`;

  const formatDate = (d: string | undefined | null) => {
    if (!d) return '—';
    const date = new Date(d);
    if (isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getPublishOn = (item: any) =>
    item.published_at ?? item.publishedAt ?? item.date ?? item.startDate ?? item.created_at ?? item.createdAt ?? null;

  const getPublicUrl = (item: any) => `/${locale}/${table}/${item.slug || item.id}`;

  const filteredItems = useMemo(() => {
    return items.filter((item: any) => {
      if (appliedFilters.title) {
        const title = listValue(item).toLowerCase();
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <aside className="w-64 bg-slate-950 text-white flex flex-col sticky top-0 h-screen border-r border-slate-800">
        <div className="p-5 border-b border-slate-800">
          <h1 className="font-bold text-sm">Afar SITB</h1>
          <p className="text-[10px] text-slate-400">Admin Panel</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <button
            onClick={() => router.get(`/${locale}/admin`)}
            className="w-full text-left px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>

          {Object.entries(tables).map(([key, label]) => (
            <button
              key={key}
              onClick={() => router.get(`/${locale}/admin`, { table: key }, { preserveState: false })}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 ${
                table === key
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ChevronRight size={14} className={table === key ? 'opacity-100' : 'opacity-60'} />
              {label}
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
              className="w-full text-left px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {flash?.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 text-xs rounded-xl">{flash.success}</div>
        )}

        {uploadError && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 text-xs rounded-xl">{uploadError}</div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-900">{tables[table]}</h2>
          <p className="text-xs text-slate-500">{single ? 'Single record' : `${items.length} records`}</p>
        </div>

        {!readonly && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                {single ? 'Edit Settings' : editingId ? 'Edit Record' : 'Add New Record'}
              </h3>
              {!single && editingId && (
                <button onClick={startAdd} className="text-xs text-blue-600 flex items-center gap-1">
                  <Plus size={14} /> New
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(renderField)}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                {!single && editingId && (
                  <button
                    type="button"
                    onClick={startAdd}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-60"
                >
                  <Save size={14} />
                  {processing ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!single && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{tables[table]}</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">{filteredItems.length} records</p>
              </div>
              {!readonly && (
                <button
                  onClick={startAdd}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 text-xs font-bold text-white hover:shadow-md transition-all"
                >
                  <Plus size={14} /> Add {tables[table]}
                </button>
              )}
            </div>

            <div className="p-5 border-b border-slate-100 bg-slate-50/60">
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[12rem]">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Title</label>
                  <input
                    type="text"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                    placeholder="Search title..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div className="w-44">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-rose-400 focus:outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="w-44">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Publish On</label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <button
                  onClick={applyFilters}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500 px-4 py-2 text-xs font-bold text-white hover:bg-rose-600 transition-colors"
                >
                  <Filter size={14} /> Filter
                </button>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <X size={14} /> Clear
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
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
                            onClick={() => startEdit(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
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

            {filteredItems.length === 0 && (
              <p className="p-8 text-center text-slate-400 text-xs">No records found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
