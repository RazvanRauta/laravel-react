<?php

use App\Http\Controllers\Advert\AdvertController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ParserStatusController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', function () {
    return response()->json([
        'status' => 'Error',
        'message' => 'You are not logged in',
        'data' => null
    ], 401);
})->name('login');

Route::get('/advs', [AdvertController::class, 'index']);
Route::get('/adv/{id}', [AdvertController::class, 'show']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/currentUser', [UserController::class, 'current']);
    Route::get('/logout',[AuthController::class, 'logout']);

//    Route::post('/adverts', [AdvertController::class, 'store']);
//    Route::put('/adverts/{id}', [AdvertController::class, 'update']);
//    Route::delete('/adverts/{id}', [AdvertController::class, 'delete']);

    Route::get('/parserStatus', [ParserStatusController::class, 'show']);
});



