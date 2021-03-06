<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
        'provider_id'
    ];

    protected $appends = ['profile_image'];

    public static $searchable = ['email', 'name'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'image',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    function getProfileImageAttribute()
    {
        return $this->provider_id ? $this->image : ($this->image != "" ?  asset("images/users/$this->image") : asset("images/user.png"));
    }

    public function receivesBroadcastNotificationsOn()
    {
        return 'like.' . $this->id;
    }

    function userDetails()
    {
        return $this->hasOne(UserDetail::class);
    }
}
