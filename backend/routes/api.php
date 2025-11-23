<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;

Route::options('{any}', function () {
    return response('', 200);
})->where('any', '.*');

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// ===== CAMPAIGNS =====

// PUBLIC — FE GET DATA
Route::get('/campaigns', [CampaignController::class, 'index']);

// ADMIN — ADD / EDIT CAMPAIGNS
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/campaigns', [CampaignController::class, 'store']);
    Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
    Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);
});

// ===== DONATIONS =====
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/donations', [DonasiController::class, 'adminStore']);
    Route::get('/admin/donations', [DonasiController::class, 'index']);
});

// USER
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->post('/donations', [DonasiController::class, 'store']);