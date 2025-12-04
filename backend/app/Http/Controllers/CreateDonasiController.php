<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DonasiService;

class CreateDonasiController extends Controller
{
    public function __invoke(Request $request, DonasiService $service)
    {
        $validated = $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'amount' => 'required|integer|min:1000',
            'payment_method' => 'required|string',
            'message' => 'nullable|string'
        ]);

        $result = $service->storeUserDonasi($validated, $request->user()->id);
        return response()->json($result);
    }
}
