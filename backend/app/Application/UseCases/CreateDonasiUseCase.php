<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\DonasiRepoInterface;
use App\Domain\Entities\Donasi;

class CreateDonasiUseCase
{
    protected $repo;

    public function __construct(DonasiRepoInterface $repo)
    {
        $this->repo = $repo;
    }

    public function execute(array $data)
    {
        $donasi = new Donasi($data);
        return $this->repo->create($donasi);
    }
}
