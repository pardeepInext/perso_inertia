<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\State;
use App\Models\City;

class SearchController extends Controller
{
    function countrySearch($q)
    {
        return  Country::select('id', 'name')->where('name', 'like', "%$q%")->get();
    }

    function statesSearch($q, Request $request)
    {
        return State::select('id', 'name')->where([
            ['country_id', '=', $request->id],
            ['name', 'like', "%$q%"]
        ])->get();
    }

    function citiesSearch($q, Request $request)
    {
        return City::select('id', 'name')->where([
            ['state_id', '=', $request->id],
            ['name', 'like', "%$q%"]
        ])->get();
    }
}
