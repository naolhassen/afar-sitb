<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'title_aa',
        'title_am',
        'title_en',
        'content_aa',
        'content_am',
        'content_en',
        'category',
        'image_url',
        'gallery',
        'published_at',
        'author',
        'views_count',
        'is_featured',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'views_count' => 'integer',
        'gallery' => 'array',
    ];
}
