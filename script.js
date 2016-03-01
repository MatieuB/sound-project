//http://api.bandsintown.com/artists/Skrillex/events.json?api_version=2.0&app_id=Local_Sounds

$(document).ready(function() {
  console.log("ready!");

  $('button').on('click',function(e) {
  e.preventDefault();
  var city = $('#city').val();
  var state = $('#state').val();
  var radius = $('#radius').val();

  var url = "http://api.bandsintown.com/events/search?format=json&app_id=Local_Sounds&api_version=2.0&location=" + city + "," + state + "&radius=" + radius;


  var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "jsonp",
    "url": url,
    "method": "GET"
  };
$.ajax(settings).success(function(d) {
    console.log("made ajax request...");

    var eventArray = [];


for (var i = 0; i < d.length; i++) {
      var event = {};
      event.date = d[i].datetime;
      event.band = d[i].artists[0].name;
      event.venue = d[i].venue.name;
      event.tix = d[i].ticket_url;
      event.lat = d[i].venue.latitude;
      event.long = d[i].venue.longitude;
      event.widget = 'widget';
      eventArray.push(event);
    }
console.log(eventArray);

})

});

//   SC.initialize({
//   client_id: '087867b3551fce712c09e156c457e95c',
//   client_secret: 'd32af60ddb5057120f766d748e9da182'
// });
//
// var track_url = 'http://soundcloud.com/river-whyless';
// SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
//   console.log('oEmbed response: ', oEmbed);
// });



});
