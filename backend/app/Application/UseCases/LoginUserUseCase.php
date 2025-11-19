<?php
namespace App\Application\UseCases;
use App\Domain\Entities\UserLogin;
use App\Domain\Repositories\AuthRepoInterface;
class LoginUserUseCase
{
    protected $repo;
    public function __construct(AuthRepoInterface $repo)
    {
        $this->repo = $repo;
    }
    public function execute(array $data)
    {
        $loginEntity = new UserLogin($data);
        return $this->repo->login($loginEntity);
    }
}