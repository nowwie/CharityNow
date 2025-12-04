<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\DonasiService;
use Illuminate\Http\Request;

class RiwayatDonasiController extends Controller
{
    public function __invoke(Request $request, DonasiService $service)
    {
        $result = $service->myDonations($request->user()->id);

        return response()->json($result);
    }
}
