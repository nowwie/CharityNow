<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Repositories\AuthRepoInterface;
use App\Infrastructure\Repositories\AuthRepo;
use App\Domain\Repositories\CampaignRepoInterface;
use App\Infrastructure\Repositories\CampaignRepo;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            AuthRepoInterface::class,
            AuthRepo::class
        );

        $this->app->bind(
            CampaignRepoInterface::class,
            CampaignRepo::class
        );

    }



    public function boot(): void
    {
        //
    }
}
