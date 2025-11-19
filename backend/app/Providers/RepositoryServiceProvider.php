<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Repositories\AuthRepoInterface;
use App\Infrastructure\Repositories\AuthRepo;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            AuthRepoInterface::class,
            AuthRepo::class
        );
    }

    public function boot(): void
    {
        //
    }
}
