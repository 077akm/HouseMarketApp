@extends('layouts.app')

@section('title', 'INDEX PAGE')

@section('content')

<!-- Quzhattardy tanusurumen Zhiberu -->
<section class="section" id="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-xs-12">
                <div class="left-text-content">
                    <div class="section-heading">
                        <h6>{{__('bet.about')}}</h6>
                        <h2>{{__('bet.tekist')}}</h2>
                    </div>
                    <div class="row">
                        <!-- Контейнер для суммы до 32 000 000 -->
                        <div class="container">
                            <div class="d-flex">
                                <label class="col-sm-2 col-form-label">{{__('bet.baspana')}}: </label>
                                <input placeholder="32 000 000 тг" maxlength="8" class="form-control col-md-6" id="num1_1" />
                            </div><br>

                            <div class="d-flex">
                                <label type="number" class="col-sm-2 col-form-label">{{__('bet.merzim')}}: </label>
                                <input placeholder="60 айға" maxlength="2" class="form-control col-md-4" id="num2_1" />
                            </div>

                            <div class="d-flex">
                                <label class="col-sm-2 col-form-label">{{__('bet.percent')}}: </label>
                                <input type="number" min="20" max="100" placeholder="20" class="form-control col-md-2" id="percent_1" />
                            </div>
                        </div>
                        <br><br>
                        <button style="background-color: #30b418;" class="main-button-icon col-md-4" onclick="calculatePayment('num1_1', 'num2_1', 'percent_1')">{{__('bet.calculate')}}...</button>
                        <hr><br>
                        <div class="container">
                            <div class="d-flex">
                                <h4 class="display-6" id="result_1"> </h4><h4 id="tenge_1"> </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-xs-12">
                <div class="left-text-content">
                    <div class="section-heading">
                        <h6>{{__('bet.about')}}</h6>
                        <h2>{{__('bet.tekist')}}</h2>
                    </div>
                    <div class="row">
                        <!-- Контейнер для суммы до 64 000 000 -->
                        <div class="container">
                            <div class="d-flex">
                                <label class="col-sm-2 col-form-label">{{__('bet.baspana')}}: </label>
                                <input placeholder="64 000 000 тг" maxlength="8" class="form-control col-md-6" id="num1_2" />
                            </div><br>

                            <div class="d-flex">
                                <label type="number" class="col-sm-2 col-form-label">{{__('bet.merzim')}}: </label>
                                <input placeholder="120 айға" maxlength="3" class="form-control col-md-4" id="num2_2" />
                            </div>

                            <div class="d-flex">
                                <label class="col-sm-2 col-form-label">{{__('bet.percent')}}: </label>
                                <input type="number" min="20" max="100" placeholder="20" class="form-control col-md-2" id="percent_2" />
                            </div>
                        </div>
                        <br><br>
                        <button style="background-color: #30b418;" class="main-button-icon col-md-4" onclick="calculatePayment('num1_2', 'num2_2', 'percent_2')">{{__('bet.calculate')}}...</button>
                        <hr><br>
                        <div class="container">
                            <div class="d-flex">
                                <h4 class="display-6" id="result_2"> </h4><h4 id="tenge_2"> </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                function calculatePayment(num1Id, num2Id, percentId) {
                    var num1 = parseFloat(document.getElementById(num1Id).value.replace(/\s/g, '').replace(',', '.'));
                    var num2 = parseFloat(document.getElementById(num2Id).value);
                    var percent = parseFloat(document.getElementById(percentId).value);

                    if (isNaN(num1) || isNaN(num2) || isNaN(percent)) {
                        document.getElementById(`result_${num1Id.charAt(num1Id.length - 1)}`).innerHTML = '{{__('bet.error')}}';
                        document.getElementById(`tenge_${num1Id.charAt(num1Id.length - 1)}`).innerText = '';
                        return;
                    }

                    var initialPayment = num1 * (percent / 100);
                    var remainingAmount = num1 - initialPayment;
                    var monthlyPayment = remainingAmount / num2;

                    if (num2 === 60) {
                        document.getElementById(`result_${num1Id.charAt(num1Id.length - 1)}`).innerHTML = '{{__('bet.ejemes')}}: ' + monthlyPayment.toFixed(2);
                    } else if (num2 === 120) {
                        var totalPayment = 0;
                        for (var i = 1; i <= num2; i++) {
                            if (i <= 12) {
                                monthlyPayment = remainingAmount / 120;
                            } else {
                                monthlyPayment *= 1.08; // Увеличиваем на 8% каждые 12 месяцев
                            }
                            totalPayment += monthlyPayment;
                        }
                        document.getElementById(`result_${num1Id.charAt(num1Id.length - 1)}`).innerHTML = '{{__('bet.ejemes')}}: ' + totalPayment.toFixed(2);
                    }

                    document.getElementById(`tenge_${num1Id.charAt(num1Id.length - 1)}`).innerText = ' тг';
                }
            </script>



        </div>
    </div>
</section>
<!-- Quzhattardy tanusurumen Zhiberu -->

@endsection
