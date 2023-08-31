@extends('layouts.app')

@section('title', 'INDEX PAGE')

@section('content')
    <div class="container-fluid d-flex">


        <div class="container">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active" >
                        <img src="https://cdn11.bigcommerce.com/s-ikl27/images/stencil/original/carousel/177/australian_made_guitar__09446.jpg?c=3" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.keysound.co.uk/data1/images/carousel_shop2_1200x500px.png" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.gearmusic.com/userimages/mainpage_gallery/player_plus.jpg" class="d-block w-100" style="height: auto" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </div>


</div>
<hr>
    <div class="container" style="margin-top: 20px">
        <div class="row row-cols-1 row-cols-md-3 g-3">
            @foreach($items as $item)
            <div class="col">
                <div class="card">
                    <img src="{{asset($item->image)}}" class="card-img-top">
                    <div class="card-body">
                        <h4 class="card-title fw
                        -bold">{{$item->name}}</h4><hr>
                        <p class="card-text">{{$item->content}}</p>
                    <div class="d-grid gap-2 col-7 mx-auto d-flex">
                        @can('delete', $item)
                            <form action="{{route('items.destroy', $item->id)}}" method="post">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-outline-danger" type="submit">{{ __('bet.delete') }}</button>
                            </form>
                        @endcan

                        <a class="btn btn-primary" href="{{route('items.show', $item->id)}}">
                            {{ __('bet.view') }}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                        </a>

                    </div>

                    </div>

                </div>
            </div>
            @endforeach


        </div>

    </div>










@endsection

