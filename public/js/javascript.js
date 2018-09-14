
//the initial location the map is set to.
latitude = 54.38749845;
longitude = -1.391831766;

//Animation for Button
$('#buttono').hover(function() {
  $('#fill').css('animation', 'fillfull 0.7s forwards');
  $('#filltext').css('animation', 'textChange 0.7s forwards');
}, function() {
  $('#fill').css('animation', 'fillfempty 0.7s forwards');
  $('#filltext').css('animation', 'textChangeBack 0.7s forwards');
})
//Above ^^ animation for button

function smoothScroll() {

  //Sets longitude and latitude values while scrolling
    longitude = (Math.random() * (180 - -180) + -180).toFixed(3) * 1;
    latitude = (Math.random() * (90 - -90) + -90).toFixed(3) * 1;
    initMap();

  //Scrolls down to the top of the map
    var elmnt = document.getElementById("mapback");
    elmnt.scrollIntoView({ block: 'start',  behavior: 'smooth' });

  //Gets the country locationName
    getCountryName()
}

function scrollToTop () {
  var elmnt = document.getElementById("slider1");
  elmnt.scrollIntoView({ block: 'start',  behavior: 'smooth' });
}


//Initialises the map and lets you style certain aspects.
function initMap() {
  var markerDestination = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 4,
        center: markerDestination,
              styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#9eb4d8'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ]
          });
          var marker = new google.maps.Marker({position: markerDestination, map: map});

        }
  // The marker, positioned at The North East of England.

  function getCountryName() {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude +',' + longitude + '&key=AIzaSyBqMrtWfG-GmbUXzMrE0-UFZo7DsH1dLhM'
    var finalAddress;

    $.getJSON(url, function(result){
      var lengthOfResult = result.results.length;
      var arr = [];
        for(var i=0;i<result.results.length;i++) {
          var adress = result.results[i].formatted_address;
          arr.push(result.results[i].formatted_address)
        }

//gets the province location from the returned google map API. Does this by eliminating
//extrenuous information via reducing the arr length by 2.
        var provinceLocation = arr[arr.length - 2];

//checks if the length is successful and a reasonable length. If not, tells the
//user they've landed in the ocean. As this is most likely the case.

      if(lengthOfResult !== 0 & provinceLocation !== undefined) {
          document.getElementById('titleForWikiback').innerHTML = provinceLocation;
          var re = /^(.+?),/g
          var found = provinceLocation.match(re)
          str = found.join('');
          strShortened = str.substring(0, str.length - 1)
          getWikipediaExtract(strShortened)
        }
        else if (lengthOfResult !== 0) {
          document.getElementById('titleForWikiback').innerHTML = adress
          getWikipediaExtract(adress)
        } else {
          document.getElementById('titleForWikiback').innerHTML = "Plonk! You're in the ocean. Try again.";
          document.getElementById('wikiTextBox').innerHTML = ' ' ;
      }
    });
  }

  function getWikipediaExtract(placeName) {
    var url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + placeName;
      document.getElementById('wikiTextBox').innerHTML = '  ';

    $.getJSON(url, function(result){
      document.getElementById('wikiTextBox').innerHTML = result.extract;
    })

  }
