
var lati;
var long;
var city;
var latlon;
var places;

//need to find out how to replace spaces with %20 and commas with %2C or just find a address form online
var address1 = "1121%20Lady%20Carol%20Dr.";


var result = fetch("https://us1.locationiq.com/v1/search.php?key=7110bd3965f2c9&q=" + address1 + "&format=json", {
    method: 'get',
  }).then(response => {
    return response.json(); // pass the data as promise to next then block
  }).then(data => {
    var latlon = (data[0].lat + data[0].lon);
    console.log(latlon);
    return cityResult = fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/locations/" + latlon + "/nearbyCities?radius=100", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "5179f5814dmsh5139c561fbe52afp1a5112jsn0ca7d3210219"
        } // make a 2nd request and return a promise
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data.data[1].city);
    city = data.data[1].city;
    return weatherInfo = fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city  + ",tx,us&units=imperial&APPID=8266711937dd0c587290c3b4a86c6b7c", {
      method: 'get',
    }).then(response => {
      return response.json();
    }).then(data => {
      var location = "lat: " + data.coord.lat + " long: " + data.coord.lon;
      $(".location").append(location);

      var weather = data.weather[0].main;
      $(".weather").append(weather);

      var temp = Math.round(data.main.temp) + "F°";
      $(".temp").append(temp);
    })
  })
});


// -----------FAILED ATTEMPTS-------------
// function getLatLon(callback) {
//     var temp = $.getJSON("https://us1.locationiq.com/v1/search.php?key=7110bd3965f2c9&q=" + address + "&format=json", function(data){
            
//             lati = data[0].lat;
//             long = data[0].lon;
//             callback(lati + long);
            
//     });
// }

// function findNearbyCities(){

//     getLatLon(function(data){
//         console.log(data)
//         console.log(typeof data);

//         // -------This API inputs the lat and long of the users location and finds the nearby cities--------
//         var settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/locations/" + data + "/nearbyCities?radius=100",
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
//                 "x-rapidapi-key": "5179f5814dmsh5139c561fbe52afp1a5112jsn0ca7d3210219"
//             }
//         }

//         $.ajax(settings).done(function (response) {
//             console.log(response);
//             console.log(response.data[0].city);
//             city = response.data[0].city;
//         });

//     });
//     console.log('i am executed before anything else');
// }

// findNearbyCities();
// console.log(city); //does not work because asynchronous

// -----Promise-----
// let getLatLonPromise = new Promise(function(resolve,reject) {

//      function getLatLon() {
//         var temp = $.getJSON("https://us1.locationiq.com/v1/search.php?key=7110bd3965f2c9&q=" + address + "&format=json", function(data){
                
//                 lati = data[0].lat;
//                 long = data[0].lon;
                
                
//         });
//     }

// })

// ----Fetch API-----
// fetch("https://us1.locationiq.com/v1/search.php?key=7110bd3965f2c9&q=" + address + "&format=json")
//     .then(res => res.json())
//     .then(data => latlon = (data[0].lat + data[0].lon))
//     .then(citiesnearme => {
//                 // -------This API inputs the lat and long of the users location and finds the nearby cities--------
//                 var settings = {
//                     "async": true,
//                     "crossDomain": true,
//                     "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/locations/" + latlon + "/nearbyCities?radius=100",
//                     "method": "GET",
//                     "headers": {
//                         "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
//                         "x-rapidapi-key": "5179f5814dmsh5139c561fbe52afp1a5112jsn0ca7d3210219"
//                     }
//                 }
        
//                 $.ajax(settings).done(function (response) {
//                     console.log(response);
//                     console.log(response.data[4].city);
//                     city = response.data[4].city;
//                 });
                
//     })
//     .then(weatherinfo => {
//         $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",tx,us&units=imperial&APPID=8266711937dd0c587290c3b4a86c6b7c", function(data){
//     console.log(data);

//     var location = "lat: " + data.coord.lat + " long: " + data.coord.lon;
//     $(".location").append(location);

//     var temp = Math.round(data.main.temp);
//     $(".temp").append(temp);

//     var weather = data.weather[0].main;
//     $(".weather").append(weather);

//         })
//     })

// ------This API gets the weather data of the nearby cities--------
// $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Coppell,tx,us&units=imperial&APPID=8266711937dd0c587290c3b4a86c6b7c", function(data){
//     console.log(data);

//     var location = "lat: " + data.coord.lat + " long: " + data.coord.lon;
//     $(".location").append(location);

//     var temp = Math.round(data.main.temp);
//     $(".temp").append(temp);

//     var weather = data.weather[0].main;
//     $(".weather").append(weather);

// })

