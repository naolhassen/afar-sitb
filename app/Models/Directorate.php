<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Directorate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_aa',
        'name_am',
        'name_en',
        'description_aa',
        'description_am',
        'description_en',
        'director_name_aa',
        'director_name_am',
        'director_name_en',
        'director_title_aa',
        'director_title_am',
        'director_title_en',
        'director_image',
        'director_phone',
        'director_email',
        'services',
        'order',
    ];

    protected $casts = [
        'services' => 'array',
        'order' => 'integer',
    ];
}
