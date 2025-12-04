<?php

namespace App\Services;

use App\Models\Donasi;
use App\Models\Campaign;

class DonasiService
{
    public function adminStore(array $data, $adminId)
    {
        $campaign = Campaign::findOrFail($data['campaign_id']);

        if ($campaign->status === 'closed' || $campaign->status === 'distributed') {
            return [
                'success' => false,
                'message' => 'Campaign ini sudah ditutup.'
            ];
        }

        if ($campaign->collected_amount >= $campaign->target_amount) {
            return [
                'success' => false,
                'message' => 'Campaign sudah mencapai target dan tidak bisa menerima donasi.'
            ];
        }

        $donasi = Donasi::create([
            'campaign_id' => $data['campaign_id'],
            'user_id' => $adminId,
            'amount' => $data['amount'],
            'payment_method' => $data['payment_method'],
            'message' => $data['message'] ?? null,
            'status' => $data['status'],
        ]);

        $campaign = Campaign::find($data['campaign_id']);
        $campaign->collected_amount += $data['amount'];
        if ($campaign->collected_amount >= $campaign->target_amount) {
            $campaign->status = 'closed';
        }

        $campaign->save();

        return [
            "message" => "Donasi berhasil ditambahkan",
            "donasi" => $donasi
        ];
    }

    public function storeUserDonasi(array $data, $userId)
    {
        $campaign = Campaign::findOrFail($data['campaign_id']);

        if ($campaign->status === 'closed' || $campaign->status === 'distributed') {
            return ['success' => false, 'message' => 'Campaign ini sudah ditutup.'];
        }

        if ($campaign->collected_amount >= $campaign->target_amount) {
            return ['success' => false, 'message' => 'Campaign sudah mencapai target.'];
        }

        $donasi = Donasi::create([
            'campaign_id' => $data['campaign_id'],
            'user_id' => $userId,
            'amount' => $data['amount'],
            'payment_method' => $data['payment_method'],
            'message' => $data['message'] ?? null,
            'status' => 'pending',
        ]);

        $campaign->collected_amount += $data['amount'];
        if ($campaign->collected_amount >= $campaign->target_amount) {
            $campaign->status = 'closed';
        } 
        $campaign->save();

        return [
            'success' => true,
            'message' => 'Donasi berhasil dilakukan.',
            'donasi' => $donasi
        ];
    }

    public function myDonations($userId)
    {

        $donations = Donasi::with('campaign')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return [
            'success' => true,
            'data' => $donations
        ];
    }
}
