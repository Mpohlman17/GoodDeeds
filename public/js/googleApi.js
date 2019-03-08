var googleTag = $(
  '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_uq660sOqIWpWFdN6tGwKUYR07jmx-Ww&callback=initMap">'
)
$('body').append(googleTag)

var map, infoWindow

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 9
  })
  infoWindow = new google.maps.InfoWindow()

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        infoWindow.setPosition(pos)
        infoWindow.setContent('Location found.')
        infoWindow.open(map)
        map.setCenter(pos)

        var marker1 = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Your chosen event'
        })
        // setting position of map
        marker1.setMap(map)
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter())
      }
    )
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }
}

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }

// function setCords(locationObject) {
//   latitude1 = locationObject.latitude;
//   longitude1 = locationObject.longitude;
// }
// function initMap() {
//   var eventLocation = {
//     lat: latitude1,
//     lng: longitude1
//   };
//   // actual map being created
//   var map = new google.maps.Map(document.getElementById("map"), {
//     center: eventLocation,
//     zoom: 15
//   });
//   // creating markers for map
//   var marker1 = new google.maps.Marker({
//     position: eventLocation,
//     map: map,
//     title: "Your chosen event"
//   });
//   // setting position of map
//   marker1.setMap(map);
// }
// var location1 = null;

function eventBrightCall() {
  //event to ask for user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        //getting location for google maps
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // getting location for eventBright
        lat1 = position.coords.latitude;
        lon1 = position.coords.longitude;

        //eventBright api

        const token = 'LTV5SOWTS6QBZF72VGDA'
        const eventBrightUrl =
          "'https://www.eventbriteapi.com/v3/events/search/?location.latitude=" + lat1 + "&location.longitude=" + lon1 + "&categories=111&token=" + token;
          console.log(eventBrightUrl)

        // const proxyUrl = "https://shielded-hamlet-43668.herokuapp.com/";
        $.ajax({
          async: false,
          url: eventBrightUrl,
          method: "GET"
        })
          .then(function(response) {
            for (let i = 0; i < response.events.length; i++) {
              console.log(response.events[i].name);
              console.log(response.events[i].coordinates);
              console.log(response.events[i].url);
            }
          })
          // .catch(error => {
          //   console.error(error);
          // });
        //event handlers for location error
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

eventBrightCall();
