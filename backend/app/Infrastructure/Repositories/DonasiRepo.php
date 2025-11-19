<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\DonasiRepoInterface;
use App\Domain\Entities\Donasi;
use App\Models\Donasi as DonasiModel;

class DonasiRepo implements DonasiRepoInterface
{
    public function create(Donasi $donasi)
    {
        return DonasiModel::create([
            'user_id'        => $donasi->user_id,
            'campaign_id'    => $donasi->campaign_id,
            'amount'         => $donasi->amount,
            'message'        => $donasi->message,
            'payment_method' => $donasi->payment_method,
            'status'         => $donasi->status,
        ]);
    }
}
