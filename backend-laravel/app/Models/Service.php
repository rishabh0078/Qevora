<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'description',
        'features',
        'icon',
        'order'
    ];

    protected $casts = [
        'features' => 'array'
    ];
}
