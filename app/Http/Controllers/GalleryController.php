<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $items = Gallery::latest()->get();

        return Inertia::render('GalleryPage', [
            'locale' => $locale,
            'items' => $items,
        ]);
    }
}
