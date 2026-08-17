<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\News;
use App\Models\Event;
use App\Models\Directorate;
use App\Models\Sector;
use App\Models\Publication;
use App\Models\Gallery;
use App\Models\SiteSetting;

Route::get('/news', fn () => News::latest('published_at')->paginate(12));
Route::get('/news/{id}', fn ($id) => News::findOrFail($id));
Route::get('/events', fn () => Event::orderBy('date', 'asc')->get());
Route::get('/directorates', fn () => Directorate::orderBy('order', 'asc')->get());
Route::get('/sectors', fn () => Sector::orderBy('order', 'asc')->get());
Route::get('/publications', fn () => Publication::latest('published_at')->get());
Route::get('/gallery', fn () => Gallery::latest()->get());
Route::get('/settings', fn () => SiteSetting::first());
