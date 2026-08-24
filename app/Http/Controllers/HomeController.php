<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Event;
use App\Models\Directorate;
use App\Models\Sector;
use App\Models\Publication;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        app()->setLocale($locale);

        $featuredNews = News::where('is_featured', true)
            ->latest('published_at')
            ->take(4)
            ->get();

        $latestNews = News::latest('published_at')
            ->take(6)
            ->get();

        $upcomingEvents = Event::where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->take(3)
            ->get();

        $sectors = Sector::orderBy('order', 'asc')->get();
        $directorates = Directorate::orderBy('order', 'asc')->take(6)->get();
        $settings = SiteSetting::first();
        $publications = Publication::latest('published_at')->take(4)->get();

        return Inertia::render('HomePage', [
            'locale' => $locale,
            'featuredNews' => $featuredNews,
            'latestNews' => $latestNews,
            'upcomingEvents' => $upcomingEvents,
            'sectors' => $sectors,
            'directorates' => $directorates,
            'settings' => $settings,
            'publications' => $publications,
        ]);
    }
}
