<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $settings = SiteSetting::first();

        return Inertia::render('ContactPage', [
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
