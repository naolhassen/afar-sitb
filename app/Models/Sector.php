<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_aa',
        'name_am',
        'name_en',
        'description_aa',
        'description_am',
        'description_en',
        'icon',
        'initiatives',
        'order',
    ];

    protected $casts = [
        'initiatives' => 'array',
        'order' => 'integer',
    ];
}
