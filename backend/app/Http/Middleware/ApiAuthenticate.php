<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class ApiAuthenticate extends Middleware
{
    protected function redirectTo($request)
    {
        // KARENA API → tidak boleh redirect
        if ($request->expectsJson()) {
            return null;
        }

        // Jangan redirect ke route login (karena BE kamu tidak punya halaman login)
        return null;
    }
}
