<?php

namespace App\Http\Controllers;

use App\Application\UseCases\LoginUserUseCase;
use App\Application\UseCases\RegisterUserUseCase;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $loginUseCase;
    protected $registerUseCase;

    public function __construct(
        LoginUserUseCase $loginUseCase,
        RegisterUserUseCase $registerUseCase
    ) {
        $this->loginUseCase = $loginUseCase;
        $this->registerUseCase = $registerUseCase;
    }

    public function register(Request $request)
    {
        $result = $this->registerUseCase->execute($request->all());
        return response()->json($result, 201);
    }

    public function login(Request $request)
    {
        $data = $this->loginUseCase->execute($request->all());
        return response()->json($data);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ]);

    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email'
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'user' => $user
        ]);
    }

}
