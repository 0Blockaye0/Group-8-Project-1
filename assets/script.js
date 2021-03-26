

var getEvents = function() {

    var apiKey = " "
    
    var apiUrl = " " + apiKey;
    

    // make a request to the url
    fetch(apiUrl, header)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
          displayRepos(data, zip);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to ticketmaster");
    });
    
};

getEvents();

