<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Models\Donasi;

Route::options('{any}', function () {
    return response('', 200);
})->where('any', '.*');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/campaigns', [CampaignController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {


    Route::post('/campaigns', [CampaignController::class, 'store']);
    Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
    Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);


    Route::post('/admin/donations', [DonasiController::class, 'adminStore']);
    Route::get('/admin/donations', [DonasiController::class, 'index']);


    Route::post('/donations', [DonasiController::class, 'store']);


    Route::get('/me', function (Request $request) {
        $user = $request->user();

        $totalDonation = Donasi::where('user_id', $user->id)
            ->where('status', 'success')
            ->sum('amount');

 
        $totalCampaign = Donasi::where('user_id', $user->id)
            ->distinct('campaign_id')
            ->count('campaign_id');

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'joinDate' => $user->created_at->format('d M Y'),
            'totalDonation' => $totalDonation,
            'totalCampaign' => $totalCampaign,
        ]);
    });
});

Route::middleware('auth:sanctum')->get('/my-donations', [DonasiController::class, 'myDonations']);

