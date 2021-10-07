<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Message extends Model
{
    use HasFactory;
    protected $fillable = ['message', 'sender_id', 'conversation_id'];
    protected $appends = ['time', 'you'];

    function sender()
    {
        return $this->hasOne(User::class, 'id', 'sender_id');
    }

    function getTimeAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    function getYouAttribute()
    {
        return $this->sender_id === Auth::id();
    }
}
