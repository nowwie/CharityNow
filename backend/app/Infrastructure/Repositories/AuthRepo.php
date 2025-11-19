<?php

namespace App\Infrastructure\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Domain\Repositories\AuthRepoInterface;
use App\Domain\Entities\UserLogin;
use Illuminate\Support\Facades\Auth;
use App\Domain\Entities\UserRegister;

class AuthRepo implements AuthRepoInterface
{
    public function login(UserLogin $userLogin)
    {
        if (
            !Auth::attempt([
                'email' => $userLogin->email,
                'password' => $userLogin->password
            ])
        ) {
            return null;
        }

        $user = Auth::user();
        $token = $user->createToken('api_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function register(UserRegister $userRegister)
    {
        $user = User::create([
            'name' => $userRegister->name,
            'email' => $userRegister->email,
            'password' => Hash::make($userRegister->password),
        ]);

        // Berikan token seperti login
        $token = $user->createToken("auth_token")->plainTextToken;

        return [
            'message' => 'Register berhasil',
            'token' => $token,
            'user' => $user
        ];
    }
}
