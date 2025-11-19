<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;

class CampaignController extends Controller
{
    // GET /api/campaigns
    public function index()
    {
        return response()->json([
            'data' => Campaign::all()
        ]);
    }

    // POST /api/campaigns
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'nullable|string',
            'target_amount' => 'required|numeric|min:1000',
            'image' => 'nullable|string',
        ]);
    
        // Set default values handled automatically by DB:
        // collected_amount = 0
        // status = aktif
    
        $campaign = Campaign::create($validated);
    
        return response()->json([
            'message' => 'Campaign created successfully',
            'data' => $campaign
        ], 201);
    }


    // GET /api/campaigns/{id}
    public function show($id)
    {
        return Campaign::findOrFail($id);
    }

    // PUT /api/campaigns/{id}
    public function update(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);
        $campaign->update($request->all());

        return response()->json([
            'message' => 'Campaign updated',
            'data' => $campaign
        ]);
    }

    // DELETE /api/campaigns/{id}
    public function destroy($id)
    {
        $campaign = Campaign::findOrFail($id);
        $campaign->delete();

        return response()->json([
            'message' => 'Campaign deleted'
        ]);
    }
}
