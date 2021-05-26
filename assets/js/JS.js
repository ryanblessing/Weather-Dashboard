//declared varibles to start off my functions
var citySearch = $("#searchEl");
var searchBtn = $("#search-btn");
var currentCity = $("#now-city");
var temperature = $("#temperature");
var humidity = $("#humidity");
var windSpeed = $("wind-speed");
var uvIndex = $("#uv-index");
var city = "";
var cityEl = [];

//4 loop to find new cities
for(var i= 0; i < cityEl.length; i++)

//set up my api keys and my URL
var APIKey = "6eecb087d2bed95fd59361a4c4bc50be";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

$.ajax({
    url:queryURL,
    method:"GET",
}).then(function(response) {

    console.log(response);
})

// set up function to display the current weather of the city
function searchCity()



function displayWeather()




function nowWeather()




// display the 5 day forecast for whatever city is selected with a 4 loop



// display all search history




//

