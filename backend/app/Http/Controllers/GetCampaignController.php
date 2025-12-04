<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CampaignService;

class GetCampaignController extends Controller
{
    public function __invoke($id, CampaignService $service)
    {
        return response()->json($service->findById($id));
    }
}
