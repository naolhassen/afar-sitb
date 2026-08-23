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
        app()->setLocale($locale);

        $upcomingEvents = Event::where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn ($event) => $this->transformEvent($event, $locale));

        $pastEvents = Event::where('date', '<', now()->toDateString())
            ->orderBy('date', 'desc')
            ->get()
            ->map(fn ($event) => $this->transformEvent($event, $locale));

        return Inertia::render('EventsPage', [
            'locale' => $locale,
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
        ]);
    }

    public function show(Request $request, string $locale, int $id): Response
    {
        app()->setLocale($locale);

        $event = Event::findOrFail($id);

        return Inertia::render('EventDetailPage', [
            'locale' => $locale,
            'event' => $this->transformEvent($event, $locale),
        ]);
    }

    private function transformEvent(Event $event, string $locale): array
    {
        $data = $event->toArray();
        $data['startDate'] = $event->date;
        $data['endDate'] = $event->date;

        $suffix = match ($locale) {
            'am' => 'am',
            'af' => 'aa',
            default => 'en',
        };
        $data['location'] = $event->{"location_{$suffix}"} ?? $event->location_en;

        return $data;
    }
}
