//OWM API CALL http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=d25200ee6121cc410e754dbf6ffd0783

//initialize variables
var path;
var currentLat;
var currentLong;
var weather;

//HTML IDs
var bg = document.getElementById("bg");
var weatherBox = document.getElementById("weatherBox");
var button = document.getElementById("button");

//get location function
function getLocation() {
  if (navigator.geolocation) {
    //getCoordinates is run here
    navigator.geolocation.getCurrentPosition(getCoordinates);
  } else {
    alert("Cannot get your location.");
  }
}

function getCoordinates(position) {
  currentLat = (position.coords.latitude).toFixed(2);
  currentLong = (position.coords.longitude).toFixed(2);
  //currentLat = 36.16;
  //currentLong = -115.13;
  path = 	"http://api.openweathermap.org/data/2.5/weather?lat=" +
          currentLat +
          "&lon=" +
          currentLong +
          "&APPID=d25200ee6121cc410e754dbf6ffd0783";
  //getWeather run here
  getWeather();
}

function getWeather(){

  $.getJSON(path, function(json){

    weather = json;

    //remove button
    button.className = "details h2 text-light";

    //date
    var date = new Date();
    var month;
    switch (date.getMonth()) {
      case 0: month = "January"; break;
      case 1: month = "February"; break;
      case 2: month = "March"; break;
      case 3: month = "April"; break;
      case 4: month = "May"; break;
      case 5: month = "June"; break;
      case 6: month = "July"; break;
      case 7: month = "August"; break;
      case 8: month = "September"; break;
      case 9: month = "October"; break;
      case 10: month = "November"; break;
      case 11: month = "December"; break;
    }
    var minutes = date.getMinutes().toString();
    minutes = minutes.length < 2 ? '0' + minutes : minutes;
    $(".date").html("<span class='glyphicon glyphicon-calendar'></span> " + month + " " + date.getDate() + ", " + (date.getHours() - 12) + ":" + minutes );

    //location
    var cityPath = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + currentLat + "&lon=" + currentLong;
    $.getJSON(cityPath,function(json){
      $(".location").html("<span class='glyphicon glyphicon-map-marker'></span> " + json.address.suburb);
    });

    //temperature
    $(".temperature").html(Math.floor(json.main.temp - 273.15) + "&deg;C");

    //details
    $(".details").html(json.weather[0].description);

    //change background and icon according to weather
    switch (json.weather[0].icon) {
      case "01d":
      case "01n":
        //change background
        bg.className = "sunny";
        //change icon
        $(".icon").attr("data-icon", "B");
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "50d":
      case "50n":
        //change background
        bg.className = "cloudy";
        //change icon
        $(".icon").attr("data-icon", "N");
        break;
      case "04d":
      case "04n":
        //change background
        bg.className = "cloudy";
        //change icon
        $(".icon").attr("data-icon", "Y");
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
      case "11d":
      case "11n":
        //change background
        bg.className = "rainy";
        //change icon
        $(".icon").attr("data-icon", "R");
        break;
      case "13d":
      case "13n":
        //change background
        bg.className = "snowy";
        //change icon
        $(".icon").attr("data-icon", "X");
        break;
    } //end of switch

  }); //end getWeather

}

function toFarenheit() {
  $(".temperature").html(Math.floor(weather.main.temp * 9/5 - 459.67) + "&deg;F");
  $(".unitToggle").html("&deg; C ");
  $(".unitToggle").attr("onClick", "toCelsius()");
}

function toCelsius() {
  $(".temperature").html(Math.floor(weather.main.temp - 273.15) + "&deg;C");
  $(".unitToggle").html("&deg; F ");
  $(".unitToggle").attr("onClick", "toFarenheit()");
}
