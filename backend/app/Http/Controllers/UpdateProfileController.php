<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthServices;
use Illuminate\Http\Request;

class UpdateProfileController extends Controller
{
    public function __invoke(Request $request, AuthServices $service)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email'
        ]);

        $result =$service->updateProfile($request);

        return response()->json($result);
    }
}
