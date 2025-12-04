<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthServices;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __invoke(Request $request, AuthServices $service)
    {
        $result = $service->login($request->all());
        return $result;
    }
}
