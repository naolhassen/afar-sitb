<?php

namespace App\Http\Controllers;

use App\Models\Directorate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DirectorateController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $directorates = Directorate::orderBy('order', 'asc')->get();

        return Inertia::render('DirectoratesPage', [
            'locale' => $locale,
            'directorates' => $directorates,
        ]);
    }
}
