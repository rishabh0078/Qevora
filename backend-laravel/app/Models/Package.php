<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'features',
        'featured',
        'order'
    ];

    protected $casts = [
        'features' => 'array',
        'featured' => 'boolean'
    ];
}
