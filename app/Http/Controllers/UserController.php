<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    function userDetails(Request $request)
    {

        $request->validate([
            'country_id' => 'required',
            'state_id' => 'required',
            'city_id' => 'required',
            'mobile_number' => 'required|digits:10',
            'address' => 'required',
            'postcode' => 'required|digits:6'
        ]);

        $create = $request->only('country_id', 'state_id', 'city_id', 'mobile_number', 'address', 'postcode');

        $create['user_id'] = Auth::id();
        UserDetail::create($create);

        if ($request->img) {
            $user = User::find(Auth::id());

            if ($user->image != "") Storage::disk('images')->delete("users/$user->image");

            $newImage = Auth::id() . "_" . time() . "." . $request->img->getClientOriginalExtension();
            $request->img->storeAs('users', $newImage, 'images');
            $user->update(['image' => $newImage]);
        }

        return redirect()->route('home')->with('status', 'Profile is updated successfully');
    }
}
