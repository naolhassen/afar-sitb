<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $upcomingEvents = Event::where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->get();

        $pastEvents = Event::where('date', '<', now()->toDateString())
            ->orderBy('date', 'desc')
            ->paginate(6);

        return Inertia::render('EventsPage', [
            'locale' => $locale,
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
        ]);
    }

    public function show(Request $request, string $locale, int $id): Response
    {
        $event = Event::findOrFail($id);

        return Inertia::render('EventDetailPage', [
            'locale' => $locale,
            'event' => $event,
        ]);
    }
}
