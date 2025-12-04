<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Donasi;

class AdminListDonasiController extends Controller
{
    public function __invoke()
    {
        $donations = Donasi::with(['campaign', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $donations
        ]);
    }

}
