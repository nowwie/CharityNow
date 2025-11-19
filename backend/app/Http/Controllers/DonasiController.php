<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Application\UseCases\CreateDonasiUseCase;

class DonasiController extends Controller
{
    public function store(Request $request, CreateDonasiUseCase $useCase)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'campaign_id' => 'required|integer',
            'amount' => 'required|numeric|min:1000',
            'message' => 'nullable|string',
            'payment_method' => 'required|string',
        ]);

        // Default status
        $validated['status'] = 'pending';

        $donasi = $useCase->execute($validated);

        return response()->json([
            'message' => 'Donasi berhasil dibuat!',
            'data' => $donasi
        ], 201);
    }
}
