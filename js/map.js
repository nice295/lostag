let map, marker;
const center = { lat: 37.29338200566287, lng: 127.20284284779422 }

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.29338200566287, lng: 127.20284284779422 },
    zoom: 16,
  });
  
  // marker = new google.maps.Marker({
  //   position: center,
  //   map: map,
  // });
}

// Bindings on load.
window.addEventListener('load', function () {
 
  var locationRef = firebase.database().ref('location');
  locationRef.on('value', function (snapshot) {
    console.log(`location value is ${snapshot.val().longitude}`);
    
    let newMaker = { lat: snapshot.val().latitude, lng: snapshot.val().longitude }
    marker = new google.maps.Marker({
      position: newMaker,
      map: map,
    });
  });

}, false);

