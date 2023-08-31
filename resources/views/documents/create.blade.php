@extends('layouts.app')

@section('title', 'CREATE PAGE')

@section('content')
    <div class="container">


        <div class="row justify-content-center">
            <div class="col-md-10">
                    <a class="btn btn-outline-primary" href="{{route('items.index')}}">{{__('bet.gotoindex')}}</a>

                <form action="{{route('items.store')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group">
                        <label for="nameInput">{{__('bet.producname')}}</label>
                            <input type="text" class="form-control" id="nameInput" name="name" placeholder="Enter Product Name">
                            @error('name')
                                <div class="alert alert-danger">{{$message}}</div>
                            @enderror
                    </div>

                    <div class="form-group">
                        <label for="contentInput">{{__('bet.content')}}</label>
                        <textarea class="form-control" id="contentInput" rows="3" name="content"></textarea>
                        @error('content')
                            <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="priceInput">{{__('bet.productprice')}}</label>
                        <input type="number" class="form-control" id="nameInput" name="price" placeholder="Enter Product Price">
                        @error('price')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="conditionInput">{{__('bet.condition')}}</label>
                        <select class="form-control" name="condition" id="conditionInput">
                            @foreach($conditions as $con)
                                <option value="{{$con->id}}">{{$con->{'cond_'.app()->getLocale()} }}</option>
                            @endforeach
                        </select>
                        @error('condition')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="categoryInput">{{__('bet.category')}}</label>
                        <select class="form-control" name="category_id" id="categoryInput">
                            @foreach($categories as $cat)
                        <option value="{{$cat->id}}">{{$cat->{'name_'.app()->getLocale()} }}</option>
                         @endforeach
                        </select>

                        @error('category_id')
                            <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="imageInput">{{__('bet.productimage')}}</label>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" id="imageInput" name="image">
                        @error('image')
                        <div class="alert alert-danger">{{$message}}</div>
                        @enderror
                    </div>

                    <div class="form-group mt-3">
                        <button class="btn btn-outline-success" type="submit">{{__('bet.save')}}</button>
                    </div>

                </form>
    </div>
    </div>
    </div>
@endsection

