<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CampaignService;

class GetAllCampaignController extends Controller
{
    public function __invoke(CampaignService $service)
    {
        return response()->json($service->getAll());
    }
}
