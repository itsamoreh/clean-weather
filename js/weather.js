//OWM API CALL http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=d25200ee6121cc410e754dbf6ffd0783

//initialize variables
var ip
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
  $.getJSON('//www.geoplugin.net/json.gp?jsoncallback=?', function(data) {
    //console.log(JSON.stringify(data, null, 2));
    currentLat = data.geoplugin_latitude;
    currentLong = data.geoplugin_longitude;

    path = 	"http://api.openweathermap.org/data/2.5/weather?lat=" +
            currentLat +
            "&lon=" +
            currentLong +
            "&APPID=d25200ee6121cc410e754dbf6ffd0783";

    getWeather();
  });

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
    var hours;
    if (date.getHours() > 12) {
      hours = (date.getHours() - 12);
    } else {
      hours = date.getHours();
    }
    $(".date").html("<span class='glyphicon glyphicon-calendar'></span> " + month + " " + date.getDate() + ", " + hours + ":" + minutes );

    //location
    $(".location").html("<span class='glyphicon glyphicon-map-marker'></span> " + weather.name);

    //temperature
    $(".temperature").html(Math.floor(json.main.temp - 273.15) + "&deg;C");

    //details
    $(".details").html(json.weather[0].description);

    //change background and icon according to weather
    switch (json.weather[0].icon) {
      case "01d":
        //change background
        bg.className = "clear";
        //change icon
        $(".icon").attr("data-icon", "B");
        break;
      case "01n":
        bg.className = "clear-n";
        $(".icon").attr("data-icon", "C");
        break;
      case "02d":
        bg.className = "partlyCloudy";
        $(".icon").attr("data-icon", "H");
        break;
      case "02n":
        bg.className = "partlyCloudy-n";
        $(".icon").attr("data-icon", "I");
        break;
      case "03d":
        bg.className = "cloudy";
        $(".icon").attr("data-icon", "N");
        break;
      case "03n":
        bg.className = "cloudy-n";
        $(".icon").attr("data-icon", "N");
        break;
      case "04d":
        bg.className = "cloudy";
        $(".icon").attr("data-icon", "N");
        break;
      case "04n":
        bg.className = "cloudy-n";
        $(".icon").attr("data-icon", "Y");
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        bg.className = "rainy";
        $(".icon").attr("data-icon", "R");
        break;
      case "11d":
      case "11n":
        bg.className = "lightning";
        $(".icon").attr("data-icon", "Z");
        break;
      case "13d":
      case "13n":
        bg.className = "snowy";
        $(".icon").attr("data-icon", "X");
        break;
      case "50d":
      case "50n":
        bg.className = "foggy";
        $(".icon").attr("data-icon", "M");
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
