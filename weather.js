var weather = require('./app');
var cities = process.argv.slice(2);
cities.forEach(weather.get);
