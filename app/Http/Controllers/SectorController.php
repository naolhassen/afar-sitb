<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $sectors = Sector::orderBy('order', 'asc')->get();

        return Inertia::render('SectorsPage', [
            'locale' => $locale,
            'sectors' => $sectors,
        ]);
    }
}
