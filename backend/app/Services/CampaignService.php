<?php

namespace App\Services;

use App\Models\Campaign;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CampaignService
{
    public function getAll()
    {
        try {
            $campaigns = Campaign::all();
            return [
                'success' => true,
                'data' => $campaigns
            ];
        } catch (\Exception $e) {
            Log::error('Error fetching campaigns: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Failed to fetch campaigns'
            ];
        }
    }

    public function create($data, $request)
    {
        try {
            Log::info('Campaign creation request', $data);

            $data['slug'] = Str::slug($data['title']);

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('campaigns', 'public');
            }

            if (!isset($data['status'])) {
                $data['status'] = 'draft';
            }

            $campaign = Campaign::create($data);

            return [
                'success' => true,
                'message' => 'Campaign berhasil dibuat',
                'data' => $campaign
            ];

        } catch (\Exception $e) {
            Log::error('Campaign creation error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Server error',
                'error' => $e->getMessage()
            ];
        }
    }

    public function findById($id)
    {
        $campaign = Campaign::find($id);

        if (!$campaign) {
            return [
                'success' => false,
                'message' => 'Campaign tidak ditemukan'
            ];
        }

        return [
            'success' => true,
            'data' => $campaign
        ];
    }

    public function update($id, $data, $request)
    {
        $campaign = Campaign::find($id);

        if (!$campaign) {
            return [
                'success' => false,
                'message' => 'Campaign tidak ditemukan'
            ];
        }

        if ($request->hasFile('image')) {
            if ($campaign->image && Storage::disk('public')->exists($campaign->image)) {
                Storage::disk('public')->delete($campaign->image);
            }
            $data['image'] = $request->file('image')->store('campaigns', 'public');
        }

        $campaign->update($data);

        return [
            'success' => true,
            'message' => 'Campaign berhasil diupdate',
            'data' => $campaign
        ];
    }

    public function delete($id)
    {
        $campaign = Campaign::find($id);

        if (!$campaign) {
            return [
                'success' => false,
                'message' => 'Campaign tidak ditemukan'
            ];
        }

        if ($campaign->image && Storage::disk('public')->exists($campaign->image)) {
            Storage::disk('public')->delete($campaign->image);
        }

        $campaign->delete();

        return [
            'success' => true,
            'message' => 'Campaign berhasil dihapus'
        ];
    }
}
