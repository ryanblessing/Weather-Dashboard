var cityName = "";
var lat = "";
var lon = "";


//second api  
function getWeatherAPI(a, b) {
    var secondURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + a + "&lon=" + b + "&appid=6eecb087d2bed95fd59361a4c4bc50be";

    $.ajax({
        url: secondURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        ;
        var weekly = response.list.main;
        var currentDate = "";
    

        for (var i = 0; i < weekly.length; i++) {
            var currentDate = moment(weekly[i]).format("dddd, MMM Do, h:mm:ss a");
            if (weeklyDate === currentDate) {
                $(weekly[i]).attr("card-deck")
            }

            var weeklyTemp = list[i].temp.day;
            var weeklyHumidity = list[i].humidity;
            //still need to find a image to insert up top for this data to work
            var weatherImgDisplay = daily[i].weather[0].icon


            //creating the elements to insert forecast in and appending them
            var weeklyDiv = $("<div id=`weekly-div`>");
            var date = $("<h5>");
            var temp = $("<p>");
            var hum = $("<p>");;
            var weatherImgDisplay = $("<img>")


            date.text(weeklyDate);
            temp.text("Temp: " + weeklyTemp + "F");
            hum.text("Humidity: " + weeklyHumidity + "%");

            weeklyDiv.append(date);
            weeklyDiv.append(temp);
            weeklyDiv.append(hum);
            

            $("#forecast").css({
                "display": weekly
            });


        }

    })
}


// captures the city input and makes API 
function findWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&lang=en&appid=6eecb087d2bed95fd59361a4c4bc50be&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.dir($("#date"))

        lat = response.coord.lat;
        lon = response.coord.lon;

        $("#city").text(response.name);
        $("#date").text(moment().format("MMMM Do YYYY, h:mm:ss a"));

        var weatherImgDisplay = response.weather[0].icon;
        var weatherImg = $("<img>");
        weatherImg.attr("src", "http://openweathermap.org/img/wn/" + weatherImgDisplay + "@2x.png");
        $("#city").append(weatherImg);

        ///get weather data to the html id
        $("#temp").text("temp; " + response.main.temp + "F");
        $("#humidity").text("humidity; " + response.main.humidity + "%");
        $("#wind").text("Wind; " + response.wind.speed + "mph");


        //$("#uv-index").text("UV; " + response.uvi);
        localStorage.setItem("cityName", response.name);

        //should pass to next function
        getWeatherAPI(lat, lon);
    })


}


//to be able to save the searched cities in a list option
function savedCity() {
    cityName = localStorage.getItem("cityName");
    if (cityName !== null) {

        var savedCityBLock = $("<button>");
        savedCityBLock.text(cityName);
        $("ul").prepend(savedCityBLock);

        findWeather()
    }
}

function startBtn() {
    cityName = $("input").val().trim();

    //buttons are created as the user enters more cities in "search"
    var savedCityBLock = $("<button>");
    savedCityBLock.text(cityName);


    //buttons should be added and then saved/cleared 
    $("ul").prepend(savedCityBLock);
    $("input").val("");

    findWeather();
}

savedCity();


//submitting the form event when city is entered
$("#city-form").submit(function (event) {
    event.preventDefault();
    startBtn();
})

$("#submit-city").click(function (event) {
    console.log("run submit")
    event.preventDefault();
    startBtn();


    //click event listener
    $("ul").on("click", "button", function () {
        cityName = $(this).text();
        console.log(cityName);

        findWeather();
    })
})