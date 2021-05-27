$(document).ready(function () {
    var cityName = "";
    var lat = "";
    var lon = "";
    
//second api  
    function getWeatherAPI(a,b){
        var secondURL = "api.openweathermap.org/data/2.5/weather?lat=" + a + "&lon=" + b +"&appid=6eecb087d2bed95fd59361a4c4bc50be";

        $.ajax({
            url:secondURL,
            method: "GET"
    }).then(function(response) {
        console.log(response);

        //clear our the 5 day forecast from last city
        $("#forecast").event.preventDefault()

        var weatherImgDisplay = response.current.weather[0].icon;
        var weatherImg =$("<img>");
        weatherImg.attr("src", /*find the stupid https to insert a dang image :/ */)
        $("#city").append(weatherImg);
    })






// captures the city input and makes API 
    function findWeather() {
        var queryURL = "api.openweathermap.org/data/2.5/weather?id=" + cityName + "&lang=en&appid=6eecb087d2bed95fd59361a4c4bc50be";
        

        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function (response) {
            lat = response.cords.lat;
            lon = response.cords.lon;

            $("#current-city").text(response.name);
            $("#date").text.moment().format("MMMM Do YYYY, h:mm:ss a");

                //local storage save
            localStorage.setItem("cityName", response.name);

            getWeatherAPI(lat,lon);
        })
    
        
    }
    }})