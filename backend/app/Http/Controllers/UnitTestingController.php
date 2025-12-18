<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Services\DonasiService;
use App\Models\Campaign;

class UnitTestingController extends Controller
{

    public function testStoreDonasi()
    {
        $service = new DonasiService(); // instance method yang diuji

        // Jalur 1: campaign closed
        $result1 = $service->storeUserDonasi([
            'campaign_id' => 6,
            'amount' => 5000,
            'payment_method' => 'transfer',
            'message' => 'Tes campaign closed'
        ], 1);

        // Jalur 2: campaign masih aktif
        $result2 = $service->storeUserDonasi([
            'campaign_id' => 14, // ID campaign dummy jalur 2
            'amount' => 1000,
            'payment_method' => 'transfer',
            'message' => 'Uji jalur 2'
        ], 1);

        //jalur 3: donasi berhasil, terget blm tercapai
        $result3 = $service->storeUserDonasi([
            'campaign_id' => 16,   
            'amount' => 1000,      // 20000 + 1000 = 21000 < 100000
            'payment_method' => 'transfer',
            'message' => 'Uji Jalur 3'
        ], 1);

        //jalur 4: donasi berhasil, target tercapai
        $result4 = $service->storeUserDonasi([
            'campaign_id' => 17,
            'amount' => 60000,
            'payment_method' => 'transfer',
            'message' => 'Jalur 4'
        ], 1);

        $campaignAfter = Campaign::find(16);
        $campaignAfter2 = Campaign::find(17);

        return response()->json([
            'jalur_1' => $result1,
            'jalur_2' => $result2,
            'jalur_3' => [
                'response' => $result3,
                'campaign_status' => $campaignAfter->status
            ],
            'jalur_4' => [
                'response' => $result4,
                'campaign_status' => $campaignAfter2->status
            ]
        ]);
    }

}