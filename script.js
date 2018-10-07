$(document).ready(function(){
    
    // This is an empty array so when a user searches a city, the city is added to the array to be added into local storage.
    var cityHistory = [];   

    // Defining the variable to GET the key "city"
    var lsCities = localStorage.getItem("city"); 
    
    // Parse the values in local storage
    if(lsCities !== null){
        cityHistory = JSON.parse(localStorage.getItem("city"));
    } 

    // Show the current weather data function 
    function showWeatherData (){
        
        // Variable for the value that was intered in the search bar
        var cityDataTwo = $(".searchBar").val();

        // API Query URL
        var queryURLTwo = "https://api.openweathermap.org/data/2.5/weather?q=" + cityDataTwo + "&appid=c64ae898096dd7b2fab2998d1d228df8"
        
        // AJAX CALL
        $.ajax({
            url: queryURLTwo,
            method: "GET"
            }).then(function(response) {
            
            // Get the temperature and convert it to fahrenheit
            var temp = response.main.temp
            var convertTemp = (temp - 273.15) * 1.80 + 32
            var wholeTemp = Math.floor(convertTemp)

            // Show the data in the cityData section 
            $(".temp").text("Temperature: " + wholeTemp + " Degrees F");
            $(".humidity").text("Humidity: "+response.main.humidity+"%");
            $(".windSpeed").text("Wind Speed: "+response.wind.speed+"mph"); 
            $(".UVIndex").text("UV Index: "+response.main.humidity);
            });
    }

    // getCity function will get the city the user enetered
    function getCity (){
        
        // on click event listener on the submit button
        $(".submitCity").click(function(event){
            event.preventDefault();

            // Variable for what city entered in the search bar
            var cityData = $(".searchBar").val();

            // API Query URL
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityData + "&appid=c64ae898096dd7b2fab2998d1d228df8"
            
            // AJAX CALL
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {

            // Define variable to use when a date format is queried 
            var date = dayjs().format("MM/DD/YYYY")
            
            // Show the data in the cityData section 
            $(".currentCity").text(response.city.name);
            var pTag = $("<p>")
            pTag.addClass("currentDate")
            $(".currentCity").append(pTag)
            $(".currentDate").text(date);
            
            // Call showWeatherData function
            showWeatherData();
            
            // Set the city the was entered into local storage
            localStorage.setItem("city", JSON.stringify(cityHistory));
            
            });
            
            // Push the city to the array
            cityHistory.push(cityData);

            // call createBtns function
            createBtns();

        })
    }

    // Creates the five day forecast in the bottom section of the dashboard
    function fiveDayForecast(){
        
        // on click for the submit button
        $(".submitCity").click(function(event){
        $(".fiveDayForecast").empty(); 
        event.preventDefault();
        
        // Get the city the user enetered
        var cityDataThree = $(".searchBar").val();

        // Query URL
        var queryURLThree = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityDataThree + "&cnt=5&appid=c64ae898096dd7b2fab2998d1d228df8"
        
        
        //AJAX CALL
        $.ajax({
            url: queryURLThree,
            method: "GET"
            }).then(function(response) {
            console.log(response)
            $(".fiveDayForecast").empty(); 
            
            // Going to loop through the array items in the response, get the data and display the data on cards.
            response.list.forEach(function(day){
            
                // convert date format
                var date = dayjs().format("MM/DD")

                // Create the card and add a class
                var createCard = $("<div>") 
                    createCard.addClass("col-xs-12 col-sm-2 rounded cards") 
                
                // Show the date
                var dateHeader = $("<p>") 
                    dateHeader.addClass("text-center display-1 dateHeader");
                    dateHeader.text(day.dt_text);
                    dateHeader.text(date);
                createCard.append(dateHeader); 

                // Show the weather icon
                var forecastImg = $("<img>")
                    forecastImg.addClass("weatherIcon");
                    forecastImg.attr("src", "https://openweathermap.org/img/w/" + day.weather[0].icon + ".png")
                    createCard.append(forecastImg);

                // Show the Temp
                var dayOneTemp = $("<p>")  
                    dayOneTemp.addClass("temp1")
                    dayOneTemp.text("Temp: "+day.main.temp)
                    createCard.append(dayOneTemp);
            
                // Show the humidity
                var dayOneHum = $("<p>")  
                    dayOneHum.addClass("hum1 hum")
                    dayOneHum.text("Humidity: "+day.main.humidity+"%")
                    createCard.append(dayOneHum);
               
               $(".fiveDayForecast").append(createCard) 
             })
            })
        });
    }

    // Create buttons from the cities that were called and put them below the search bar
    function createBtns(){
    $(".searchHistory").empty();

        // Loop the cityHistory Array
       for (var i = 0; i < cityHistory.length; i++) {
           // create and show the buttons as the cities from the array
            var cityHistoryBtn = $("<button>");
            cityHistoryBtn.addClass("cityHistoryBtn display-1");
            cityHistoryBtn.attr("data-name", cityHistory[i]);
            cityHistoryBtn.text(cityHistory[i]);
            $(".searchHistory").append(cityHistoryBtn);
            localStorage.setItem("city", JSON.stringify(cityHistory));
            }
            
        }
    
    //refresh the page as soon as the page loads. I've coded this to show data on clicks so I entered a value of Denver in the input so when the page loads, the value of Denver is "clicked" and shows the data. 
    $(document).ready(function(){
        $(".submitCity").trigger('click'); 
        $(".searchBar").attr("placeholder", "Enter City")
    });

    // Call main functions
    getCity();
    fiveDayForecast();
    createBtns();
});

