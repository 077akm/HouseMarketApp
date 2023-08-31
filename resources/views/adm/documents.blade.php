@extends('layouts.adm')

@section('title', 'Items PAGE')

@section('content')
    <h1>ITEMS PAGE</h1>

    <div class="container" style="margin-top: 20px">
        <div class="row row-cols-1 row-cols-md-3 g-3">
            @foreach($items as $item)
                <div class="col">
                    <div class="card">
                        <img src="{{$item->image}}" class="card-img-top">
                        <div class="card-body">
                            <h4 class="card-title fw-bold">{{$item->name}}</h4><hr>
                            <p class="card-text">{{$item->content}}</p>
                            <div class="d-grid gap-2 col-6 mx-auto d-flex">
                                @can('delete', $item)
                                    <form action="{{route('documents.destroy', $item->id)}}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        <button class="btn btn-outline-danger" type="submit">DELETE</button>
                                    </form>
                                @endcan

                                <a class="btn btn-primary" href="{{route('documents.show', $item->id)}}">BUY</a>

                            </div>

                        </div>

                    </div>
                </div>
            @endforeach


        </div>

    </div>
@endsection
