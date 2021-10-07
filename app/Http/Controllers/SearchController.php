<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\State;
use App\Models\City;

class SearchController extends Controller
{

    function index($qry)
    {
        $searchData = [];

        foreach (['Category', 'Blog', 'User'] as $name)
            if ($this->searchModel($name, $qry) != null) $searchData[$name] = $this->searchModel($name, $qry);

        return inertia("Search", compact('searchData', 'qry'))->withViewData([
            'key' => 'fafsd'
        ]);
    }

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

    function searchModel($name, $q)
    {
        $model = 'App\Models\\' . $name;
        $qry = $model::query();

        foreach ($model::$searchable as $field)
            $qry->orWhere($field, 'like', "%$q%");

        $data = $qry->latest()->take(10)->get();

        return $data->count() > 0 ? $data : null;
    }
}
