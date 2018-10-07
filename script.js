$(document).ready(function(){
    
   var cityHistory = [];
   var lsCities = localStorage.getItem("city");
   
   // If we have cities in local storage, that shoukd replace the empty array above
   
       if(lsCities !== null){
    cityHistory = JSON.parse(localStorage.getItem("city"));
   
}

    function showWeatherData (){
        var cityDataTwo = $(".searchBar").val();
        var queryURLTwo = "http://api.openweathermap.org/data/2.5/weather?q=" + cityDataTwo + "&appid=c64ae898096dd7b2fab2998d1d228df8"
        
        $.ajax({
            url: queryURLTwo,
            method: "GET"
            }).then(function(response) {
        
            var temp = response.main.temp
            var convertTemp = (temp - 273.15) * 1.80 + 32
            var wholeTemp = Math.floor(convertTemp)
            $(".temp").text("Temperature: " + wholeTemp + " Degrees F");
            
            $(".humidity").text("Humidity: "+response.main.humidity+"%");
            $(".windSpeed").text("Wind Speed: "+response.wind.speed+"mph"); 
            $(".UVIndex").text("UV Index: "+response.main.humidity);//need to get UV IP
            });
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
            
            var date = dayjs().format("MM/DD/YYYY")
            
            $(".currentCity").text(response.city.name);

            var pTag = $("<p>")
            pTag.addClass("currentDate")
            $(".currentCity").append(pTag)
            $(".currentDate").text(date);
            
            showWeatherData();
            localStorage.setItem("city", JSON.stringify(cityHistory));
            
            });
            cityHistory.push(cityData);
            createBtns();

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
            
            
            // for (var i=0; i < response.list.length; i++)
            response.list.forEach(function(day){
            
                var date = dayjs().format("MM/DD")

                // Create the card
                var createCard = $("<div>") 
                    createCard.addClass("col-2 rounded cards") 
                
                // Create the date header fir the card
                var dateHeader = $("<p>") 
                    dateHeader.addClass("text-center dateHeader")
                    dateHeader.text(date)
                    dateHeader.text(day.dt_text)
                    
                createCard.append(dateHeader); 

                var forecastImg = $("<img>")
                    forecastImg.addClass("weatherIcon");
                    forecastImg.attr("src", "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png")
                    createCard.append(forecastImg);

                // Create day one temp
                var dayOneTemp = $("<p>")  
                    dayOneTemp.addClass("temp1")
                    dayOneTemp.text("Temp: "+day.main.temp)
                    createCard.append(dayOneTemp);
            
                // Create day one hum
                var dayOneHum = $("<p>")  
                    dayOneHum.addClass("hum1 hum")
                    dayOneHum.text("Humidity: "+day.main.humidity+"%")
                    createCard.append(dayOneHum);
               
               $(".fiveDayForecast").append(createCard) 

                

             })
            })
        });
    }


    function createBtns(){
    $(".searchHistory").empty();
       for (var i = 0; i < cityHistory.length; i++) {
            var cityHistoryBtn = $("<button>");
            cityHistoryBtn.addClass("cityHistoryBtn");
            cityHistoryBtn.attr("data-name", cityHistory[i]);
            cityHistoryBtn.text(cityHistory[i]);
            $(".searchHistory").append(cityHistoryBtn);
            localStorage.setItem("city", JSON.stringify(cityHistory));
            }
        }
     getCity();
    fiveDayForecast();
   createBtns();
});

