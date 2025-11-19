<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;

Route::options('{any}', function () {
    return response('', 200);
})->where('any', '.*');
// AUTH
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// CAMPAIGN (sementara tanpa auth biar bisa test di Postman / curl)
Route::get('/campaigns', [CampaignController::class, 'index']);
Route::post('/campaigns', [CampaignController::class, 'store']);
Route::get('/campaigns/{id}', [CampaignController::class, 'show']);
Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);

// DONASI (sementara juga tanpa auth)
Route::post('/donasi', [DonasiController::class, 'store']);

// USERS
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

// CORS FIX
Route::options('/{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');
