<?php

namespace App\Domain\Entities;

class UserRegister
{
    public $name;
    public $email;
    public $password;

    public function __construct(array $data)
    {
        $this->name = $data['name'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
    }
}
