<?php
namespace App\Infrastructure\Repositories;

use App\Models\Campaign;
use App\Domain\Repositories\CampaignRepoInterface;

class CampaignRepo implements CampaignRepoInterface
{
    public function all()
    {
        return Campaign::all();
    }

    public function find($id)
    {
        return Campaign::findOrFail($id);
    }

    public function create(array $data)
    {
        return Campaign::create($data);
    }

    public function update($id, array $data)
    {
        $Campaign = Campaign::findOrFail($id);
        $Campaign->update($data);
        return $Campaign;
    }

    public function delete($id)
    {
        $Campaign = Campaign::findOrFail($id);
        return $Campaign->delete();
    }
}
