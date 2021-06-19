let map, marker, markers;
const center = { lat: 37.29338200566287, lng: 127.20284284779422 }
let lastLocation = { lat: 37.29338200566287, lng: 127.20284284779422 }
var data = {sender: null, timestamp: null, lat: null, lng: null};

function addToFirebase(data) {
  data.timestamp = firebase.database.ServerValue.TIMESTAMP;
  var ref = firebase.database().ref('locations').push(data, function(err) {
    if (err) {  // Data was not written to firebase.
      console.warn(err);
    }
  });
}

function updateLastlocation(data) {
  data.timestamp = null;
  var locationRef = firebase.database().ref('location');
  locationRef.update(data);
}


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.29338200566287, lng: 127.20284284779422 },
    zoom: 15,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off POI.
    },
    {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus, train stations etc.
    }],
    disableDoubleClickZoom: true,
    streetViewControl: false,
  });
  
  map.addListener('click', function(e) {
    console.log(`Lat is ${e.latLng.lat()} and Lng is ${e.latLng.lng()}`);
    data.lat = e.latLng.lat();
    data.lng = e.latLng.lng();
    addToFirebase(data);
    updateLastlocation(data);
  });
  
  // marker = new google.maps.Marker({
  //   position: center,
  //   map: map,
  // });
}

// Bindings on load.
window.addEventListener('load', function () {
 
  const image =
    "https://cdn.glitch.com/37d9e42b-5b4d-4b17-9e77-c177a73cd5ec%2Fdasol.png?v=1621847826305";
  
  var locationRef = firebase.database().ref('location');
  locationRef.on('value', function (snapshot) {
    console.log(`location value is ${snapshot.val().lng}`);
    
    let newMaker = { lat: snapshot.val().lat, lng: snapshot.val().lng }

    if (marker != null)
      marker.setMap(null);
    
    marker = new google.maps.Marker({
      position: newMaker,
      map: map,
      icon: image,
    });
    
    // marker.setMap(map);
    
    map.setCenter(marker.getPosition());
    
  });
  
  
  var locationsRef = firebase.database().ref('locations');
  locationsRef.once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();   
    
    console.log(`Location at ${childData.lng} and ${childData.lat}`);
    
    let newMaker = { lat: childSnapshot.val().lat, lng: childSnapshot.val().lng }

    markers = new google.maps.Marker({
      position: newMaker,
      map: map
    });
    
    // markers.setMap(null);
   
  });
});

}, false);