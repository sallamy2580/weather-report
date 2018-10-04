$(document).ready(function(){


    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=denver&appid=c64ae898096dd7b2fab2998d1d228df8"


    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    });

});

