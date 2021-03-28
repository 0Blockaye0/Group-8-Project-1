var userSearch = document.getElementById("search-container");

var getArtist = function(artist) {

    var apiKey = "14101bf418a50454455bae74560f1204"
    
    var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${artist}&api_key=${apiKey}&format=json`
    // var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;
    
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
          // function(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to the API");
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
    getArtist(userInput);
    userSearchInputEl.value = "";
  } else {
    alert("please enter an Artist");
  }
};


//getArtist("Jerry Garcia");




userSearch.addEventListener("submit", searchHandler);










// var getThis = function(variable) {
//   var apiKey = "9bfa8210942fcc00671aa6f4917ce745ee5f469d";
    
//   //var apiUrl = `http://api.music-story.com/en/release/search?release_date=${variable}&apiKey=${apiKey}`;

//   var getTokensApiUrl = `http://api.music-story.com/oauth/request_token?oauth_consumer_key=${apiKey}&oauth_signature=GET&http://api.music-story.com/oauth/request_token&<ENCODED PARAMETERS>`
  
//   // make a request to the url
//   fetch(apiUrl)
//   .then(function(response) {
//     // request was successful
//     if (response.ok) {
//       response.json().then(function(data) {
//           console.log(data);
//         // function(data);
//       });
//     } else {
//       alert("Error: " + response.statusText);
//     }
//   })
//   .catch(function(error) {
//     alert("Unable to connect to the API");
//   });
  
// };

// getThis("02/14/1990");

