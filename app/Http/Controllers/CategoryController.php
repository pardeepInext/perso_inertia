<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    function show($name)
    {
        $category = Category::where('name', $name)->first();
        $blogs = Blog::where('category_id', '=', $category->id)->with('user')->latest()->take(5)->get();

        return inertia('Category', compact('category', 'blogs'))->withViewData([
            'key' => 'fasfsa'
        ]);
    }
}
