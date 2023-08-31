@extends('layouts.adm')

@section('title', 'Users Page')

@section('content')
    <h1>USERS PAGE</h1>

    <form action="{{route('adm.users.search')}}" method="GET">
        <div class="input-group mb-3">
            <input type="text" name="search" class="form-control" placeholder="Search Users">
            <button class="btn btn-success" type="submit">Searh</button>
        </div>
    </form>

    <table class="table table-light">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Img</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Active</th>
            <th>#</th>
        </tr>
        </thead>
        <tbody>
        @for($i=0; $i<count($users); $i++)
        <tr>
            <th scope="row">{{$i+1}}</th>
            <td><img style="width: 55px" src='{{$users[$i]->avatar}}'></td>
            <td>{{$users[$i]->name}}</td>
            <td>{{$users[$i]->email}}</td>
            <td>{{$users[$i]->role->name}}</td>
            <td>
                <form action="
                @if($users[$i]->is_active)
                    {{route('adm.users.ban', $users[$i]->id)}}
                @else
                    {{route('adm.users.unban', $users[$i]->id)}}
                @endif
                " method="post">
                    @csrf
                    @method('PUT')
                    <button class="btn {{$users[$i]->is_active ? 'btn-danger' : 'btn-success'}}" type="submit">
                        @if($users[$i]->is_active)
                            Ban
                        @else
                            Unban
                        @endif
                    </button>
                </form>
            </td>
            <td>
                <form action="{{route('adm.users.edrole', $users[$i]->id)}}" method="get">
                    @csrf
                    <button class="btn btn-outline-dark" >Edit</button>
                </form>
            </td>
        </tr>
        @endfor
        </tbody>
    </table>
@endsection
