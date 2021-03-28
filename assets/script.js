var userSearch = document.getElementById("search-container");

var getTracks = function (weatherSearchTerm) {
  var apiKey = "14101bf418a50454455bae74560f1204";

  //var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.getSimilar&tag=${artist}&api_key=${apiKey}&format=json`
  var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${weatherSearchTerm}&api_key=${apiKey}&format=json`;
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${artist}&api_key=${apiKey}&format=json`
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // function(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the lastfm API");
    });
};

var searchHandler = function (event) {
  event.preventDefault();
  console.log("handler has been called");

  var userSearchInputEl = document.getElementById("search-input");
  console.log(userSearchInputEl);

  var userInput = userSearchInputEl.value.trim();
  console.log(userInput);

  if (userInput) {
    getWeather(userInput);
    userSearchInputEl.value = "";
  } else {
    alert("please enter a city and state. Ex: 'Austin, TX'.");
  }
};

userSearch.addEventListener("submit", searchHandler);

var getWeather = function(cityName, stateCode) {
  var apiKey = "d0f4ff36139913f4de0b35a854f44600";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&appid=${apiKey}`;

  // make a request to the url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
          console.log("this is the weather data: ", data);
          var weatherSearchTerm = data.weather[0].main;
          console.log(weatherSearchTerm);

          getTracks(weatherSearchTerm);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect to the weatherAPI");
  });

};

//getWeather("Austin, TX");