<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(string $locale = 'en'): Response
    {
        $faqs = Faq::orderBy('order', 'asc')->get();

        return Inertia::render('FaqPage', [
            'locale' => $locale,
            'faqs' => $faqs,
        ]);
    }
}
