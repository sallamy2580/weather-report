$(document).ready(function(){
    
    function getCity (){
        $(".submitCity").click(function(){
            var cityData = $(".searchBar").val();
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityData + "&appid=c64ae898096dd7b2fab2998d1d228df8"
            
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
            console.log(response);
            showWeather();
        });
        })
    }
    
    getCity();

    function showWeather(){
        var cityData = $(".searchBar").val();
        $(".currentCity").text(cityData);
        //capitalize first letter
    }

   
});

