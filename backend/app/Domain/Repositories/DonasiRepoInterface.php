<?php
namespace App\Domain\Repositories;

use App\Domain\Entities\Donasi;

interface DonasiRepoInterface
{
    public function create(Donasi $donasi);
}
?>