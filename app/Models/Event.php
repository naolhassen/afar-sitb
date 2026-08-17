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
}
