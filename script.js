$(document).ready(function(){
    
   

   var cityHistory = [];
   var i = 0
   

  

    function showWeatherData (){
        var cityDataTwo = $(".searchBar").val();
        var queryURLTwo = "http://api.openweathermap.org/data/2.5/weather?q=" + cityDataTwo + "&appid=c64ae898096dd7b2fab2998d1d228df8"
        
        $.ajax({
            url: queryURLTwo,
            method: "GET"
            }).then(function(response) {
        
            $(".temp").text("Temperature: " + response.main.temp);
            $(".humidity").text("Humidity: "+response.main.humidity);
            $(".windSpeed").text("Wind Speed: "+response.wind.speed); 
            $(".UVIndex").text("UV Index: "+response.main.humidity);//need to get UV IP
            });
    }

    function logHistory(){
        
        $(".searchHistory").empty();      
        
       for (var i = 0; i < cityHistory.length; i++) {
        localStorage.setItem(i, cityHistory[i]);
        
        var cityHistoryBtn = $("<button>");
        cityHistoryBtn.addClass("cityHistoryBtn");
        cityHistoryBtn.attr("data-name", cityHistory[i]);
        cityHistoryBtn.text(cityHistory[i]);
         
        $(".searchHistory").append(cityHistoryBtn);
          
        }
    }
    
    
    function getCity (){
        
        $(".submitCity").click(function(event){
            event.preventDefault();
            var cityData = $(".searchBar").val();
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityData + "&appid=c64ae898096dd7b2fab2998d1d228df8"
            
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
            
            $(".currentCity").text(response.city.name);
            
            showWeatherData();
            
            
            });
            cityHistory.push(cityData);
            
            logHistory();
        })
    }

    function fiveDayForecast(){
        
        $(".submitCity").click(function(event){
        
        
        $(".fiveDayForecast").empty(); 
        event.preventDefault();

        var cityDataThree = $(".searchBar").val();
        var queryURLThree = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityDataThree + "&cnt=5&appid=c64ae898096dd7b2fab2998d1d228df8"
        
        $.ajax({
            url: queryURLThree,
            method: "GET"
            }).then(function(response) {
            console.log(response)
            $(".fiveDayForecast").empty(); 
            
            
            for (var i=0; i < response.list.length; i++){
                
                var createCard = $("<div>") 
                createCard.addClass("col-2 cards") 
                $(".fiveDayForecast").append(createCard) 

                var dateHeader = $("<p>") 
                dateHeader.addClass("text-center dateHeader") 
                $(".cards").append(dateHeader); 
                $(".dateHeader").text(response.list[i].dt_txt)
            
                var dayOneTemp = $("<p>")  
                dayOneTemp.addClass("text-center temp1 temp")
                $(".cards").append(dayOneTemp);
                $(".temp1").text(response.list[i].main.temp)
            
                var dayOneHum = $("<p>")  
                dayOneHum.addClass("text-center hum1 hum")
                $(".cards").append(dayOneHum);
                $(".hum1").text(response.list[i].main.humidity)
                 }
        
            })
        });
        
    }
    
    
    getCity();
    fiveDayForecast();
    
});

