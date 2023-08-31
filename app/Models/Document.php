<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'content','price','image','condition', 'category_id', 'user_id'];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function condition(){
        return $this->belongsTo(Condition::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function usersRated(){
        return $this->belongsToMany(User::class, 'item_user')
            ->withPivot('rating')
            ->withTimestamps();
    }
    public function usersQuant(){
        return $this->belongsToMany(User::class,'item_type')
            ->withPivot('quantity','iscart')
            ->withTimestamps();
    }


}
