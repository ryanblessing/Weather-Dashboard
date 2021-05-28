$(document).ready(function () {

    var cityName = "";
    var lat = "";
    var lon = "";

    //second api  
    function getWeatherAPI(a, b) {
        var secondURL = "api.openweathermap.org/data/2.5/weather?lat=" + a + "&lon=" + b + "&appid=6eecb087d2bed95fd59361a4c4bc50be";

        $.ajax({
            url: secondURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //clear our the 5 day forecast from last city
            $("#forecast").event.preventDefault()

            var weatherImgDisplay = response.current.weather[0].icon;
            var weatherImg = $("<img>");
            weatherImg.attr("src", /*find the stupid https to insert a dang image :/ */ )
            $("#city").append(weatherImg);

            ///get weather data to the html id
            $("#temp").text("temperature; " + response.current.temp + "F");
            $("#humidity").text("humidity; " + response.current.humidity + "%");
            $("#wind").text("Wind; " + response.current.wind + "mph");
            $("#uv-index").text("UV; " + response.current.uvi);

            $("#current-city").css({"display": "block"});

           //4 loop to go through the daily forecast

           var weekly = response.weekly;

           for(var i = 0; i < weekly.length; i++) {
               var weeklyDate = moment(weekly[i]).format("dddd, MMM Do, h:mm:ss a");
               var weeklyTemp = daily[i].temp.day;
               var weeklyHumidity = daily[i].humidity;
               //still need to find a image to insert up top for this data to work
               var weeklyWeatherImg = daily[i].weather[0].icon


               //creating the elements to insert forecast in and appending them
               var weeklyDiv = $("<div class='card-deck'>");
               var date = $("<h5>");
               var temp = $("<p>");
               var hum = $("<p>");
               var imageIcon = $("<img>");

               date.text(weeklyDate);
               temp.text("Temp: " + weeklyTemp +"F");
               hum.text("Humidity: " + weeklyHumidity + "%");

               weeklyDiv.append(date);
               weeklyDiv.append(temp);
               weeklyDiv.append(hum);
               
               $("#forecast").css({"display":"block"});


           }

        })


        // captures the city input and makes API 
        function findWeather() {
            var queryURL = "api.openweathermap.org/data/2.5/weather?id=" + cityName + "&lang=en&appid=6eecb087d2bed95fd59361a4c4bc50be";


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                lat = response.cords.lat;
                lon = response.cords.lon;

                $("#current-city").text(response.name);
                $("#date").text.moment().format("MMMM Do YYYY, h:mm:ss a");

                //local storage save
                localStorage.setItem("cityName", response.name);

                getWeatherAPI(lat, lon);
            })


        }
    }

    //to be able to save the searched cities in a list  option
    function savedCity() {
        cityName = localStorage.getItem("cityName");
        if (cityName === null) {
            var savedCityBLock = $("<button>");
            savedCityBLock.text(cityName);
            $("ul").append(savedCityBLock);

            function findWeather();
        }
    }
})