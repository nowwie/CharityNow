<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table = 'campaigns';

    protected $fillable = [
        'title',
        'description',
        'category',
        'target_amount',
        'collected_amount',
        'status',
        'image',
    ];
}
