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
      event.date = '<td>'+ d[i].datetime +'</td>';
      event.band = '<td>'+ d[i].artists[0].name +'</td>';
      event.venue = '<td>'+ d[i].venue.name +'<a href ="' + d[i].ticket_url +'"> (Buy Tickets!)</a></td>';
      event.tix = '<td> </td>';
      event.lat = '<td>'+ d[i].venue.latitude +'</td>';
      event.long = '<td>'+ d[i].venue.longitude +'</td>';
      event.widget = 'widget';
      eventArray.push(eventObject);
      var eventObject = '<tr>'+event.date+event.band+event.venue +'</tr>'
      $('tbody').append(eventObject);
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
