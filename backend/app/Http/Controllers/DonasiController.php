<?php

namespace App\Http\Controllers;

use App\Models\Donasi;
use Illuminate\Http\Request;
use App\Application\UseCases\CreateDonasiUseCase;
use App\Models\Campaign;

class DonasiController extends Controller
{
    public function adminStore(Request $request)
    {
        $validated = $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'user_id' => 'nullable|exists:users,id',
            'amount' => 'required|integer|min:1000',
            'payment_method' => 'required|string',
            'message' => 'nullable|string',
            'status' => 'required|string'
        ]);

        $donasi = Donasi::create([
            'campaign_id' => $validated['campaign_id'],
            'user_id' => auth()->id(),
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'message' => $validated['message'] ?? null,
            'status' => $validated['status'],
        ]);

        $campaign = Campaign::find($validated['campaign_id']);
        $campaign->collected_amount += $validated['amount'];
        $campaign->save();


        return response()->json([
            "message" => "Donasi berhasil ditambahkan",
            "donasi" => $donasi
        ], 201);
    }

    public function myDonations(Request $request)
    {
        $donations = Donasi::with('campaign')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $donations
        ]);
    }


}
