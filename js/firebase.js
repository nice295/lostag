'use strict';

// Bindings on load.
window.addEventListener('load', function () {

//   var fanRunRef = firebase.database().ref('fan/run');
//   fanRunRef.on('value', function (snapshot) {
//     console.log(`run value is ${snapshot.val()}`);

//     $('#js-move-run').removeClass('btn-danger btn-secondary');
//     $('#js-move-stop').removeClass('btn-danger btn-secondary');
    
//     if (snapshot.val() == true) {
//       $('#js-move-run').addClass('btn-danger');
//     }
//     else {
//       $('#js-move-stop').addClass('btn-danger');
//     }
//   });

//   $('#js-move-run').click(function (){
//     console.log(`js-move-run clicked`);
//     fanRunRef.set(true);
//   });

//   $('#js-move-stop').click(function (){
//     console.log(`js-move-stop clicked`);
//     fanRunRef.set(false);
//   });


  //유러피안어드벤처 - 37.29140467051707, 127.20018947041493
  //로스트밸리- 37.29193336025852, 127.20782870376418
  //판다월드 - 37.293436016625634, 127.20274316522656
  var location1 = {
    // name: '유러피안어드벤처',
    longitude: '37.29140467051707',
    latitude: '127.20018947041493',
    mac: 'aa:bb:cc:dd:ee:ff'
  };
  
  var location2 = {
    // name: '로스트밸리',
    longitude: '37.29193336025852',
    latitude: '127.20782870376418',
    mac: 'aa:bb:cc:dd:ee:ff'
  };
  
  var location3 = {
    // name: '판다월드',
    longitude: '37.293436016625634',
    latitude: '127.20274316522656',
    mac: 'aa:bb:cc:dd:ee:ff'
  };
  
  var locationRef = firebase.database().ref('location');
  locationRef.on('value', function (snapshot) {
    console.log(`location value is ${snapshot.val().longitude}`);

    $('#js-send-location-1').removeClass('btn-danger btn-secondary');
    $('#js-send-location-2').removeClass('btn-danger btn-secondary');
    $('#js-send-location-3').removeClass('btn-danger btn-secondary');

    if (snapshot.val().longitude == location1.longitude) {
      $('#js-send-location-1').addClass('btn-danger');
    }
    else if (snapshot.val().longitude == location2.longitude) {
      $('#js-send-location-2').addClass('btn-danger');
    }
    else if (snapshot.val().longitude == location3.longitude) {
      $('#js-send-location-3').addClass('btn-danger');
    }
  });

  $('#js-send-location-1').click(function (){
    console.log(`sending location 1.`);
    locationRef.set(location1);    
  });

  $('#js-send-location-2').click(function (){
    console.log(`sending location 2.`);
    locationRef.set(location2);    
  });
  
  $('#js-send-location-3').click(function (){
    console.log(`sending location 2.`);
    locationRef.set(location3);    
  });

}, false);