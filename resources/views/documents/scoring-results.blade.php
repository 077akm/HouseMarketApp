@extends('layouts.app')

@section('content')

    <div class="container">
        @foreach(config('app.languages') as $ln => $lang)
            <div>
            <a class="btn" href="{{route('switch.lang', $ln)}}">


                   @if($lang == 'Қазақ тілі')
                       <div style="margin-left: 500px">
                           <div class="" >
                               <img src="https://akorda.kz/assets/media/flag_mediumThumb.jpg" style="width: 200px">
                           </div>
                           {{$lang}}
                       </div>
                   @elseif($lang == 'English')
                       <div style="">
                           <div class="">
                               <img  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/255px-Flag_of_the_United_States.svg.png" style="width: 200px">
                           </div>
                           {{$lang}}
                       </div>
                   @elseif($lang == 'Русский язык')
                        <div style="margin-left: 1000px; margin-top: -150px">
                            <div class="">
                                <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/800px-Flag_of_Russia.svg.png" style="width: 200px">
                            </div>
                            {{$lang}}
                        </div>
                   @elseif($lang == '한국어')
                       <div style="margin-left: 170px; margin-top: 150px">
                           <div class="">
                               <img  src="https://asiasociety.org/sites/default/files/styles/1200w/public/K/korean-flag.jpg" style="width: 200px">
                           </div>
                           {{$lang}}
                       </div>
                   @elseif($lang == 'Español')
                        <div style="margin-left: 810px; margin-top: -180px">
                            <div>
                                <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png" style="width: 200px">
                            </div>
                            {{$lang}}
                        </div>
                   @endif

            </a>
            </div>
        @endforeach
    </div>

@endsection
