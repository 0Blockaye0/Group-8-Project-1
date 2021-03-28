var userSearch = document.getElementById("search-container");

var trackArray = [];

likeCloudsArr = ["chill", "lazy", "gloom", "vapour", "haze"];
likeRainArr = ["wet", "damp", "pouring", "thunder", "storm", "peacful", "indoors", "flood"];
likeClear = [];
likeSunny = [];
likeSnow = [];



//////////////////////////////////////
/// currently only accepting "clouds" as a condition to get more tracks
var getSimilarTags = function(tag) {
  if (tag = "clouds") {
      newTag = likeCloudsArr[Math.floor(Math.random() * likeCloudsArr.length)];
      console.log(newTag);
      getMoreTracks(newTag);
  };
};
//////////////////////////////////////



var getMoreTracks = function (newTag) {
  //console.log(newTag);
  var apiKey = "14101bf418a50454455bae74560f1204";

  //var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.getSimilar&tag=${artist}&api_key=${apiKey}&format=json`
  var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${newTag}&api_key=${apiKey}&format=json`;
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${artist}&api_key=${apiKey}&format=json`
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data);
          trackArray.push(data.tracks.track);
          console.log(trackArray);
          
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the lastfm API for newTag");
    });
};

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
          // console.log(data.tracks.track[0]);
          trackArray.push(data.tracks.track);
          //console.log(trackArray);
          //console.log(weatherSearchTerm);
          getSimilarTags(weatherSearchTerm);
        
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
          return weatherSearchTerm;
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