(function() {

  var lati;
  var long;
  var city;
  var state;
  var country;
  var latlon;
  var count = 0;
  var completedPlace;
  var cityCountry;
  var address1 = "1121%20Lady%20Carol%20Dr.";
  
  const document = window.document
  console.log(window)
  var h = window.innerHeight
  console.log(h);

  const $locationid = document.querySelector('#locationid')
  const $weatherid = document.querySelector('#weatherid')
  const $tempid = document.querySelector('#tempid')
  const $discid = document.querySelector('#discid')
    const placesAutocomplete = window.places({
      appId: 'plM1C22AF7T3',
      apiKey: '0d5f9f947ee21cf9bd711ab72ce5d8b9',
      container: document.querySelector('#address')
    });
    console.log(placesAutocomplete)
    const $address = document.querySelector('#address-value')
    placesAutocomplete.on('change', (e) => {
      $address.textContent = e.suggestion.value
      count = 0;
    });
  
    placesAutocomplete.on('clear', () => {
      $address.textContent = 'none';
      $locationid.textContent = '';
      $weatherid.textContent = '';
      $tempid.textContent = '';
      $discid.textContent = '';
      count = 0;
      
    });

    placesAutocomplete.on('change', (e) => {
      lati = e.suggestion.latlng.lat || '';
      if (Math.sign(e.suggestion.latlng.lng) == 1) {
          long = "+" + e.suggestion.latlng.lng;
      } else long = e.suggestion.latlng.lng;
      
      latlon = String(lati) + long;
      $weatherid.textContent = '';
      count = 0;
      completedPlace = e.suggestion.value;
    
    return cityResult = fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/locations/" + latlon + "/nearbyCities?limit=10&minPopulation=80000&radius=200", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "5179f5814dmsh5139c561fbe52afp1a5112jsn0ca7d3210219"
        } // make a 2nd request and return a promise
    }).then(response => {
    return response.json();
    }).then(data => {
      // console.log(data);
      let arrayLength = data.data.length;
      data.data.forEach(element => {
        // console.log(element);
        // console.log(element.city);
        city = element.city;
        state = element.regionCode;
        country = element.countryCode;
        lat = element.latitude;
        lon = element.longitude;
    
       weatherInfo = fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat  + "&lon=" + lon + "&appid=8266711937dd0c587290c3b4a86c6b7c", {
        method: 'get',
      }).then(response => {
         return response.json();
      }).then(data => {
        city = data.name;
        newCountry = data.sys.country;
        cityCountry = city + ", " + newCountry;
        let weatherCondition = data.weather[0].main;
        console.log(city + " " + weatherCondition)

        if (weatherCondition == "Rain" && $weatherid.textContent == '') {
        var location = "lat: " + data.coord.lat + " long: " + data.coord.lon;
        // $(".location").append(location);
    
        var weather = data.weather[0].main;
        $(".weather").hide().append("It is raining in " + city + ".").slideDown(1000);
    
        var temp = Math.round(data.main.temp) + "F°";
        $(".temp").hide().delay(500).append("<form action='http://maps.google.com/maps' method='get' target='_blank'><input type='hidden' name='saddr' value='" + completedPlace + "'/><input type='hidden' name='daddr' value='" + cityCountry + "' /><input type='submit' value='Get Directions' /></form>").slideDown(500);
        } 
        count++;
        // console.log(count);
        }).then(end => {
          if ($weatherid.textContent == '' && $tempid.textContent == "" && $locationid.textContent == "" && count == arrayLength) {
            $(".temp").hide().append("No Rain within 100 miles.").slideDown(1000);
            $(".disclaimer").hide().delay(800).append("These results may not be accurate due to <a href='http://geodb-cities-api.wirefreethought.com/pricing' target='_blank'>API request limitations</a>.").slideDown(1000);
          }
          })
        })
      })
    });

    $("#titlecontainer").hide().delay(3000).slideDown(1000);
    $(".searchbar").hide().delay(3400).slideDown(1000);
  
    var makeItRain = function() {
      //clear out everything
      $('.rain').empty();
    
      var increment = 0;
      var drops = "";
      var backDrops = "";
    
      while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      }
    
      $('.rain.front-row').append(drops);
      $('.rain.back-row').append(backDrops);
    }
    

    $('.splat-toggle.toggle').toggleClass('active');

    $('.back-row-toggle.toggle').toggleClass('active');
    
    
    makeItRain();
  
    


})();
  
  // ------------FAILED ATTEMPTS--------------

//     placesAutocomplete.on('change', (e) => {
//       lati = e.suggestion.latlng.lat || '';
//       long = e.suggestion.latlng.lng || '';
//       latlon = String(lati) + long;
      
//       console.log(latlon)

//     return cityResult = fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/locations/" + latlon + "/nearbyCities?limit=10&radius=200", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
//             "x-rapidapi-key": "5179f5814dmsh5139c561fbe52afp1a5112jsn0ca7d3210219"
//         } // make a 2nd request and return a promise
//   }).then(response => {
//     return response.json();
//   }).then(data => {
//     console.log(data)
//     for (i =0; i < 10; i++) {
//       console.log(data.data[i].city);
//       city = data.data[i].city;

//        weatherInfo = fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city  + ",tx,us&units=imperial&APPID=8266711937dd0c587290c3b4a86c6b7c", {
//         method: 'get',
//       }).then(response => {
//          return response.json();
//       }).then(data => {

//         let weatherCondition = data.weather[0].main
//         console.log(city + weatherCondition)
//         if (weatherCondition == "Rain") {
//         var location = "lat: " + data.coord.lat + " long: " + data.coord.lon;
//         $(".location").append(location);
  
//         var weather = data.weather[0].main;
//         $(".weather").append(weather);
  
//         var temp = Math.round(data.main.temp) + "F°";
//         $(".temp").append(temp);
//         }
        
//         })
      
//     }
    

//     })

// });

    
  

  // var result = fetch("https://us1.locationiq.com/v1/search.php?key=7110bd3965f2c9&q=" + address1 + "&format=json", {
  //     method: 'get',
  //   }).then(response => {
  //     return response.json(); // pass the data as promise to next then block
  //   }).then(data => {
  //     var latlon = (data[0].lat + data[0].lon);
  //     console.log(latlon);
  //     return cityResult = fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/locations/" + latlon + "/nearbyCities?radius=100", {
  //         "method": "GET",
  //         "headers": {
  //             "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  //             "x-rapidapi-key": "5179f5814dmsh5139c561fbe52afp1a5112jsn0ca7d3210219"
  //         } // make a 2nd request and return a promise
  //   }).then(response => {
  //     return response.json();
  //   }).then(data => {
  //     console.log(data.data[1].city);
  //     city = data.data[1].city;
  
  //     return weatherInfo = fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city  + ",tx,us&units=imperial&APPID=8266711937dd0c587290c3b4a86c6b7c", {
  //       method: 'get',
  //     }).then(response => {
  //       return response.json();
  //     }).then(data => {
  //       var location = "lat: " + data.coord.lat + " long: " + data.coord.lon;
  //       $(".location").append(location);
  
  //       var weather = data.weather[0].main;
  //       $(".weather").append(weather);
  
  //       var temp = Math.round(data.main.temp) + "F°";
  //       $(".temp").append(temp);
  //     })
  //   })
  // });

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
  