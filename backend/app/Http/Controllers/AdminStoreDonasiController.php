<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\DonasiService;
use Illuminate\Http\Request;

class AdminStoreDonasiController extends Controller
{
    public function __invoke(Request $request, DonasiService $service)
    {
        $validated = $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'user_id' => 'nullable|exists:users,id',
            'amount' => 'required|integer|min:1000',
            'payment_method' => 'required|string',
            'message' => 'nullable|string',
            'status' => 'required|string',
        ]);

        $campaign = Campaign::findOrFail($validated['campaign_id']);
        if ($campaign->status === 'closed') {
            return response()->json([
                'success' => false,
                'message' => 'Campaign sudah ditutup dan tidak bisa menerima donasi.'
            ], 403);
        }

        $result = $service->adminStore($validated, $request->user()->id);

        return response()->json($result, 201);
    }


}
