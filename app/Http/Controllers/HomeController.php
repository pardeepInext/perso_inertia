<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Category;
use App\Models\User;

class HomeController extends Controller
{

    public function index()
    {
        $blogs = Blog::orderBy('created_at', 'desc')->paginate(10);
        $categories = Category::get();

        return inertia("Index", compact('blogs', 'categories'))->withViewData([
            'key' => "Parsa"
        ]);
    }

    function add()
    {
        $categories = Category::select('name', 'id')->get();

        return inertia("Add", compact('categories'))->withViewData([
            'key' => 'Add'
        ]);
    }

    function user()
    {
        $user = User::find(auth()->user()->id)->load([
            'userDetails',
            'userDetails.country:id,name',
            'userDetails.state:id,name',
            'userDetails.city:id,name'
        ]);
        return inertia("User", compact('user'))->withViewData([
            'key' => 'User'
        ]);
    }

    function notification()
    {
        return inertia("Notifications")->withViewData([
            'key' => 'Notification'
        ]);
    }
}
