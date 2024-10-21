<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\UserAuth;
// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [UserController::class, 'index']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware([UserAuth::class])->group(function () {
    Route::get('/user', [UserController::class, 'dashboard']);
   
});
Route::post('/logout', [UserController::class, 'logout']);
