import React, { useState } from 'react';
import { Locale, PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import {
  Code2,
  Terminal,
  Database,
  Layers,
  Copy,
  Check,
  Download,
  BookOpen,
  ArrowRight,
  Server,
  Sparkles,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface LaravelArchitecturePageProps {
  currentLocale: Locale;
  onRouteChange: (route: PageRoute) => void;
}

export const LaravelArchitecturePage: React.FC<LaravelArchitecturePageProps> = ({
  currentLocale,
  onRouteChange
}) => {
  const [activeFileKey, setActiveFileKey] = useState<string>('routes');
  const [copied, setCopied] = useState<boolean>(false);

  const codeFiles: Record<
    string,
    { title: string; filename: string; language: string; description: string; code: string }
  > = {
    routes: {
      title: 'Laravel Web Routes',
      filename: 'routes/web.php',
      language: 'php',
      description: 'Trilingual URL prefixes ({locale}), Inertia page controllers, and admin auth middleware grouping.',
      code: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\HomeController;
use App\\Http\\Controllers\\NewsController;
use App\\Http\\Controllers\\EventController;
use App\\Http\\Controllers\\DirectorateController;
use App\\Http\\Controllers\\SectorController;
use App\\Http\\Controllers\\GalleryController;
use App\\Http\\Controllers\\PublicationController;
use App\\Http\\Controllers\\ContactController;
use App\\Http\\Controllers\\Admin\\AdminDashboardController;
use App\\Http\\Controllers\\Admin\\AdminNewsController;
use App\\Http\\Middleware\\SetLocale;

// Redirect root to default locale
Route::get('/', function () {
    return redirect('/en');
});

// Trilingual Public Routes (Afar, Amharic, English)
Route::prefix('{locale}')
    ->where(['locale' => 'en|am|af'])
    ->middleware([SetLocale::class])
    ->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::get('/about', [HomeController::class, 'about'])->name('about');
        Route::get('/directorates', [DirectorateController::class, 'index'])->name('directorates.index');
        Route::get('/sectors', [SectorController::class, 'index'])->name('sectors.index');
        
        // News & Events
        Route::get('/news', [NewsController::class, 'index'])->name('news.index');
        Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');
        Route::get('/events', [EventController::class, 'index'])->name('events.index');
        Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');
        
        // Media & Resources
        Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
        Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
        Route::get('/faq', [HomeController::class, 'faq'])->name('faq');
        Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
        Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
    });

// Admin Authentication & CRUD Console (Inertia + Sanctum)
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminDashboardController::class, 'loginView'])->name('admin.login');
    Route::post('/login', [AdminDashboardController::class, 'authenticate'])->name('admin.authenticate');

    Route::middleware(['auth:sanctum', 'verified'])->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'dashboard'])->name('admin.dashboard');
        Route::resource('news', AdminNewsController::class);
        Route::resource('events', \\App\\Http\\Controllers\\Admin\\AdminEventController::class);
        Route::resource('directorates', \\App\\Http\\Controllers\\Admin\\AdminDirectorateController::class);
        Route::resource('sectors', \\App\\Http\\Controllers\\Admin\\AdminSectorController::class);
        Route::resource('gallery', \\App\\Http\\Controllers\\Admin\\AdminGalleryController::class);
        Route::resource('publications', \\App\\Http\\Controllers\\Admin\\AdminPublicationController::class);
        Route::get('/messages', [ContactController::class, 'adminMessages'])->name('admin.messages');
        Route::post('/logout', [AdminDashboardController::class, 'logout'])->name('admin.logout');
    });
});`
    },
    home_controller: {
      title: 'Home Controller',
      filename: 'app/Http/Controllers/HomeController.php',
      language: 'php',
      description: 'Fetches models from SQLite/PostgreSQL and serves Inertia payloads seamlessly to React.',
      code: `<?php

namespace App\\Http\\Controllers;

use Inertia\\Inertia;
use Inertia\\Response;
use App\\Models\\News;
use App\\Models\\Event;
use App\\Models\\Directorate;
use App\\Models\\Sector;
use App\\Models\\Gallery;
use App\\Models\\Publication;
use App\\Models\\SiteSetting;
use Illuminate\\Http\\Request;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $locale = app()->getLocale();

        return Inertia::render('Home', [
            'news' => News::published()
                ->latest('published_at')
                ->take(3)
                ->get(),
            'events' => Event::published()
                ->where('start_date', '>=', now())
                ->orderBy('start_date', 'asc')
                ->take(2)
                ->get(),
            'directorates' => Directorate::orderBy('order', 'asc')->get(),
            'sectors' => Sector::orderBy('order', 'asc')->get(),
            'publications' => Publication::published()->latest()->take(3)->get(),
            'gallery' => Gallery::latest()->take(4)->get(),
            'siteSettings' => SiteSetting::first(),
            'locale' => $locale
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('About', [
            'siteSettings' => SiteSetting::first(),
            'directorates' => Directorate::orderBy('order', 'asc')->get()
        ]);
    }

    public function faq(): Response
    {
        return Inertia::render('Faq', [
            'faqs' => \\App\\Models\\Faq::orderBy('order', 'asc')->get()
        ]);
    }
}`
    },
    news_model: {
      title: 'News Eloquent Model & Trilingual Fallback',
      filename: 'app/Models/News.php',
      language: 'php',
      description: 'Eloquent model with localized accessor attributes (title, excerpt, content) supporting En -> Am -> Af cascade.',
      code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Support\\Str;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_af',
        'title_am',
        'title_en',
        'excerpt_af',
        'excerpt_am',
        'excerpt_en',
        'content_af',
        'content_am',
        'content_en',
        'cover_image',
        'published',
        'published_at'
    ];

    protected $casts = [
        'published' => 'boolean',
        'published_at' => 'datetime'
    ];

    protected $appends = ['title', 'excerpt', 'content'];

    // Scope for published news
    public function scopePublished($query)
    {
        return $query->where('published', true);
    }

    // Dynamic accessor resolving current app locale with fallback
    public function getTitleAttribute(): string
    {
        $locale = app()->getLocale();
        return match ($locale) {
            'af' => $this->title_af ?: ($this->title_en ?: $this->title_am),
            'am' => $this->title_am ?: ($this->title_en ?: $this->title_af),
            default => $this->title_en ?: ($this->title_am ?: $this->title_af),
        } ?? '';
    }

    public function getExcerptAttribute(): string
    {
        $locale = app()->getLocale();
        return match ($locale) {
            'af' => $this->excerpt_af ?: ($this->excerpt_en ?: $this->excerpt_am),
            'am' => $this->excerpt_am ?: ($this->excerpt_en ?: $this->excerpt_af),
            default => $this->excerpt_en ?: ($this->excerpt_am ?: $this->excerpt_af),
        } ?? '';
    }

    public function getContentAttribute(): string
    {
        $locale = app()->getLocale();
        return match ($locale) {
            'af' => $this->content_af ?: ($this->content_en ?: $this->content_am),
            'am' => $this->content_am ?: ($this->content_en ?: $this->content_af),
            default => $this->content_en ?: ($this->content_am ?: $this->content_af),
        } ?? '';
    }
}`
    },
    migration: {
      title: 'Database Schema Migration',
      filename: 'database/migrations/2026_01_01_000001_create_afar_sitb_tables.php',
      language: 'php',
      description: 'Database tables for News, Events, Directorates, Sectors, Gallery, Publications, Faqs, and Settings.',
      code: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. News Articles
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_af')->nullable();
            $table->string('title_am')->nullable();
            $table->string('title_en')->nullable();
            $table->text('excerpt_af')->nullable();
            $table->text('excerpt_am')->nullable();
            $table->text('excerpt_en')->nullable();
            $table->longText('content_af')->nullable();
            $table->longText('content_am')->nullable();
            $table->longText('content_en')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('published')->default(true);
            $table->timestamp('published_at')->useCurrent();
            $table->timestamps();
        });

        // 2. Events & Summits
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_af')->nullable();
            $table->string('title_am')->nullable();
            $table->string('title_en')->nullable();
            $table->text('description_af')->nullable();
            $table->text('description_am')->nullable();
            $table->text('description_en')->nullable();
            $table->string('location')->nullable();
            $table->string('cover_image')->nullable();
            $table->timestamp('start_date');
            $table->timestamp('end_date')->nullable();
            $table->boolean('published')->default(true);
            $table->timestamps();
        });

        // 3. Directorates
        Schema::create('directorates', function (Blueprint $table) {
            $table->id();
            $table->integer('order')->default(0);
            $table->string('name_af')->nullable();
            $table->string('name_am')->nullable();
            $table->string('name_en')->nullable();
            $table->text('description_af')->nullable();
            $table->text('description_am')->nullable();
            $table->text('description_en')->nullable();
            $table->timestamps();
        });

        // 4. Sectors / Services
        Schema::create('sectors', function (Blueprint $table) {
            $table->id();
            $table->integer('order')->default(0);
            $table->string('name_af')->nullable();
            $table->string('name_am')->nullable();
            $table->string('name_en')->nullable();
            $table->string('head_title_af')->nullable();
            $table->string('head_title_am')->nullable();
            $table->string('head_title_en')->nullable();
            $table->text('description_af')->nullable();
            $table->text('description_am')->nullable();
            $table->text('description_en')->nullable();
            $table->timestamps();
        });

        // 5. Gallery Items
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title_af')->nullable();
            $table->string('title_am')->nullable();
            $table->string('title_en')->nullable();
            $table->string('image_url');
            $table->enum('type', ['IMAGE', 'VIDEO'])->default('IMAGE');
            $table->timestamps();
        });

        // 6. Publications
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('title_af')->nullable();
            $table->string('title_am')->nullable();
            $table->string('title_en')->nullable();
            $table->text('description_af')->nullable();
            $table->text('description_am')->nullable();
            $table->text('description_en')->nullable();
            $table->string('file_url');
            $table->string('cover_image')->nullable();
            $table->boolean('published')->default(true);
            $table->timestamps();
        });

        // 7. Contact Messages
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        // 8. Site Settings
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->text('mission_af')->nullable();
            $table->text('mission_am')->nullable();
            $table->text('mission_en')->nullable();
            $table->text('vision_af')->nullable();
            $table->text('vision_am')->nullable();
            $table->text('vision_en')->nullable();
            $table->text('values_af')->nullable();
            $table->text('values_am')->nullable();
            $table->text('values_en')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('address_en')->nullable();
            $table->string('bureau_head_name')->nullable();
            $table->text('bureau_head_msg_en')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('publications');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('sectors');
        Schema::dropIfExists('directorates');
        Schema::dropIfExists('events');
        Schema::dropIfExists('news');
    }
};`
    },
    inertia_middleware: {
      title: 'Inertia Request Middleware & Locale Shared State',
      filename: 'app/Http/Middleware/HandleInertiaRequests.php',
      language: 'php',
      description: 'Injects locale, flash messages, user auth, and trilingual translations into every React page automatically.',
      code: `<?php

namespace App\\Http\\Middleware;

use Illuminate\\Http\\Request;
use Inertia\\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role ?? 'ADMIN',
                ] : null,
            ],
            'locale' => app()->getLocale(),
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}`
    },
    react_entry: {
      title: 'Inertia React Frontend Setup',
      filename: 'resources/js/app.tsx',
      language: 'typescript',
      description: 'Initializes Inertia React app with Vite hot-reload, layout mounting, and progress bar.',
      code: `import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Afar SITB';

createInertiaApp({
    title: (title) => \`\${title} - \${appName}\`,
    resolve: (name) => resolvePageComponent(\`./Pages/\${name}.tsx\`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#2563eb',
        showSpinner: true,
    },
});`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeFiles[activeFileKey].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PageHero
        title="Laravel + Inertia.js + React Migration Blueprint"
        subtitle="Complete architectural conversion specifications from the original Next.js/Prisma codebase to Laravel 11, Inertia.js v2, and React 19."
        badge="Enterprise Framework Conversion"
        breadcrumbs={[{ label: 'Laravel Migration Guide' }]}
        onRouteChange={onRouteChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* 1. Architecture Flow Diagram */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Full-Stack Architecture Transformation
              </h2>
              <p className="text-xs text-slate-400">
                How client requests flow from Laravel routes to React page components.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-400 uppercase">Layer 01</span>
                <Server size={18} className="text-red-400" />
              </div>
              <h4 className="text-base font-bold text-white">Laravel 11 Backend</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manages trilingual routing (<code className="text-red-300">/{'{locale}'}/...</code>), Sanctum authentication, Eloquent models, and PostgreSQL migrations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-purple-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 uppercase">Layer 02</span>
                <Sparkles size={18} className="text-purple-400" />
              </div>
              <h4 className="text-base font-bold text-white">Inertia.js v2 Protocol</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects PHP controllers to React seamlessly using <code className="text-purple-300">Inertia::render()</code> without needing custom REST/GraphQL boilerplate.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-blue-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase">Layer 03</span>
                <Code2 size={18} className="text-blue-400" />
              </div>
              <h4 className="text-base font-bold text-white">React 19 Frontend</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Client-side UI components with TypeScript, Tailwind CSS, Lucide icons, and trilingual fallbacks (Afar, Amharic, English).
              </p>
            </div>
          </div>
        </div>

        {/* 2. Interactive Code Inspector */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* File Picker Bar */}
          <div className="flex items-center gap-2 overflow-x-auto p-4 bg-slate-950 border-b border-slate-800">
            {Object.entries(codeFiles).map(([key, file]) => {
              const isActive = activeFileKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFileKey(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Code2 size={13} />
                  <span>{file.filename}</span>
                </button>
              );
            })}
          </div>

          {/* Active File Header */}
          <div className="p-6 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">
                {codeFiles[activeFileKey].title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {codeFiles[activeFileKey].description}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 self-start sm:self-auto"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Viewer Box */}
          <div className="p-6 bg-slate-950 font-mono text-xs overflow-x-auto leading-relaxed text-slate-200">
            <pre>
              <code>{codeFiles[activeFileKey].code}</code>
            </pre>
          </div>
        </div>

        {/* 3. Step-by-Step CLI Execution Checklist */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <Terminal size={24} className="text-emerald-400" />
            <h3 className="text-xl font-bold text-white">
              Laravel CLI Deployment Quick-Start Commands
            </h3>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-500 font-sans font-bold">1. Create Fresh Laravel 11 Project & Inertia dependencies:</span>
              <p className="text-emerald-400">composer create-project laravel/laravel afar-sitb-laravel</p>
              <p className="text-emerald-400">composer require inertiajs/inertia-laravel</p>
              <p className="text-emerald-400">npm install @inertiajs/react react react-dom lucide-react</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-500 font-sans font-bold">2. Run Migrations and Seed Initial Data:</span>
              <p className="text-emerald-400">php artisan migrate</p>
              <p className="text-emerald-400">php artisan db:seed --class=AfarSitbSeeder</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-500 font-sans font-bold">3. Launch Dev Server (Vite + Artisan):</span>
              <p className="text-emerald-400">composer run dev</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => onRouteChange('home')}
              className="cg-gradient-btn px-6 py-3 rounded-xl text-white font-bold text-xs shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Public Portal</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
