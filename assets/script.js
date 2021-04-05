
var userSearchContainer = document.getElementById("search-container");
var searchBtn = document.getElementById("search-button")

var recentLocationFormEl = document.createElement("form");
userSearchContainer.appendChild(recentLocationFormEl);

var recentLocationBtn = document.createElement("button");
recentLocationBtn.className = "uk-button uk-button-default";
recentLocationBtn.setAttribute("id", "recent-location");
// console.log(recentLocationBtn);

function checkRecentLocation() {
  var recentLocation = localStorage.getItem("recentLocation");
  // console.log(recentLocation);
  if (recentLocation) {
    recentLocationBtn.innerHTML = recentLocation;
    recentLocationFormEl.appendChild(recentLocationBtn);
  };
};

checkRecentLocation();

var autoFillSearch = function (event) {
  event.preventDefault();
  console.log("autoFillSearch has been called");
  var userSearchInputEl = document.getElementById("search-input");
  // // console.log(userSearchInputEl);

  // var userInput = userSearchInputEl.value.trim();
  // console.log("this city searched :", userInput);

  var recentLocation = localStorage.getItem("recentLocation");
  console.log(recentLocation);
  userSearchInputEl.value = recentLocation;
};

// var modalPrompt = function (dialog, title) {
//   var modalEl = document.createElement("div");
//   modalEl.setAttribute("class", "uk-modal uk-alert uk-alert-warning");
  
//   var modalDialogEl = document.createElement("div");
//   modalDialogEl.setAttribute("class", "uk-modal-dialog uk-modal-body");
  
//   var modalTitle = document.createElement("h2");
//   modalTitle.setAttribute("class", "uk-modal-title");
//   modalTitle.textContent = title;
//   modalDialogEl.appendChild(modalTitle);

//   var modalDialog = document.createElement("p");
//   modalDialog.textContent = dialog;

//   var closeBtn = document.createElement("button");
//   closeBtn.setAttribute("class", "uk-modal-close");
//   closeBtn.setAttribute("type", "button");
//   modalDialog.appendChild(closeBtn);

//   modalEl.toggleAttribute()
// };

var trackArray = [];

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


var searchHandler = function (event, ) {
  event.preventDefault();
  console.log("handler has been called");

  var userSearchInputEl = document.getElementById("search-input");
  // console.log(userSearchInputEl);

  var userInput = userSearchInputEl.value.trim();
  console.log("this city searched :", userInput);

  if (userInput) {
    getWeather(userInput);
    localStorage.setItem("recentLocation", userInput);
    userSearchInputEl.value = "";
  } else {
    // modalPrompt("please enter a city and state. Ex: 'Austin, TX'.", "invalid Format!");
    alert("please enter a city and state. Ex: 'Austin, TX'.");
  }
  var searchedCityEl = document.getElementById("searched-city"); 
  searchedCityEl.innerHTML = "Location: " + userInput;
};

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
  var apiUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${newTag}&api_key=${apiKey}&format=json`;
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
  var apiUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${weatherSearchTerm}&api_key=${apiKey}&format=json`;
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
          weatherTemp = (((data.main.temp-273.15)*9)/5)+32;
          console.log("the current weatherSearchTerm that will be the 1st tag searched is : ", weatherSearchTerm);
          var searchedCityEl = document.getElementById("searched-city"); 
          searchedCityEl.innerHTML = searchedCityEl.innerHTML +  "<br/> Weather: " + weatherSearchTerm +  "<br/> Temperature: " + Math.round(weatherTemp);
          console.log(data.weather[0].icon);

          var iconCode = data.weather[0].icon;
          var iconEl = document.createElement("img");
          iconEl.setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
          searchedCityEl.appendChild(iconEl);

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

var pickTrack = function () {

  var trackList = [];

  for (i = 0; i < trackArray.length; i++) {
    trackArray[i].forEach(element => {
      trackList.push(element);
      // console.log(trackList);
    });
  };
  
  // var trackList = trackArray[Math.floor(Math.random() * trackArray.length)];
  console.log(trackList);

  var currentMusic = {
    track: "",
    artist: "",
    album: "",
    image: ""
  };

  var random = Math.floor(Math.random() * trackList.length);
  console.log(random);

  // if (trackList[random].)
  
  var trackName = trackList[random].name;
  console.log(trackName);

  var artist = trackList[random].artist.name;
  console.log(artist);

  var imageObj = trackList[random].image[0];
  // console.log(Obj);
  console.log(Object.values(imageObj));
  var imagePng = Object.values(imageObj)  
  console.log(imagePng);


  currentMusic.track = trackName;
  currentMusic.artist = artist;
  currentMusic.image = imagePng[0];
  console.log(currentMusic);

  getAlbum(currentMusic);

  

  // napsterSearch(artist, track);
};

var getAlbum = function (currentMusic) {
  // console.log(currenMusic);
  var apiKey = "14101bf418a50454455bae74560f1204";

  // console.log(`${currentMusic.artist}`);

  var apiUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${currentMusic.artist}&track=${currentMusic.track}&format=json`
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
};

var napsterSearch = function (currentMusic) {
  console.log(currentMusic);
  currentMusic.album = currentMusic.album.replace(/\s+/g, '-').toLowerCase();
  currentMusic.track = currentMusic.track.replace(/\s+/g, '-').toLowerCase();
  currentMusic.artist = currentMusic.artist.replace(/\s+/g, '-').toLowerCase();
  console.log(currentMusic);
  
  var apiKey = "ODU0NGU2ZTQtZjExMC00YWM1LWExNWUtMGEyZmVmNWUyMzQ4";
  var apiUrl = `https://api.napster.com/v2.2/tracks/${currentMusic.artist}/${currentMusic.album}/${currentMusic.track}?apikey=${apiKey}`;
  // var apiUrlImage = ``

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

        // GETS ALBULM ID FOR ALBUM ARTWORK SEARCH 
        var albumID = data.tracks[0].albumId.substring(0,1).toUpperCase() + data.tracks[0].albumId.substring(1);
        console.log(albumID);

        var getAlbumArt = function(albumID) {

          apiKey = "ODU0NGU2ZTQtZjExMC00YWM1LWExNWUtMGEyZmVmNWUyMzQ4";
          apiUrl = `https://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;
        
          fetch(apiUrl)
                  .then(function (response) {
                    if (response.ok) {
                      response.json().then(function (data) {
                        console.log(data);
        
                        currentMusic.image = data.images[0].url;
                        console.log(currentMusic);

                        var imageEl = document.createElement("img");
                        imageEl.className = "albumArt";
                        imageEl.setAttribute("src", currentMusic.image);
                        imageEl.setAttribute("alt", "no image available");
                        musicInfoList.appendChild(imageEl);
                      });
                    };
                  });
        };

        // var btnHolder = document.getElementsByClassName("btn-holder");
        // console.log(bt)

        // clearElements(btnHolder);

        // var skipBtn = document.createElement("button");
        // skipBtn.setAttribute("class", "uk-icon");
        // skipBtn.setAttribute("uk-icon","chevron-double-right");
        // btnHolder.appendChild(skipBtn);

        var musicInfoList = document.createElement("ul");
        var displayCard = document.getElementById("search-container");

        getAlbumArt(albumID);

        displayCard.appendChild(musicInfoList);

        currentMusic.album = currentMusic.album.replace('-', " ").toLowerCase();
        currentMusic.track = currentMusic.track.replace('-', " ").toLowerCase();
        currentMusic.artist = currentMusic.artist.replace('-', " ").toLowerCase();
        console.log(currentMusic);
        
        var trackNameEl = document.createElement("li");
        trackNameEl.setAttribute("class", "uk-card-title card-title");
        trackNameEl.setAttribute("id", "track-title");
        trackNameEl.innerHTML = currentMusic.track;
        musicInfoList.appendChild(trackNameEl);

        var artistNameEl = document.createElement("li");
        //console.log(artistNameEl);
        artistNameEl.setAttribute("id", "artist-name");
        artistNameEl.innerHTML = "Artist: " + currentMusic.artist;
        musicInfoList.appendChild(artistNameEl);

        var albumNameContainer = document.createElement("li");
        // console.log(albumNameContainer);
        albumNameContainer.innerHTML = "Album: " + currentMusic.album;
        musicInfoList.appendChild(albumNameContainer);

        var audioEl = document.createElement("audio");
        // console.log(audioEl);
        audioEl.setAttribute("src", preview);
        audioEl.setAttribute("controls", "contols");
        // console.log(audioEl);
        displayCard.appendChild(audioEl);
        // var albumEl = document.createElement("")
      });
    };  
  });
};

// var clearElements = function (element) {
//   element.innerHTML = "";
// };

userSearchContainer.addEventListener("submit", searchHandler);

recentLocationFormEl.addEventListener("submit", autoFillSearch);

//getWeather("Austin, TX");