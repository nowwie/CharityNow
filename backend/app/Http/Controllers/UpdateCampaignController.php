<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CampaignService;
use Illuminate\Http\Request;

class UpdateCampaignController extends Controller
{
    public function __invoke(Request $request, $id, CampaignService $service)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string',
            'location' => 'nullable|string',
            'target_amount' => 'sometimes|integer|min:1',
            'status' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:5120'
        ]);

        return response()->json($service->update($id, $validated, $request));
    }
}
