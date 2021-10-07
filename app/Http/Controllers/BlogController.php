<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Like;
use App\Notifications\Like as LikeNotify;
use Illuminate\Support\Facades\Notification;


class BlogController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'discription' => 'required',
            'title' => 'required',
            'category_id' => 'required',
        ]);

        $created = $request->only('discription', 'title', 'category_id');
        $created['user_id'] = auth()->user()->id;

        if ($request->img) {
            $newFile = "{$created['user_id']}_blog_" . time() . ".jpg";
            $request->img->move(public_path("/images/posts"), $newFile);
            $created['img'] = $newFile;
        }

        $create = Blog::create($created);

        return redirect()->route('home')->with('status', 'Blog is added');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {
        $blog->load('user');
        $relatedPosts = Blog::where('category_id', $blog->category_id)->with('user')->take(7)->latest()->get();
        return inertia('Blog', compact('blog', 'relatedPosts'));
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        //
    }

    function toggleLike(Request $request)
    {
        $like = Like::where([['blog_id', $request->id], ['user_id', Auth::id()]])->first();

        $blog = Blog::find($request->id);

        if ($like) {
            $is_liked = $request->is_liked ? 1 : 0;
            $like->update(compact('is_liked'));
        } else {
            Like::create(['blog_id' => $request->id, 'user_id' => Auth::id()]);
            if ($blog->user->id != Auth::id())
                $blog->user->notify(new LikeNotify(['user' => auth()->user(), 'notify' => 'likes', 'blog' => $blog]));
        }


        return redirect()->route('home');
    }
}
