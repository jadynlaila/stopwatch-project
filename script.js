//make area for lap and have it replace the text there for every lap
//add variable for running vs not, when not running lap will reset timer and when is running itll add it to a lap
//decimals are tenth of a second not milliseconds

$(function () {
    let $lapSpace = $('.lapSpace');
    let $millisecondOutput = $('#milliseconds');
    let $secondOutput = $('#seconds');
    let $minuteOutput = $('#minutes');
    let $hourOutput = $('#hours');
    let millisecondTime = 00;
    let secondTime = 00;
    let minuteTime = 00;
    let hourTime = 00;
    let $startPause = $('#startORpause');
    let $lapReset = $('#lapORreset');
    let isRunning = false;
    let interval;
    let breakTime = 10;
    //when milliseconds is divisible by 100, then add millisecondTime / 100 to the second time 

    function start() {
        interval = setInterval(function () {
            millisecondTime += 1;
            $millisecondOutput.html(`0${millisecondTime}`);
            if(millisecondTime >= 10){
                $millisecondOutput.html(millisecondTime);
            }
            if (millisecondTime >= 100) {
                millisecondTime = 00;
                $millisecondOutput.html('00');
                secondTime++;
                $secondOutput.html(`0${secondTime}`);
                if(secondTime >= 10){
                    $secondOutput.html(secondTime);
                }
            }
            if (secondTime >= 60){
                secondTime = 00;
                $secondOutput.html('00');
                minuteTime++;
                $minuteOutput.html(`0${minuteTime}`);
                if(minuteTime >= 10){
                    $minuteOutput.html(minuteTime);
                }
            }
            if(minuteTime >= 60){
                minuteTime = 00;
                $minuteOutput.html('00');
                hourTime++;
                $hourOutput.html(`0${hourTime}`);
                if(hourTime >= 10){
                    $hourOutput.html(hourTime);
                }
            }
        }, breakTime);

    }
    function pause() {
        clearInterval(interval);
    }
    function lap() {
        ///gonna do something like ${millisecondTime}: ${aaksdjflksdj}
        let $number = (`${hourTime}:${minuteTime}:${secondTime}.${millisecondTime}`)
        $lapSpace.find('ul').append(`<li>${$number}</li>`);
    }
    function clear() {
        millisecondTime = 00;
        $millisecondOutput.html('00');
        secondTime = 00;
        $secondOutput.html('00');
        minuteTime = 00;
        $minuteOutput.html('00');
        hourTime = 00;
        $hourOutput.html('00');
        $lapSpace.find('ul').empty();
    }

    function checkStartPause() {
        if (!isRunning) {
            $lapReset.html("lap");
            $startPause.html('pause');
            console.log(isRunning);
            start();
            isRunning = true;
        } else {
            console.log(isRunning);
            $lapReset.html("reset");
            $startPause.html('start');
            pause();
            isRunning = false;
        }
    }

    function checkLapClear() {
        if (!isRunning) {
            clear();
        } else {
            lap();
        }
    }

    $startPause.on('click', checkStartPause);
    $lapReset.on('click', checkLapClear);
})
