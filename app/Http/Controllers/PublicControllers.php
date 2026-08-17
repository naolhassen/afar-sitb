<?php

namespace App\Http\Controllers;

use App\Models\Directorate;
use App\Models\Sector;
use App\Models\Gallery;
use App\Models\Publication;
use App\Models\ContactMessage;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DirectorateController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $directorates = Directorate::orderBy('order', 'asc')->get();

        return Inertia::render('Directorates/Index', [
            'locale' => $locale,
            'directorates' => $directorates,
        ]);
    }
}

class SectorController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $sectors = Sector::orderBy('order', 'asc')->get();

        return Inertia::render('Sectors/Index', [
            'locale' => $locale,
            'sectors' => $sectors,
        ]);
    }
}

class GalleryController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $items = Gallery::latest()->get();

        return Inertia::render('Gallery/Index', [
            'locale' => $locale,
            'items' => $items,
        ]);
    }
}

class PublicationController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $category = $request->query('category');
        $query = Publication::latest('published_at');

        if ($category && $category !== 'All') {
            $query->where('file_type', $category);
        }

        $publications = $query->paginate(12)->withQueryString();

        return Inertia::render('Publications/Index', [
            'locale' => $locale,
            'publications' => $publications,
        ]);
    }
}

class ContactController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $settings = SiteSetting::first();

        return Inertia::render('Contact/Index', [
            'locale' => $locale,
            'settings' => $settings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Message received successfully!');
    }
}
