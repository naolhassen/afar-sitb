<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\DirectorateController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\ContactController;
use App\Http\Middleware\SetLocale;

// Root redirect to default locale
Route::get('/', function () {
    return redirect('/en');
});

// Trilingual routes with locale parameter (en, am, aa)
Route::prefix('{locale}')
    ->where(['locale' => 'en|am|aa'])
    ->middleware([SetLocale::class])
    ->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::get('/about', fn ($locale) => inertia('About', ['locale' => $locale]))->name('about');
        
        Route::get('/news', [NewsController::class, 'index'])->name('news.index');
        Route::get('/news/{id}', [NewsController::class, 'show'])->name('news.show');

        Route::get('/events', [EventController::class, 'index'])->name('events.index');
        Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');

        Route::get('/directorates', [DirectorateController::class, 'index'])->name('directorates.index');
        Route::get('/sectors', [SectorController::class, 'index'])->name('sectors.index');
        Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
        Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
        Route::get('/faq', fn ($locale) => inertia('Faq', ['locale' => $locale]))->name('faq.index');
        Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
        Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

        // Admin Routes
        Route::prefix('admin')->group(function () {
            Route::get('/', fn ($locale) => inertia('Admin/Dashboard', ['locale' => $locale]))->name('admin.dashboard');
        });
    });
