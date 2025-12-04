<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AuthServices;
use Illuminate\Http\Request;

class MeController extends Controller
{
    public function __invoke(Request $request, AuthServices $service)
    {
        $result = $service->me($request->user());
        return $result;
    }
}
