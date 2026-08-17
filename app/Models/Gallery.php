<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $table = 'galleries';

    protected $fillable = [
        'title_aa',
        'title_am',
        'title_en',
        'image_url',
        'category',
        'type',
    ];
}
