'use strict';

// Bindings on load.
window.addEventListener('load', function () {

  var fanRunRef = firebase.database().ref('fan/run');
  fanRunRef.on('value', function (snapshot) {
    console.log(`run value is ${snapshot.val()}`);

    $('#js-move-run').removeClass('btn-danger btn-secondary');
    $('#js-move-stop').removeClass('btn-danger btn-secondary');
    
    if (snapshot.val() == true) {
      $('#js-move-run').addClass('btn-danger');
    }
    else {
      $('#js-move-stop').addClass('btn-danger');
    }
  });

  $('#js-move-run').click(function (){
    console.log(`js-move-run clicked`);
    fanRunRef.set(true);
  });

  $('#js-move-stop').click(function (){
    console.log(`js-move-stop clicked`);
    fanRunRef.set(false);
  });

  var fanSongRef = firebase.database().ref('fan/song');
  fanSongRef.on('value', function (snapshot) {
    console.log(`song value is ${snapshot.val()}`);

    $('#js-song-play').removeClass('btn-danger btn-secondary');
    $('#js-song-stop').removeClass('btn-danger btn-secondary');

    if (snapshot.val() == true) {
      $('#js-song-play').addClass('btn-danger');
    }
    else {
      $('#js-song-stop').addClass('btn-danger');
    }
  });

  $('#js-song-play').click(function (){
    fanSongRef.set(true);
  });

  $('#js-song-stop').click(function (){
    fanSongRef.set(false);
  });

  var fanGreetingRef = firebase.database().ref('fan/greeting');
  fanGreetingRef.on('value', function (snapshot) {
    console.log(`greeting value is ${snapshot.val()}`);

    $('#js-greeting-hello').removeClass('btn-danger btn-secondary');
    $('#js-greeting-bye').removeClass('btn-danger btn-secondary');
    $('#js-greeting-off').removeClass('btn-danger btn-secondary');

    if (snapshot.val() == 'hello') {
      $('#js-greeting-hello').addClass('btn-danger');

    }
    else if (snapshot.val() == 'bye') {
      $('#js-greeting-bye').addClass('btn-danger');
    }
    else if (snapshot.val() == 'off') {
      $('#js-greeting-off').addClass('btn-danger');
    }
  });

  $('#js-greeting-hello').click(function (){
    fanGreetingRef.set("hello");
  });

  $('#js-greeting-bye').click(function (){
    fanGreetingRef.set("bye");
  });

  $('#js-greeting-off').click(function (){
    fanGreetingRef.set("off");
  });

}, false);