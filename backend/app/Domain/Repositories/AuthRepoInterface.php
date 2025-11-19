<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\UserLogin;
use App\Domain\Entities\UserRegister;

interface AuthRepoInterface
{
    public function login(UserLogin $userLogin);
    public function register(UserRegister $userRegister);

}
