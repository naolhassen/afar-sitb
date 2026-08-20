<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(string $locale = 'en'): Response
    {
        $settings = SiteSetting::first();

        return Inertia::render('AboutPage', [
            'locale' => $locale,
            'settings' => $settings,
        ]);
    }
}
