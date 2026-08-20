import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export const LoginPage: React.FC = () => {
  const { locale } = usePage().props as { locale: string };
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/${locale}/admin/login`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white">Afar SITB Admin</h1>
          <p className="text-xs text-slate-400">Authorized personnel only</p>
        </div>

        {errors.email && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xl">
            {errors.email}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Email</label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <input
              type="password"
              required
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-[1.01] transition-all disabled:opacity-60"
          >
            {processing ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
