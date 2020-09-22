(function() {

  var lati;
  var long;
  var city;
  var state;
  var country;
  var latlon;
  var count = 0;
  var places;
  var i;
  var address1 = "1121%20Lady%20Carol%20Dr.";
  
  const document = window.document
  console.log(window)

  const $locationid = document.querySelector('#locationid')
  const $weatherid = document.querySelector('#weatherid')
  const $tempid = document.querySelector('#tempid')
    const placesAutocomplete = window.places({
      appId: 'plM1C22AF7T3',
      apiKey: '0d5f9f947ee21cf9bd711ab72ce5d8b9',
      container: document.querySelector('#address')
    });
    console.log(placesAutocomplete)
    const $address = document.querySelector('#address-value')
    placesAutocomplete.on('change', (e) => {
      $address.textContent = e.suggestion.value
      console.log("hello")
      count = 0;
      
    });
  
    placesAutocomplete.on('clear', () => {
      $address.textContent = 'none';
      $locationid.textContent = '';
      $weatherid.textContent = '';
      $tempid.textContent = '';
      count = 0;

      
    });

    placesAutocomplete.on('change', (e) => {
      lati = e.suggestion.latlng.lat || '';
      long = e.suggestion.latlng.lng || '';
      latlon = String(lati) + long;
      
      console.log(latlon)
    
    return cityResult = fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/locations/" + latlon + "/nearbyCities?limit=10&minPopulation=80000&radius=200", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "5179f5814dmsh5139c561fbe52afp1a5112jsn0ca7d3210219"
        } // make a 2nd request and return a promise
    }).then(response => {
    return response.json();
    }).then(data => {
      console.log(data)
      console.log(data.data)
      data.data.forEach(element => {
        console.log(element);
        console.log(element.city);
        city = element.city;
        state = element.regionCode;
        country = element.countryCode;
    
       weatherInfo = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city  + "," + state + "," + country + "&units=imperial&APPID=8266711937dd0c587290c3b4a86c6b7c", {
        method: 'get',
      }).then(response => {
         return response.json();
      }).then(data => {
        console.log(data)
        city = data.name
        let weatherCondition = data.weather[0].main;
        console.log(city + " " + weatherCondition)
        count++;
        console.log(count)
        if (weatherCondition == "Rain" && $weatherid.textContent == '') {
        var location = "lat: " + data.coord.lat + " long: " + data.coord.lon;
        $(".location").append(location);
    
        var weather = data.weather[0].main;
        $(".weather").append("It is raining in " + city);
    
        var temp = Math.round(data.main.temp) + "F°";
        count = 0;
        
        $(".temp").replaceAll(temp);
        } else if ($weatherid.textContent == '' && $tempid.textContent == "" && $locationid.textContent == "" && count <= 9) {
          $(".temp").append("No Rain within 100 miles.");
          count = 0;
        }
        
        })
      })
     })
    });
  
  
  



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
  