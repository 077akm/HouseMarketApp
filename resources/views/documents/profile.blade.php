
@extends('layouts.app')

@section('content')

    <section class="h-100 gradient-custom-2">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-lg-9 col-xl-7">
                    <div class="card">
                        <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
                            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                                <img src="{{Auth::user()->avatar}}"
                                     alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"

                                     style="width: 150px; z-index: 1">

                                <a href="{{url('/items/payshow')}}" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                        style="z-index: 1;">
                                    {{__('bet.addmon')}}
                                </a>
                            </div>
                            <div class="ms-3" style="margin-top: 130px;">
                                <h5>{{Auth::user()->name}}</h5>
                                <p>{{Auth::user()->email}}</p>
                            </div>
                        </div>
                        <div class="p-4 text-black" style="background-color: #f8f9fa;">
                            <div class="d-flex justify-content-end text-center py-1">
                                <div>
                                    <p class="mb-1 h3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                                        </svg>
                                        {{Auth::user()->balance}} ₸</p>
                                    <p class="small text-muted mb-0">{{__('bet.balance')}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-4 text-black" style="padding-top: 36px">
                            <div class="mb-5 mt-5">
                                <p class="lead fw-normal mb-1">{{__('bet.status')}}:</p>
                                <div class="p-4" style="background-color: #f8f9fa;">
                                    <p class="font-italic mb-1">
                                        @if(Auth::user()->role_id == 1)
                                            {{__('bet.klient')}}
                                        @elseif(Auth::user()->role_id == 2)
                                            {{__('bet.moder')}}
                                        @elseif(Auth::user()->role_id == 3)
                                            {{__('bet.admin')}}
                                        @endif
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <p class="lead fw-normal mb-0">{{__('bet.myads')}}:</p>
                            </div>

                            <div class="row g-3">
                                @foreach($items as $is)
                                <div class="col mb-2">
                                    <img src="{{$is->image}}" class="w-100 rounded-3">
                                    <p>{{$is->name}}</p>
                                    <p class="fw-bold">{{$is->price}} ₸</p>
                                </div>
                                @endforeach
                            </div>

                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <p class="lead fw-normal mb-0">{{__('error.myorders')}}:</p>
                            </div>

                            <div class="row g-3">
                                @foreach($ids as $ides)
                                    <div class="col mb-2">
                                        <img src="{{$ides->image}}" class="w-100 rounded-3">
                                        <p>{{$ides->name}}</p>
                                        <p>{{$ides->pivot->quantity}} шт.</p>
                                        <p class="fw-bold">{{$ides->price}} ₸</p>
                                    </div>
                                @endforeach
                            </div>


                        </div>
                    </div>
                </div>
            </div>
    </section>
@endsection
