<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donasi extends Model
{
    use HasFactory;

    protected $table = 'donations';
    protected $fillable = [
        'campaign_id',
        'user_id',
        'amount',
        'payment_method',
        'message',
        'status',
    ];


    public function campaign(){
        return $this->belongsTo(Campaign::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
