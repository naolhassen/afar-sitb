import React, { useState } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';
import { Save, Upload, X, ChevronRight } from 'lucide-react';
import AdminLayout from '../Components/AdminLayout';

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
  | 'file'
  | 'multi-file';

interface CrudField {
  name: string;
  label: string;
  type: FieldType;
  accept?: string;
  options?: Record<string, string>;
  required?: boolean;
}

interface AdminFormPageProps {
  locale: string;
  mode: 'create' | 'edit';
  table: string;
  tables: Record<string, string>;
  item: any;
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
    } else if (f.type === 'multi-file') {
      d[f.name] = item?.[f.name] ?? [];
    } else if (f.type === 'date' || f.type === 'datetime-local') {
      const v = item?.[f.name] ?? '';
      d[f.name] = v ? String(v).replace(' ', 'T').slice(0, 16) : '';
    } else {
      d[f.name] = item?.[f.name] ?? '';
    }
  });

  return d;
};

export const AdminFormPage: React.FC = () => {
  const {
    locale,
    mode,
    table,
    tables,
    item,
    fields,
    single,
    flash,
  } = usePage().props as unknown as AdminFormPageProps;

  const { data, setData, post, put, processing, errors } = useForm(buildInitialData(fields, item));
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);

  const getXsrfToken = () => {
    const token = document.cookie
      .split('; ')
      .find((r) => r.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
    return token ? decodeURIComponent(token) : '';
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

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
    return url;
  };

  const handleFileUpload = async (fieldName: string, file: File) => {
    setUploading((p) => ({ ...p, [fieldName]: true }));
    setUploadError(null);

    try {
      const url = await uploadFile(file);
      setData(fieldName, url);
    } catch (err) {
      setUploadError('File upload failed. Please try again.');
    } finally {
      setUploading((p) => ({ ...p, [fieldName]: false }));
    }
  };

  const handleMultiFileUpload = async (fieldName: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading((p) => ({ ...p, [fieldName]: true }));
    setUploadError(null);

    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        setData(fieldName, [...(data[fieldName] || []), url]);
      }
    } catch (err) {
      setUploadError('One or more file uploads failed. Please try again.');
    } finally {
      setUploading((p) => ({ ...p, [fieldName]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create' || single) {
      post(`/${locale}/admin/${table}`);
    } else {
      put(`/${locale}/admin/${table}/${item.id}`);
    }
  };

  const renderField = (f: CrudField) => {
    return (
      <div key={f.name} className="space-y-2">
        <label className="text-sm font-bold text-slate-700">
          {f.label}
          {f.required ? <span className="text-red-500 ml-0.5">*</span> : null}
        </label>

        {f.type === 'translatable' && (
          <div className="grid grid-cols-1 gap-3">
            {(['aa', 'am', 'en'] as const).map((s) => (
              <input
                key={s}
                type="text"
                placeholder={suffixLabels[s]}
                value={data[`${f.name}_${s}`] || ''}
                onChange={(e) => setData(`${f.name}_${s}`, e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>
        )}

        {f.type === 'text' && (
          <input
            type="text"
            value={data[f.name] || ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
          />
        )}

        {f.type === 'textarea' && (
          <textarea
            rows={4}
            value={data[f.name] || ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
          />
        )}

        {f.type === 'date' && (
          <input
            type="date"
            value={data[f.name] ? data[f.name].split('T')[0] : ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
          />
        )}

        {f.type === 'datetime-local' && (
          <input
            type="datetime-local"
            value={data[f.name] ? data[f.name].slice(0, 16) : ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
          />
        )}

        {f.type === 'number' && (
          <input
            type="number"
            value={data[f.name] ?? 0}
            onChange={(e) => setData(f.name, Number(e.target.value))}
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
          />
        )}

        {f.type === 'boolean' && (
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={Boolean(data[f.name])}
              onChange={(e) => setData(f.name, e.target.checked)}
              className="rounded border-slate-300 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            {data[f.name] ? 'Yes' : 'No'}
          </label>
        )}

        {f.type === 'select' && (
          <select
            value={data[f.name] || ''}
            onChange={(e) => setData(f.name, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
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
                {String(data[f.name]).match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                  <img src={data[f.name]} alt="" className="h-24 w-auto rounded-lg object-cover" />
                ) : (
                  <a href={data[f.name]} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                    View file
                  </a>
                )}
              </div>
            )}
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm cursor-pointer hover:bg-slate-100 transition-colors w-fit">
              <Upload size={16} />
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

        {f.type === 'multi-file' && (
          <div className="space-y-2">
            {Array.isArray(data[f.name]) && data[f.name].length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {(data[f.name] as string[]).map((url, i) => (
                  <div key={i} className="relative p-2 bg-slate-50 rounded-xl border border-slate-200">
                    {String(url).match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                      <img src={url} alt="" className="h-20 w-full rounded-lg object-cover" />
                    ) : (
                      <a href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline break-all">
                        View file
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setData(f.name, (data[f.name] as string[]).filter((_, idx) => idx !== i))}
                      className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full shadow-sm"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm cursor-pointer hover:bg-slate-100 transition-colors w-fit">
              <Upload size={16} />
              {uploading[f.name] ? 'Uploading...' : 'Add files'}
              <input
                type="file"
                accept={f.accept}
                multiple
                className="hidden"
                onChange={(e) => handleMultiFileUpload(f.name, e.target.files)}
              />
            </label>
          </div>
        )}

        {errors[f.name] && <p className="text-xs text-red-500">{errors[f.name]}</p>}
      </div>
    );
  };

  return (
    <AdminLayout>
      {flash?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
          {flash.success}
        </div>
      )}

      {uploadError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{uploadError}</div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <button onClick={() => router.get(`/${locale}/admin/${table}`)} className="hover:text-slate-900 flex items-center gap-1">
              <ChevronRight size={14} className="rotate-180" /> Back
            </button>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">{tables[table]}</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">{mode === 'create' ? 'Add New' : 'Edit'}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {mode === 'create' ? `Add ${tables[table]}` : `Edit ${tables[table]}`}
          </h2>
          <p className="text-sm text-slate-500">
            {mode === 'create' ? 'Create a new record below.' : `Updating record #${item.id}.`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(renderField)}
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => router.get(`/${locale}/admin/${table}`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X size={16} /> Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            >
              <Save size={16} />
              {processing ? 'Saving...' : `Save ${tables[table]}`}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
