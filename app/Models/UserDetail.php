<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'mobile_number', 'address', 'postcode', 'city_id', 'state_id', 'country_id'];

    function country()
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    function state()
    {
        return $this->hasOne(State::class, 'id', 'state_id');
    }

    function city()
    {
        return $this->hasOne(City::class, 'id', 'city_id');
    }
}
