up = [];
down = [];
dwell = [];
flight = [];
dwellAvg = 0;
flightAvg = 0;
dwellSD = 0;
flightSD = 0;
$(document).ready(function(){
    var downTime;
    $(".target").keydown(function(e){
        downTime = $.now();
        code = e.keyCode;
        if((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || code == 8){
            down.push(downTime);
        }
    });

    $(".target").keyup(function(e){
        var upTime = $.now();
        code = e.keyCode;
        if((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || code == 8){
            up.push(upTime);
        }
    });
});

function calculateDwell(){
    dwell = [];
    for(i = 0;i < up.length;i++){
        dwell.push(up[i] - down[i]);
    }
}

function calculateFlight(){
    var lengths = [];
    var targets = $(".target");
    lengths[0] = targets[0].value.length;
    for(i = 1;i < targets.length;i++){
        lengths[i] = lengths[i - 1] + targets[i].value.length;
    }
    var i = 1;
    var j = 0;
    var k = 0;
    flight = [];
    while(i < down.length){
        var value = down[i++] - up[j++];
        if(value < 0){
            value = 0;
        }
        flight.push(value);
        if(i == lengths[k]){
            k++;
            i++;
            j++;
        }
    }
}

var mean = function(result,currentValue,currentIndex,arr){
    if(currentIndex == arr.length - 1){
        result += currentValue;
        return result / arr.length;
    }
    else{
        return result + currentValue;
    }
}

function standardDeviation(arr){
    avg = arr.reduce(mean,0);
    result = 0;
    for(i = 0;i < arr.length;i++){
        result += (arr[i] - avg) * (arr[i] - avg);
    }
    result = Math.sqrt(result / arr.length);
    return result;
}

function submitForm(){
    calculateDwell();
    calculateFlight();
    flight = flight.filter(function(currentValue){
        return currentValue > 0;
    });

    dwellAvg = dwell.reduce(mean,0);
    flightAvg = flight.reduce(mean,0);
    dwellSD = standardDeviation(dwell);
    flightSD = standardDeviation(flight);
    $("#dwellAvg").val(dwellAvg.toFixed(2));
    $("#flightAvg").val(flightAvg.toFixed(2));
    $("#dwellSD").val(dwellSD.toFixed(2));
    $("#flightSD").val(flightSD.toFixed(2));
    $("#n1").val(dwell.length);
    $("#n2").val(flight.length);
    console.log(dwell);
    $("form").submit();

    up = [];
    down = [];
    dwell = [];
    flight = [];
    dwellAvg = 0;
    flightAvg = 0;
    dwellSD = 0;
    flightSD = 0;
}