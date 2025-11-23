<?php
namespace App\Domain\Repositories;

use App\Domain\Entities\Campaign;

interface CampaignRepoInterface
{
   public function all();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}