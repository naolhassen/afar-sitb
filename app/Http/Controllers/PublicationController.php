<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

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

        return Inertia::render('PublicationsPage', [
            'locale' => $locale,
            'publications' => $publications,
        ]);
    }

    public function show(Request $request, string $locale, int $id): Response
    {
        $publication = Publication::findOrFail($id);

        return Inertia::render('PublicationDetailPage', [
            'locale' => $locale,
            'publication' => $publication,
        ]);
    }
}
