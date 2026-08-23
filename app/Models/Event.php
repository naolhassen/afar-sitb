<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_aa',
        'title_am',
        'title_en',
        'description_aa',
        'description_am',
        'description_en',
        'date',
        'time',
        'location_aa',
        'location_am',
        'location_en',
        'image_url',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    protected $appends = ['startDate', 'endDate', 'location'];

    public function getStartDateAttribute(): ?string
    {
        return $this->date;
    }

    public function getEndDateAttribute(): ?string
    {
        return $this->date;
    }

    public function getLocationAttribute(): ?string
    {
        $locale = app()->getLocale();
        $suffix = match ($locale) {
            'am' => 'am',
            'af' => 'aa',
            default => 'en',
        };
        return $this->attributes["location_{$suffix}"] ?? $this->attributes['location_en'] ?? null;
    }
}
