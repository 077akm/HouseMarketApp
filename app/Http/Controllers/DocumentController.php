<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Condition;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{

    public function profile(Item $item){
        $items = Item::where('user_id', Auth::user()->id)->get();
        $ids = Auth::user()->itemsQuant("Confirmed")->get();
        $kol = 0;
        if (Auth::check()) {
            $itemshop = Auth::user()->itemsQuant("in_cart")->get();
            foreach ($itemshop as $its) {
                $kol += $its->pivot->kol;
            }
        }
        return view('items.profile', ['items'=>$items,'kol'=>$kol, 'ids'=>$ids]);
    }

    public function rate(Request $request, Item $item){
        $request->validate([
            'rating' => 'required|min:1|max:5'
        ]);

        $itemRated = Auth::user()->itemsRated()->where('item_id', $item->id)->first();
        if ($itemRated != null){
            Auth::user()->itemsRated()->updateExistingPivot($item->id, ['rating' => $request->input('rating')]);
        } else {
            Auth::user()->itemsRated()->attach($item->id, ['rating' => $request->input('rating')]);
        }
        return back();
    }
    public function unrate(Item $item){
        $itemRated = Auth::user()->itemsRated()->where('item_id', $item->id)->first();

        if($itemRated != null){
            Auth::user()->itemsRated()->detach($item->id);
            $item->usersRated()->detach();
        }
        return back();
    }

    public function itemsByCategory(Category $category){
        return view('items.index', ['items'=>$category->items, 'categories' => Category::all()]);
    }
    public function itemsByCondition(Condition $condition){
        return view('items.index', ['items'=>$condition->items, 'conditions' => Condition::all()]);
    }


    public function index(Request $request)
    {
        $items = null;
        if ($request->search){
            $items = Item::where('name', 'LIKE', '%'.$request->search.'%')->get();
        }else{
            $items = Item::all();
        }

        $kol = 0;
        if (Auth::check()) {
            $itemshop = Auth::user()->itemsQuant("in_cart")->get();
            foreach ($itemshop as $its) {
                $kol += $its->pivot->kol;
            }
        }



        return view('items.index', ['items'=>$items,'kol'=>$kol, 'categories' => Category::all()])->with('items', $items);
    }



    public function create()
    {

        return view('items.create', ['conditions' => Condition::all(),'categories' => Category::all()]);
    }


    public function store(Request $req)
    {
        $validated = $req->validate([
            'name' => 'required|max:255',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000',
            'price' => 'required',
            'condition' => 'required',
            'content' => 'required',
            'category_id' => 'required|numeric'
        ]);

        $fileName = time().$req->file('image')->getClientOriginalName();
        $image_path = $req->file('image')->storeAs('items', $fileName, 'public');
        $validated['image'] = '/storage/'.$image_path;
        Auth::user()->items()->create($validated);
        return redirect()->route('items.index')->with('message', __('error.itmstr'));
    }


    public function show(Item $item)
    {

        $kol = 0;

        $myRating = 0;
        if (Auth::check()){
            $itemshop = Auth::user()->itemsQuant("in_cart")->get();
            foreach ($itemshop as $its) {
                $kol += $its->pivot->kol;
            }
            $itemRated = Auth::user()->itemsRated()->where('item_id', $item->id)->first();
            if ($itemRated != null)
                $myRating = $itemRated->pivot->rating;
        }

        $avgRating = 0;
        $sum = 0;
        $ratedUsers = $item->usersRated()->get();
        foreach ($ratedUsers as $ru){
            $sum += $ru->pivot->rating;
        }
        if (count($ratedUsers) > 0)
            $avgRating = $sum/count($ratedUsers);

        return view('items.show', ['item'=>$item,'kol'=>$kol,'categories' => Category::all(),'myRating' => $myRating,'avgRating' => $avgRating, 'conditions' => Condition::all()]);
    }


    public function edit(Item $item)
    {
        return view('items.edit', ['item'=>$item, 'conditions' => Condition::all() ,'categories' => Category::all()]);
    }


    public function update(Request $request, Item $item)
    {
        $fileName = time().$request->file('image')->getClientOriginalName();
        $image_path = $request->file('image')->storeAs('items', $fileName, 'public');

        $item->update([
            'name' => $request->input('name'),
            'image' => '/storage/'.$image_path,
            'price' => $request->input('price'),
            'condition' => $request->input('condition'),
            'content' => $request->input('content'),
            'category_id' => $request->input('category_id'),
        ]);
        $this->authorize('update', $item);
        return redirect()->route('items.index')->with('message', __('error.itmupd'));
    }


    public function destroy(Item $item)
    {
        $this->authorize('delete', $item);
        $item->delete();
        return redirect()->route('items.index')->with('message', __('error.itmdstr'));
    }

    public function addkol(Item $item){
        $itemKol = Auth::user()->itemsQuant("in_cart")->where('item_id', $item->id)->get();
        foreach ($itemKol as $ikol)
            if ($ikol != null) {
                Auth::user()->itemsQuant("in_cart")->updateExistingPivot($item->id, ['quantity' => 1 + $ikol->pivot->quantity]);
            }
        return back();
    }
    public function unaddkol(Item $item){
        $itemKol = Auth::user()->itemsQuant("in_cart")->where('item_id', $item->id)->get();
        foreach ($itemKol as $ikol)
            if ($ikol->pivot->quantity != 1) {
                Auth::user()->itemsQuant("in_cart")->updateExistingPivot($item->id, ['quantity' => $ikol->pivot->quantity-1]);
            }else{
                Auth::user()->itemsQuant("in_cart")->detach($item->id);
                $item->usersQuant()->detach();
            }
        return back();
    }



    public function carting(Item $item){

        $itemCarted = Auth::user()->itemsQuant("in_cart")->where('item_id', $item->id)->first();
        if ($itemCarted != null){
            Auth::user()->itemsQuant("in_cart")->updateExistingPivot($item->id, ['iscart' => "in_cart", 'quantity' => 1]);
        } else {
            Auth::user()->itemsQuant("in_cart")->attach($item->id, ['iscart' => "in_cart",'quantity' => 1]);
        }

        return back()->with('message', __('error.carting'));
    }

    public function uncarting(Item $item){
        $itemUncarted = Auth::user()->itemsQuant("in_cart")->where('item_id', $item->id)->first();

        if($itemUncarted != null){
            Auth::user()->itemsQuant("in_cart")->detach($item->id);
            $item->usersQuant()->detach();
        }
        return back()->with('massage', __('error.uncarting'));
    }

    public function shoping(){
        $itemshop = Auth::user()->itemsQuant("in_cart")->get();
        $sum = 0;
        $kol = 0;

        foreach ($itemshop as $its) {
            $sum += $its->price * $its->pivot->quantity;
            $kol += $its->pivot->kol;
        }


        if ($sum >100000){
            $bonus = 15000;
        }elseif ($sum > 10000){
            $bonus = 5000;
        }elseif ($sum > 5000){
            $bonus = 1000;
        }else{
            $bonus = 0;
        }

        return view('items.shoppingcarts', ['itemshop' => $itemshop,'kol'=>$kol,'bonus'=>$bonus,'sum'=>$sum,'conditions' => Condition::all()]);
    }

}
