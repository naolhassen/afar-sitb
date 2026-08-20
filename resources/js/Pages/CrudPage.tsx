import React, { useState, useEffect } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

type FieldType =
  | 'text'
  | 'textarea'
  | 'translatable'
  | 'translatable_textarea'
  | 'date'
  | 'datetime-local'
  | 'number'
  | 'boolean'
  | 'select';

interface CrudField {
  name: string;
  label: string;
  type: FieldType;
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

export const CrudPage: React.FC = () => {
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

  const initialItem = single ? items[0] : undefined;
  const { data, setData, post, put, delete: destroy, processing, errors } = useForm(buildInitialData(fields, initialItem));

  useEffect(() => {
    const item = single ? items[0] : undefined;
    setData(buildInitialData(fields, item));
    setEditingId(single && items[0]?.id ? items[0].id : null);
  }, [table, items]);

  const editingItem = editingId && !single ? items.find((i) => i.id === editingId) : null;

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

  const renderField = (f: CrudField) => {
    const base = (
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

        {errors[f.name] && <p className="text-[11px] text-red-500">{errors[f.name]}</p>}
      </div>
    );

    return base;
  };

  const listValue = (item: any) => item[list_field] ?? `Record #${item.id}`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-bold text-sm">Afar SITB Admin</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.post(`/${locale}/admin/logout`);
            }}
          >
            <button type="submit" className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg">
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {flash?.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 text-xs rounded-xl">{flash.success}</div>
        )}

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {Object.entries(tables).map(([key, label]) => (
            <button
              key={key}
              onClick={() => router.get(`/${locale}/admin`, { table: key }, { preserveState: false })}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
                table === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {!readonly && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">
                {single ? 'Edit Settings' : editingId ? 'Edit Record' : 'Add New Record'}
              </h2>
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">{tables[table]}</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="p-4 text-slate-400">{item.id}</td>
                    <td className="p-4 font-semibold text-slate-800 max-w-md truncate">{listValue(item)}</td>
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

            {items.length === 0 && (
              <p className="p-8 text-center text-slate-400 text-xs">No records found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
