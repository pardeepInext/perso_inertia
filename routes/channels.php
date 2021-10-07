<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use App\Models\Conversation;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/


Broadcast::channel("like.{id}", fn ($user, $id) =>  $user->id === User::find($id)->id);


Broadcast::channel("chat.{id}", fn ($user, $id) => Conversation::find($id));
