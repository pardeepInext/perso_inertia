<?php

use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use App\Notifications\Like;
use Illuminate\Support\Facades\Notification;
use App\Events\ChatMessage;
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

Route::middleware('auth')->group(function () {

    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/add', [HomeController::class, 'add'])->name('add');
    Route::get('/notifications', [HomeController::class, 'notification'])->name('notification');
    Route::get('/user', [HomeController::class, 'user'])->name('user');

    /*blogs routes */
    Route::resource('blogs', BlogController::class)->only('store', 'show', 'update', 'destroy');

    /* blog like toggle */
    Route::post('/bloglike', [BlogController::class, 'toggleLike'])->name('toggle-like');

    /*searches */
    Route::get('/country/{q}', [SearchController::class, 'countrySearch'])->name('country');
    Route::get('/states/{q}', [SearchController::class, 'statesSearch'])->name('state');
    Route::get('/cities/{q}', [SearchController::class, 'citiesSearch'])->name('city');

    /* user route */
    Route::post('/userdetails', [UserController::class, 'userDetails'])->name('user-details');
});



Auth::routes();
