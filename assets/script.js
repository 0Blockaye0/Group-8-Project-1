

var getEvents = function(artist) {

    var apiKey = "14101bf418a50454455bae74560f1204"
    
    var apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;
    
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

getEvents("Queen");

