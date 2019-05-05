import * as $ from 'jquery';

function weather() {
  // instantiate needed keys and urls to get later API calls
  const apiKey2 = 'd965e8bc344b511c07399993f53aa93f';
  const openweather = 'https://api.openweathermap.org/data/2.5/forecast?lat=';
  const location = document.getElementById('location');
  const apiKey1 = 'f3ef0dfc1ddca61f3fa5d8ac1feff375';
  const darksky = 'https://api.darksky.net/forecast/';

  // if the call was successful
  function success(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const current = $('#current');
    const forecast = $('#forecast');

    // print out where the user is
    current.innerHTML = 'Current Overview';
    location.innerHTML = `Latitude is ${latitude}° Longitude is ${longitude}°`;


    // API call
    $.getJSON(
      `${darksky + apiKey1}/${latitude},${longitude}?callback=?`,
      (data) => {
        // grabs the termp and minutely data from darksky
        $('#temp').html(`${data.currently.temperature}° F`);
        $('#minutely').html(data.minutely.summary);
      },
    );

    forecast.innerHTML = 'Next Week Forecasted Weather';

    // API call for the forecasted weather - from openweather data
    $.ajax({
      url: `${openweather + latitude}&lon=${longitude}`, // API Call
      dataType: 'json',
      type: 'GET',
      data: {
        appid: apiKey2,
        units: 'imperial', // fahrenheit
        cnt: '7', // 7 days
      },
      success(data) {
        const loc = `${'<h2>' + 'You are in '}${data.city.name}! </h2>`;
        $('#loc').html(loc);

        // for each day
        $.each(data.list, (index, val) => {
          const day = `Day ${index + 1}: `; // Day
          $(`#day${index + 1}`).html(day);
          const temp = `${val.main.temp}&degF`; // Temperature
          $(`#temp${index + 1}`).html(temp);
          const description = `<span> ${val.weather[0].description}</span>`; // Description
          $(`#description${index + 1}`).html(description);
          const image = `<img src='https://openweathermap.org/img/w/${val.weather[0].icon}.png'>`; // Icon
          $(`#pic${index + 1}`).html(image);
        });
      },
    });
  }

  // if it didnt work
  function error() {
    location.innerHTML = 'Unable to retrieve your location';
  }

  // gets the current lat lon og the device
  navigator.geolocation.getCurrentPosition(success, error);

  location.innerHTML = 'Locating...';
}

weather();
