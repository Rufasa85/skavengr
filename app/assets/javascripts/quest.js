var map = null;
//Check if the gon object exists
if(typeof gon === "undefined") {
  gon = {};
}

var markers = [];
var infoWindows = [];

function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      zoom: 14
    });
  });
}

//Returns an object with a name and the associated marker
function createMarker(name, map) {
  var marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    label: name,
    draggable:true,
    animation: google.maps.Animation.DROP
  });
  marker.addListener('dragend', function() {
    var pos = marker.getPosition();
    console.log(pos.lat(), pos.lng());
  });
  var infoWindow = new google.maps.InfoWindow();
  infoWindows.push(infoWindow);
  google.maps.event.addListener(marker, 'click', function() {
    // var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(this.label);
    infoWindow.open(map, this);
    // infoWindows.push(infoWindow);
  });
  return marker;
}

function addFormRow() {
  var row = $('<li></li>').append($('<input>').attr('type', 'text').attr('idx', markers.length).addClass('loc'));
  $('#loc-list').append(row);
  $('.loc').keyup(function(e) {
    var idx = parseInt(this.getAttribute('idx'), 10);
    markers[idx].setLabel(this.value);
    infoWindows[idx].setContent(this.value);
  });
}

//Function to package the locations into an array without the extra Google Maps marker data
//Should spit out an object that can be stringified and passed to the server
function packageMarkers(arr) {
  //var questName = value of some input, or param passed to this page
  var locations = arr.map(function(marker) {
    var rObj = {};
    rObj.lat = marker.getPosition.lat();
    rObj.lng = marker.getPosition.lng();
    rObj.name = marker.label;
  });
  return {
    //name: questName,
    locations: locations
  };
}

$(function() {
  $('button').click(function(e) {
    e.preventDefault();
    addFormRow();
    markers.push(createMarker('test', map));
  });
  $('.loc').keyup(function(e) {
    console.log('in keyup');
    console.log(this);
    markers[parseInt(this.attr('idx'))].setLabel(this.val());
  });
});

