<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_aa',
        'title_am',
        'title_en',
        'description_aa',
        'description_am',
        'description_en',
        'file_url',
        'file_size',
        'file_type',
        'published_at',
        'downloads_count',
    ];

    protected $casts = [
        'published_at' => 'date',
        'downloads_count' => 'integer',
    ];

    protected $appends = ['publishedAt'];

    public function getPublishedAtAttribute(): ?string
    {
        $value = $this->attributes['published_at'] ?? null;
        return $value ? Carbon::parse($value)->toIso8601String() : null;
    }
}
