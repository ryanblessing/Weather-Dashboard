//displaying current time for city
var time = moment();
var displayMoment = document.getElementById("current-time");
displayMoment.innerHTML = time.format("MMMM Do YYYY, h:m a");
var nowTime = moment().hours()