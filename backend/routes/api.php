<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;

Route::options('{any}', function () {
    return response('', 200);
})->where('any', '.*');

// =======================
// AUTH
// =======================
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// =======================
// PUBLIC CAMPAIGNS
// =======================
Route::get('/campaigns', [CampaignController::class, 'index']);

// =======================
// PROTECTED ROUTES
// =======================
Route::middleware('auth:sanctum')->group(function () {

    // ADMIN CAMPAIGN CRUD
    Route::post('/campaigns', [CampaignController::class, 'store']);
    Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
    Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);

    // ADMIN DONATIONS
    Route::post('/admin/donations', [DonasiController::class, 'adminStore']);
    Route::get('/admin/donations', [DonasiController::class, 'index']);

    // USER DONATIONS
    Route::post('/donations', [DonasiController::class, 'store']);

    // USER INFO
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});
