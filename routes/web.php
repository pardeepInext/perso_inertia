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
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MessageController;

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

    /* category  */
    Route::get('category/{name}', [CategoryController::class, 'show'])->name('category-show');
    /* user route */
    Route::post('/userdetails', [UserController::class, 'userDetails'])->name('user-details');

    /* search page  */
    Route::get('/search/{qry}', [SearchController::class, 'index'])->name('search');

    /**  message routes */
    Route::get('/messages', [MessageController::class, 'index'])->name('message');
    Route::get('/message/user', [MessageController::class, 'search'])->name('search-message');
    Route::post('/message', [MessageController::class, 'send'])->name('message-sent');
    Route::get('add-conversation', [MessageController::class, 'addConversation'])->name('add-conversation');
});



Auth::routes();
