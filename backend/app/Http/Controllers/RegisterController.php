<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthServices;
use Illuminate\Http\Request;

// class RegisterController extends Controller
// {
//     public function __invoke(Request $request, AuthServices $service)
//     {
//         $result = $service->register($request->all());
//         return response()->json($result, 201);
//     }
// }

class RegisterController extends Controller
{
    public function __invoke(Request $request, AuthServices $service)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        $result = $service->register($validated);

        return response()->json($result, 201);
    }
}

