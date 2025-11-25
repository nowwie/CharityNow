<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CampaignController extends Controller
{
    public function index()
    {
        try {
            $campaigns = Campaign::all();
            
            return response()->json([
                'success' => true,
                'data' => $campaigns
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching campaigns: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch campaigns'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            Log::info('Campaign creation request', $request->all());

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
            $validated['slug'] = Str::slug($validated['title']);

         
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $path = $file->store('campaigns', 'public');
                $validated['image'] = $path;
                
                Log::info('Image uploaded', ['path' => $path]);
            }

           
            if (!isset($validated['status'])) {
                $validated['status'] = 'draft';
            }

            $campaign = Campaign::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Campaign berhasil dibuat',
                'data' => $campaign
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            Log::error('Campaign creation error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'Server error',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $campaign = Campaign::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $campaign
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Campaign tidak ditemukan'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $campaign = Campaign::findOrFail($id);

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

            
            if ($request->hasFile('image')) {
               
                if ($campaign->image && Storage::disk('public')->exists($campaign->image)) {
                    Storage::disk('public')->delete($campaign->image);
                }
                
                $path = $request->file('image')->store('campaigns', 'public');
                $validated['image'] = $path;
            }

            $campaign->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Campaign berhasil diupdate',
                'data' => $campaign
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Campaign tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Campaign update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $campaign = Campaign::findOrFail($id);

            if ($campaign->image && Storage::disk('public')->exists($campaign->image)) {
                Storage::disk('public')->delete($campaign->image);
            }

            $campaign->delete();

            return response()->json([
                'success' => true,
                'message' => 'Campaign berhasil dihapus'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Campaign tidak ditemukan'
            ], 404);
        }
    }
}