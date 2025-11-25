<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'location',
        'target_amount',
        'status',
        'start_date',
        'end_date',
        'image'
    ];

    protected $casts = [
        'target_amount' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    protected $appends = ['progress'];

    public function getProgressAttribute()
    {
        if (!$this->target_amount)
            return 0;
        return round(($this->collected_amount / $this->target_amount) * 100);
    }



}