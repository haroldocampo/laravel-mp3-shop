<?php

use App\Http\Controllers\ShopController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GoogleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/redirect', function () {
    return view('welcome');
});

Route::get('/google', function () {
    return view('google');
});

Route::get('/api/songs', [ShopController::class, 'songs']);
Route::get('/api/authcheck', [ShopController::class, 'authcheck']);
  
Auth::routes();

Route::get('/home', [HomeController::class, 'index']);
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
