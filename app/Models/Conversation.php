<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['user_1', 'user_2', 'is_private', 'group_id'];
    protected $appends = ['profile_pic', 'name'];

    function messages()
    {
        return $this->hasMany(Message::class);
    }

    function user()
    {
        $userId = $this->user_1 == Auth::id() ? $this->user_2 : $this->user_1;
        return User::find($userId);
    }

    function getProfilePicAttribute()
    {
        return $this->user()->profile_image;
    }

    function getNameAttribute()
    {
        return $this->user()->name;
    }
}
