$(document).ready(function(){
    
   
    function showWeatherData (){
        var cityDataTwo = $(".searchBar").val();
        var queryURLTwo = "http://api.openweathermap.org/data/2.5/weather?q=" + cityDataTwo + "&appid=c64ae898096dd7b2fab2998d1d228df8"
        
        $.ajax({
            url: queryURLTwo,
            method: "GET"
            }).then(function(response) {
            console.log(response);// response from api with all the data
            $(".temp").text("Temperature: " + response.main.temp);
            $(".humidity").text("Humidity: "+response.main.humidity);
            $(".windSpeed").text("Wind Speed: "+response.wind.speed); 
            $(".UVIndex").text("UV Index: "+response.main.humidity);//need to get UV IP
            });
    }
    
    
    function getCity (){
        $(".submitCity").click(function(){
            var cityData = $(".searchBar").val();
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityData + "&appid=c64ae898096dd7b2fab2998d1d228df8"
            
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
            console.log(response);// response from api with all the data
            
            $(".currentCity").text(response.city.name);
            showWeatherData();
            fiveDayForecast();
            });
        })
    }

    function fiveDayForecast(){
        var cityDataThree = $(".searchBar").val();
        var queryURLThree = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityDataThree + "&appid=c64ae898096dd7b2fab2998d1d228df8"
        
        $.ajax({
            url: queryURLThree,
            method: "GET"
            }).then(function(response) {
            console.log(response);// response from api with all the data
            fiveDayCards();
        });
    }

    function fiveDayCards(){
        var createCard = $("<div>")
            createCard.addClass("col-2 cards")
            $(".fiveDayForecast").append(createCard)

        var dateInCard = $("<h4>")
            dateInCard.addClass("text-center")
            $(".cards").text("Date");
            
    }
    
    getCity();
   
});

