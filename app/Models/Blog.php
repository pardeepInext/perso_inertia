<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Auth;

class Blog extends Model
{
  use HasFactory;
  protected $fillable = ['discription', 'title', 'img', 'category_id', 'user_id'];
  protected $appends = ['figure', 'blog_date', 'like_status'];

  public static $searchable = ['title'];

  function category()
  {
    return  $this->hasOne(Category::class, 'id');
  }

  function user()
  {
    return $this->hasOne(User::class, 'id', 'user_id');
  }


  function getFigureAttribute()
  {
    return $this->img ? asset("images/posts/$this->img") : asset('images/blog.jpg');
  }

  function getBlogDateAttribute()
  {
    return date('M d,Y', strtotime($this->updated_at));
  }

  function likes()
  {
    return  $this->hasMany(Like::class);
  }


  function getLikeStatusAttribute()
  {
    $likeData = Like::where([['blog_id', $this->id], ['user_id', Auth::id()]])->first();
    $likeStatus = $likeData ? $likeData->is_liked : false;
    return $likeStatus;
  }
}
