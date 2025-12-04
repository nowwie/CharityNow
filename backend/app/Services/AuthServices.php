<?php

namespace App\Services;

use App\Application\UseCases\LoginUserUseCase;
use App\Application\UseCases\RegisterUserUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthServices
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

    public function register(array $data)
    {
        $result = $this->registerUseCase->execute($data);
        return $result;
    }

    public function login(array $data)
    {
        $result = $this->loginUseCase->execute($data);
        return $result;
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