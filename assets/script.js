var userSearch = document.getElementById("search-container");

var trackArray = [];

var searchHistory = [];

likeHazeArr = ["hazey", "stoned", "dreamy", "space", "stellar"];

likeMistArr = ["reverb", "damp", "relaxing", "smooth"];

likeCloudsArr = [
  "chill",
  "lazy",
  "gloom",
  "vapour",
  "haze",
  "fog",
  "daze",
  "sad",
];

likeRainArr = [
  "wet",
  "damp",
  "pouring",
  "thunder",
  "storm",
  "peacful",
  "indoors",
  "flood",
  "lightning",
];

likeClearArr = ["air", "fresh", "open"];

likeSunnyArr = [
  "bright",
  "sunshine",
  "warm",
  "flowers",
  "blue sky",
  "hot",
  "heat",
  "beach",
  "summer",
];

likeSnowArr = ["cold", "winter", "peacfull", "ice", "blizzard", "snowy"];

likeDrizzleArr = ["beats", "chill", "cool", "vibe"];

var getSimilarTags = function (tag) {
  if (tag === "Clouds") {
    newTag = likeCloudsArr[Math.floor(Math.random() * likeCloudsArr.length)];
    console.log("the 2nd tag is :", newTag);
    getMoreTracks(newTag);
  } else if (tag === "Clear") {
    newTag = likeClearArr[Math.floor(Math.random() * likeClearArr.length)];
    console.log("the 2nd tag is :", newTag);
    getMoreTracks(newTag); 
  } else if (tag === "Rain") {
    newTag = likeRainArr[Math.floor(Math.random() * likeRainArr.length)];
    console.log("the 2nd tag is :", newTag);
    getMoreTracks(newTag);
  } else if (tag === "Sunny") {
    newTag = likeSunnyArr[Math.floor(Math.random() * likeSunnyArr.length)];
    console.log("the 2nd tag is :", newTag);
    getMoreTracks(newTag);
  } else if (tag === "Snow") {
    newTag = likeSnowArr[Math.floor(Math.random() * likeSnowArr.length)];
    console.log("the 2nd tag is :", newTag);
    getMoreTracks(newTag);
  } else if (tag === "Mist") {
    newTag = likeMistArr[Math.floor(Math.random() * likeMistArr.length)];
    console.log("the 2nd tag is :", newTag);
    getMoreTracks(newTag);
  } else if (tag === "Haze"){
    newTag = likeHazeArr[Math.floor(Math.random() * likeHazeArr.length)];
    console.log("the 2nd tag is :", newTag);
    getMoreTracks(newTag);
  };
};

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
          console.log("the tracks that were returned from the tags searched are: ", trackArray);
          pickTrack();
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
          trackArray = [];
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
  console.log("this city searched :", userInput);

  if (userInput) {
    getWeather(userInput);
    userSearchInputEl.value = "";
  } else {
    alert("please enter a city and state. Ex: 'Austin, TX'.");
  }

  var userInput = searchHistory.find( city => city.name === citySearch);
  console.log(userInput);
  
};

var getWeather = function (cityName, stateCode) {
  var apiKey = "d0f4ff36139913f4de0b35a854f44600";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&appid=${apiKey}`;

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log("this is the weather data: ", data);
          var weatherSearchTerm = data.weather[0].main;
          console.log("the current weatherSearchTerm that will be the 1st tag searched is : ", weatherSearchTerm);

          getTracks(weatherSearchTerm);
          return weatherSearchTerm;
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the weatherAPI");
    });
};

var getAlbum = function (currentMusic) {
  // console.log(currenMusic);
  var apiKey = "14101bf418a50454455bae74560f1204";

  // console.log(`${currentMusic.artist}`);

  var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${currentMusic.artist}&track=${currentMusic.track}&format=json`
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.getSimilar&tag=${artist}&api_key=${apiKey}&format=json`
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${newTag}&api_key=${apiKey}&format=json`;
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${artist}&api_key=${apiKey}&format=json`
  // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log("this is getAlbum data:", data);
          //console.log(data.track.album.title);
          if (!data || !data.track || !data.track.album || !data.track.album.title) {
            console.log("NO ALBUM DATA AVAILABLE ON THIS TRACK.");
            pickTrack();
          } else {
            var albumTitle = data.track.album.title;
            console.log("THE ALBUM IS: ", albumTitle)
            currentMusic.album = albumTitle;
            console.log(currentMusic);

            napsterSearch(currentMusic);
          };
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the lastfm API for album");
    });
}

var pickTrack = function () {
  var trackList = trackArray[Math.floor(Math.random() * trackArray.length)];
  console.log(trackList);

  var currentMusic = {
    track: "",
    artist: "",
    album: ""
  };

  var random = Math.floor(Math.random() * trackList.length);
  console.log(random);

  // if (trackList[random].)
  
  var trackName = trackList[random].name;
  console.log(trackName);

  var artist = trackList[random].artist.name;
  console.log(artist);

  currentMusic.track = trackName;
  currentMusic.artist = artist;
  console.log(currentMusic);

  getAlbum(currentMusic);

  

  // napsterSearch(artist, track);
};

var napsterSearch = function (currentMusic) {
console.log(currentMusic);

  var apiKey = "ODU0NGU2ZTQtZjExMC00YWM1LWExNWUtMGEyZmVmNWUyMzQ4";

  currentMusic.album = currentMusic.album.replace(/\s+/g, '-').toLowerCase();

  currentMusic.track = currentMusic.track.replace(/\s+/g, '-').toLowerCase();

  currentMusic.artist = currentMusic.artist.replace(/\s+/g, '-').toLowerCase();
  //artistNoSpaces.toLowerCase();
  console.log(currentMusic);
  
  ///////////////////////
  // replace space with dash '-'
  ///////////////////////

  //////////////http://api.napster.com/v2.2/tracks/weezer/weezer-blue-album-deluxe-edition/say-it-aint-so?apikey=
  var apiUrl = `http://api.napster.com/v2.2/tracks/${currentMusic.artist}/${currentMusic.album}/${currentMusic.track}?apikey=${apiKey}`;

  fetch(apiUrl)
  .then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        if (data.tracks.length === 0) {
          console.log("NO TRACKS SHOWED UP IN THE SEARCH");
          pickTrack();
        };
        var preview = data.tracks[0].previewURL;
        console.log(preview);
        if (!preview){
          console.log("THERE IS NO MP3 FOR THIS TRACK");
          pickTrack();
        };

        var audioEl = document.createElement("audio");
        console.log(audioEl);

        audioEl.setAttribute("src", preview);
        audioEl.setAttribute("controls", "contols");
        console.log(audioEl);

        var trackContainer = document.getElementById("artist-name-container");
        console.log(trackContainer);
        trackContainer.innerHTML = "Artist: " + currentMusic.artist +  "<br/> Album :" + currentMusic.album;
        trackContainer.appendChild(audioEl);

        var trackNameEl = document.getElementById("track-title");
        trackNameEl.innerHTML = currentMusic.track;

        // var albumEl = document.createElement("")
    
      });
    };  
  });
};





//var displayTracks = function (trackArray) {};

userSearch.addEventListener("submit", searchHandler);

//getWeather("Austin, TX");