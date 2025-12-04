<?php

use App\Http\Controllers\AdminListDonasiController;
use App\Http\Controllers\CreateDonasiController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\CreateCampaignController;
use App\Http\Controllers\DeleteCampaignController;
use App\Http\Controllers\AdminStoreDonasiController;
use App\Http\Controllers\RiwayatDonasiController;
use App\Http\Controllers\GetAllCampaignController;
use App\Http\Controllers\GetCampaignController;
use App\Http\Controllers\UpdateCampaignController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\UpdateProfileController;

use App\Http\Controllers\CampaignController;
use App\Models\Donasi;

Route::options('{any}', function () {
    return response('', 200);
})->where('any', '.*');

Route::post('/login', LoginController::class);
Route::post('/register', RegisterController::class);
Route::middleware('auth:sanctum')->put('/update-profile', UpdateProfileController::class);
Route::middleware('auth:sanctum')->post('/logout', LogoutController::class);

Route::get('/campaigns', GetAllCampaignController::class);

Route::middleware('auth:sanctum')->group(function () {


    Route::post('/campaigns', CreateCampaignController::class);
    Route::get('/campaigns/{id}', GetCampaignController::class);
    Route::put('/campaigns/{id}', UpdateCampaignController::class);
    Route::delete('/campaigns/{id}', DeleteCampaignController::class);


    Route::post('/admin/donations', AdminStoreDonasiController::class);
    Route::get('/admin/donations', AdminListDonasiController::class);


    Route::post('/donations', CreateDonasiController::class);


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

Route::middleware('auth:sanctum')->get('/my-donations', RiwayatDonasiController::class);