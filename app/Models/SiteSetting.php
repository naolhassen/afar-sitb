<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title_aa',
        'hero_title_am',
        'hero_title_en',
        'hero_subtitle_aa',
        'hero_subtitle_am',
        'hero_subtitle_en',
        'about_text_aa',
        'about_text_am',
        'about_text_en',
        'mission_aa',
        'mission_am',
        'mission_en',
        'vision_aa',
        'vision_am',
        'vision_en',
        'values_aa',
        'values_am',
        'values_en',
        'stats',
        'contact_phone',
        'contact_email',
        'contact_address',
        'working_hours',
        'social_links',
    ];

    protected $casts = [
        'stats' => 'array',
        'social_links' => 'array',
    ];
}
