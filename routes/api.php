<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\{AccountController, CategoryController, TransactionController};
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::apiResource('accounts', AccountController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('transactions', TransactionController::class);

    Route::get('/user', function (Request $request) {
        return [
            'user' => $request->user(),
            'currentToken' =>  $request->bearerToken()
        ];
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});
