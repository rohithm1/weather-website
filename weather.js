function Weather() {
  //instantiate needed keys and urls to get later API calls
  var apiKey2 = "d965e8bc344b511c07399993f53aa93f";
  var openweather = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  var location = document.getElementById("location");
  var apiKey1 = "f3ef0dfc1ddca61f3fa5d8ac1feff375";
  var darksky = "https://api.darksky.net/forecast/";
  var apiKey2 = "d965e8bc344b511c07399993f53aa93f";
  //gets the current lat lon og the device
  navigator.geolocation.getCurrentPosition(success, error);

  //if the call was successful
  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    //print out where the user is
    current.innerHTML =
      "Current Overview";
    location.innerHTML =
      "Latitude is " + latitude + "° Longitude is " + longitude + "°";


    //API call
    $.getJSON(
      darksky + apiKey1 + "/" + latitude + "," + longitude + "?callback=?",
      function(data) {
        //grabs the termp and minutely data from darksky
        $("#temp").html(data.currently.temperature + "° F");
        $("#minutely").html(data.minutely.summary);
      }
    );
    forecast.innerHTML =
      "Next Week Forecasted Weather";


    //API call for the forecasted weather - from openweather data
    $.ajax({
      url: openweather + latitude + "&lon=" + longitude, //API Call
      dataType: "json",
      type: "GET",
      data: {
        appid: apiKey2,
        units: "imperial", //fahrenheit
        cnt: "7" //7 days
      },
        success: function(data) {
          loc = "<h2>" + "You are in " + data.city.name + "! </h2>";
          $("#loc").html(loc);

          //for each day
          $.each(data.list, function(index, val) {
            index = index + 1;
            var day = "Day " + index + ": " // Day
            $("#day" + index).html(day);
            var temp = val.main.temp + "&degF" // Temperature
            $("#temp" + index).html(temp);
            var description = "<span> " + val.weather[0].description + "</span>"; // Description
            $("#description" + index).html(description);
            var image = "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
            $("#pic" + index).html(image);
          });
        }
      });
  }
  
  //if it didnt work
  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }


  location.innerHTML = "Locating...";
}
Weather();
