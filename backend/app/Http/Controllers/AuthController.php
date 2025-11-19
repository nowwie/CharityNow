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
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}
