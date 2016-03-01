//http://api.bandsintown.com/artists/Skrillex/events.json?api_version=2.0&app_id=Local_Sounds

$(document).ready(function() {
  console.log("ready!");

  $('#submit').on('click', function(e) {
    e.preventDefault();
    $('tbody').html('');
    var city = $('#city').val();
    var state = $('#state').val();
    var radius = $('#radius').val();
    var date = $('#date').val();
    console.log(date);


    var url = "http://api.bandsintown.com/events/search?format=json&app_id=Local_Sounds&api_version=2.0&location=" + city + "," + state + "&radius=" + radius + "&date="+ date;

    console.log(url);


    var settings = {
      "async": true,
      "crossDomain": true,
      "dataType": "jsonp",
      "url": url,
      "method": "GET"
    };
    $.ajax(settings).success(function(d) {
      // console.log(d);
      console.log("made ajax request...");

      var eventArray = [];

      for (var i = 0; i < d.length; i++) {
        var event = {};
        event.date = '<td>' + d[i].datetime + '</td>';
        event.band = '<td class="listen"><button>' + d[i].artists[0].name + '</button></td>';
        event.venue = '<td>' + d[i].venue.name + '<a href ="' + d[i].ticket_url + '"><br>(Buy Tickets!)</a></td>';
        event.tix = '<td> </td>';
        event.lat = '<td>' + d[i].venue.latitude + '</td>';
        event.long = '<td>' + d[i].venue.longitude + '</td>';
        event.widget = '<td ><i class="fa fa-headphones"></i></td>';
        eventArray.push(eventTR);

        var eventTR = '<tr>' + event.date + event.band + event.venue + '</tr>'
        $('tbody').append(eventTR);
      }
      // console.log(eventArray);

      //click on band name to hear a sample of music
      $('.listen').on('click', function() {
        e.preventDefault();
        $('#widget').empty();
        console.log("band clicked!");
        var bandName = $(this).text();
        console.log(bandName);

        play(bandName);
        var triedOnce = false;
        function play(bandName) {
          bandName = bandName.replace(/\s/g, '-');

          var bandUrl = "http://soundcloud.com/" + bandName;
          track_url = bandUrl;
          SC.initialize({
            client_id: '087867b3551fce712c09e156c457e95c',
            client_secret: 'd32af60ddb5057120f766d748e9da182'
          });
          var track_url = bandUrl;
          SC.oEmbed(track_url, {
            auto_play: true
          }).then(function(oEmbed) {
            console.log('oEmbed response: ', oEmbed);
            $('#widget').append(oEmbed.html);
          }).catch(function(error) {
            console.log(error);

            bandName = bandName.replace(/-/g, '')
            console.log(bandName);
            if(!triedOnce){
              play(bandName);
            } else{
              alert('Sorry, can\'t find them');
            }
            triedOnce = true;

          })
        }

      })

    });


    // Embed SoundCloud Widget


    //click on band name to hear a sample of music
    // $('#listen').on('click',function(e) {
    //   e.preventDefault();
    //   console.log("band clicked!");
    // var target = $(event.target);
    // var bandName = target.val();
    // console.log(bandName);
    //
    // var urlBand = "http://soundcloud.com/" +bandName;
    // track_url= urlBand;
  });





});
