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
use App\Http\Controllers\AboutController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminLoginController;
use App\Http\Middleware\SetLocale;
use App\Http\Middleware\AdminMiddleware;

// Public trilingual login redirect (used by auth middleware)
Route::get('/login/{locale?}', function ($locale = 'en') {
    return redirect("/{$locale}/admin/login");
})->name('login')->where(['locale' => 'en|am|af']);

// Root redirect to default locale
Route::get('/', function () {
    return redirect('/en');
});

// Trilingual routes with locale parameter (en, am, af)
Route::prefix('{locale}')
    ->where(['locale' => 'en|am|af'])
    ->middleware([SetLocale::class])
    ->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::get('/about', [AboutController::class, 'index'])->name('about');
        
        Route::get('/news', [NewsController::class, 'index'])->name('news.index');
        Route::get('/news/{id}', [NewsController::class, 'show'])->name('news.show');

        Route::get('/events', [EventController::class, 'index'])->name('events.index');
        Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');

        Route::get('/directorates', [DirectorateController::class, 'index'])->name('directorates.index');
        Route::get('/sectors', [SectorController::class, 'index'])->name('sectors.index');
        Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
        Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
        Route::get('/faq', [FaqController::class, 'index'])->name('faq.index');
        Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
        Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

        // Admin Routes
        Route::prefix('admin')->group(function () {
            Route::get('/login', [AdminLoginController::class, 'show'])->name('admin.login');
            Route::post('/login', [AdminLoginController::class, 'login'])->name('admin.login.post');
            Route::post('/logout', [AdminLoginController::class, 'logout'])->name('admin.logout')->middleware('auth');

            Route::middleware(['auth', AdminMiddleware::class])->group(function () {
                Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
                Route::post('/upload', [AdminController::class, 'upload'])->name('admin.upload');

                $tablePattern = 'news|events|directorates|sectors|gallery|publications|settings|messages';

                Route::get('/{table}/create', [AdminController::class, 'create'])->name('admin.create')->where('table', $tablePattern);
                Route::get('/{table}/{id}/edit', [AdminController::class, 'edit'])->name('admin.edit')->where('table', $tablePattern)->where('id', '\d+');
                Route::get('/{table}', [AdminController::class, 'table'])->name('admin.table')->where('table', $tablePattern);
                Route::post('/{table}', [AdminController::class, 'store'])->name('admin.store')->where('table', $tablePattern);
                Route::put('/{table}/{id}', [AdminController::class, 'update'])->name('admin.update')->where('table', $tablePattern)->where('id', '\d+');
                Route::delete('/{table}/{id}', [AdminController::class, 'destroy'])->name('admin.destroy')->where('table', $tablePattern)->where('id', '\d+');
            });
        });
    });
