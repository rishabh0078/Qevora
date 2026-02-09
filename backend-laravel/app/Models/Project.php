<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'image',
        'gallery',
        'featured',
        'link'
    ];

    protected $casts = [
        'gallery' => 'array',
        'featured' => 'boolean'
    ];
}
