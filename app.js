var http = require('http');
//Application that will receive weather forecast by city or country
// var city = 'Tbilisi';


//Print message (with green color)
function printMessage(city, temperature, weather) {
  var message = 'In ' + city + ' there is ' + temperature + '°C and '+weather;
  console.log(message);
}

//Print error message (with red color)
function printError(error) {
  var message = error.message;
  console.log(message);
}

//Get data from API api.openweathermap.org/data/2.5/weather?q={city name},{country code}
function getWeather(city) {
  // Write your API Key here
  var apiKey;
  var request = http.request('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+apiKey, function(response) {
    var body = "";

    // Read the data
    response.on('data', function (chunk){
      body += chunk;
    });

    response.on('end', function(){
      if (response.statusCode === 200) {
        try {
          // Parse the data
          var forecast = JSON.parse(body);

          // Print the data
          printMessage(forecast.name, forecast.main.temp, forecast.weather[0].main)
        } catch(error) {
          printError(error);
        }
      } else {
        printError({message: "There was an error"});
      }
    });
  });

  request.end();

  // Connection Error
  request.on('error', printError)
}

// Module Export
module.exports.get = getWeather;
