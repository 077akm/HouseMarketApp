@extends('layouts.app')

@section('content')

    <div class="container" >

        <div class="container">
            <div class="card mb-3" style="max-width: 1500px;">
                <div class="row g-0">
                    <div class="col-md-6">
                        <img src="{{asset($item->image)}}" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h2 class="card-title display-5">{{$item->name}}</h2>
                            @if($avgRating != 0)
                                <h5>{{__('bet.rating')}}: {{$avgRating}}</h5>
                                <hr>
                            @endif
                            <h5><p class="card-text">{{$item->content}}</p></h5><br>
                            <p class="card-text">@foreach($conditions as $con)
                                    <span class="badge bg-danger" @if($con->id == $item->condition)>{{$con->{'cond_'.app()->getLocale()} }} @endif</span>
                                @endforeach</p><br>

                            <label>{{__('bet.price')}}:</label>
                            <h3 class="display-7"><span class="badge bg-success">{{$item->price}} ₸</span></h3><br>

                            <div class="d-flex">
                                @auth
                            <a class="btn btn-outline-secondary" href="{{route('items.edit', $item->id)}}" style="margin-right: 5px">{{__('bet.edit')}}</a>
                                @endif


                            <form action="{{route('items.carting', $item->id)}}" method="post">
                            @csrf
                                <button class="btn btn-dark" type="submit">
                                    {{__('bet.buy')}}
                                </button>
                            </form>
                            </div>


                            <hr>
                            @auth
                                <div class="container">
                                    <form action="{{route('items.rate',$item->id)}}" method="post">
                                        @csrf
                                        <div class="rating">
                                            @for($i=5; $i>=1;$i--)
                                                <input type="radio" name="rating" id="{{$i}}" {{$myRating==$i ? 'checked' : ''}} value="{{$i}}">
                                                <label for="{{$i}}"></label>
                                            @endfor
                                        </div><br><br><br><br>
                                        <button class="btn btn-dark" type="submit">{{__('bet.confirm')}}</button>
                                    </form>

                                    <form action="{{route('items.unrate', $item->id)}}" method="post">
                                        @csrf
                                        <button class="btn btn-outline-dark mt-1" type="submit">{{__('bet.remove')}}</button>
                                    </form>

                                </div>
                                <hr>
                            @endauth






                        </div>
                    </div>
                </div>

            </div>




        </div>
        <div class="container">
            <form action="{{route('comments.store')}}" method="post">
                @csrf
                <h4 class="display-6 text-center">{{__('bet.comments')}}</h4><hr>
                <label>{{__('bet.yoinput')}} :</label>
                <textarea class="form-control" name="text" cols="20" rows="2"></textarea>
                <input name="item_id" value="{{$item->id}}" type="hidden"><br>
                <button class="btn btn-primary form-control" type="submit">{{__('bet.save')}}</button>
            </form>
            <br><br><hr>
            <div class="row">

                @foreach($item->comments as $comment)
                <div class="col-sm-10">

                    @if($item->id == $comment->item_id)
                        {{$comment->created_at}} | {{$comment->user->name}}<h4>{{$comment->text}}</h4>
                </div>

                <div class="col-sm-2">
                        <div class=" d-flex" style="align: right;">
                            <div class="position-absolute top-0 start-100 translate-middle"></div>
                            @can('update', $comment)
                            <a href="{{route('comments.edit', $comment)}}">
                                <button class="btn btn-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>
                                </button>
                            </a><br>
                            @endcan
                            @can( 'delete', $comment)
                            <form action="{{route('comments.destroy', $comment)}}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                    </svg>
                                </button><br>
                            </form>
                            @endcan
                        </div>

                    @endif

                </div>
                    <hr>
                @endforeach
            </div>

        </div>

    </div>

@endsection



