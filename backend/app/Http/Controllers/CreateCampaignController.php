<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CampaignService;
use Illuminate\Http\Request;

class CreateCampaignController extends Controller
{
    public function __invoke(Request $request, CampaignService $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'location' => 'nullable|string',
            'target_amount' => 'required|integer|min:1',
            'status' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:5120'
        ]);

        return response()->json($service->create($validated, $request), 201);
    }
}
