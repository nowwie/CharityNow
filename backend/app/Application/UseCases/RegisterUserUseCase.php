<?php

namespace App\Application\UseCases;

use App\Domain\Entities\UserRegister;
use App\Domain\Repositories\AuthRepoInterface;

class RegisterUserUseCase
{
    protected $repo;

    public function __construct(AuthRepoInterface $repo)
    {
        $this->repo = $repo;
    }

    public function execute(array $data)
    {
        $entity = new UserRegister($data);
        return $this->repo->register($entity);
    }
}
