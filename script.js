$(document).ready(function() {
  console.log("ready!");
  // function addToLocalStorage() {;
  var showTracker = [];
  var trackedShow;
  // var showsChecked = $('input:checked');


  $('tbody').on('change', '.interest', function() {
    if ($(event.target).is(':checked')) {
      console.log("checkbox changed");
      trackedShow = ($(this).parent().children());
      console.log(trackedShow);
      showTracker.push('<li>'+trackedShow.text()+'</li>');
      console.log("show tracker: " + showTracker);
    } else {
      showTracker.splice(showTracker.indexOf($(this).parent().children().text()), 1);
      console.log("unchecked!",showTracker);
      }
  });
  $('#makeList').on('click',function(e){
    e.preventDefault();
    $('#showTracker').show();
    $('#showTracker').append(showTracker);
  });
  // addToLocalStorage();


  $('#submit').on('click', function(e) {
    e.preventDefault();
    $('tbody').html('');
    var city = $('#city').val();
    var state = $('#state').val();
    var radius = $('#radius').val();
    var date = $('#date').val();
    console.log(date);


    var url = "https://api.bandsintown.com/events/search?format=json&app_id=Local_Sounds&api_version=2.0&location=" + city + "," + state + "&radius=" + radius + "&date=" + date;

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
console.log(d);
      var eventArray = [];

      for (var i = 0; i < d.length; i++) {
        var event = {};
        var date = d[i].datetime.slice(0,10);




        event.interested = '<td class="interest"><input  type="checkbox"></td>';
        event.date = '<td class="date">' + date + '</td>';

        event.band = '<td class="listen"><button class="btn-md btn-default">' + d[i].artists[0].name +'  <i class="fa fa-headphones">' +'</button></td>';
        event.venue = '<td class="venue">' + d[i].venue.name + '<a target=cd_blank href ="' + d[i].ticket_url + '"><br><strong>Buy Tickets!</strong></a></td>';

        // event.tix = '<td> </td>';
        // event.lat = '<td>' + d[i].venue.latitude + '</td>';
        // event.long = '<td>' + d[i].venue.longitude + '</td>';
        // event.widget = '<td ><i class="fa fa-headphones"></i></td>';

        eventArray.push(eventTR);
        // console.log(eventTR);
        // console.log(eventArray[1]);

        var eventTR = '<tr>' + event.date + event.band + event.venue + event.interested + '</tr>'
        $('tbody').append(eventTR);


        console.log(date);
      }


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
          var bandUrl = "https://soundcloud.com/" + bandName;
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
            if (!triedOnce) {
              play(bandName);
            } else {
              alert("Sorry, we can't find this artist");
            }
            triedOnce = true;
          })


        }
      })
    });
  });
});
