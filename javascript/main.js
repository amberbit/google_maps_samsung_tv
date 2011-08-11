var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main = {
}

Main.setPosition = function(latlng) {
  // round 2 decimal points
  var round = function(value) {
    return Math.round(value*100)/100;
  };

  var position = "";
  position += round(latlng.lat());
  position += ", ";
  position += round(latlng.lng());
  document.getElementById("position").innerHTML = position;
}

Main.onLoad = function() {
  // To enable the key event processing
  document.getElementById("anchor").focus();

  // Set Default key handler function
  widgetAPI.sendReadyEvent();

  // Białystok, Poland
  var latlng = new google.maps.LatLng(53.12, 23.12);
  Main.setPosition(latlng);
  var mapOptions = {
    zoom: 10,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: false,
    streetViewControl: false
  };
  Main.map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

Main.onUnload = function() {
}

Main.MainKeyHandler = function() {
  var keyCode = event.keyCode;

  switch(keyCode) {
    case tvKey.KEY_LEFT:
      this.map.panBy(-50, 0);
      Main.setPosition(this.map.getCenter());
      break;
    case tvKey.KEY_RIGHT:
      this.map.panBy(50, 0);
      Main.setPosition(this.map.getCenter());
      break;
    case tvKey.KEY_UP:
      this.map.panBy(0, -50);
      Main.setPosition(this.map.getCenter());
      break;
    case tvKey.KEY_DOWN:
      this.map.panBy(0, 50);
      Main.setPosition(this.map.getCenter());
      break;
    case tvKey.KEY_VOL_UP:
      var currentZoom = this.map.getZoom();
      this.map.setZoom(currentZoom+1);
      break;
    case tvKey.KEY_VOL_DOWN:
      var currentZoom = this.map.getZoom();
      this.map.setZoom(currentZoom-1);
      break;
    case tvKey.KEY_CH_UP:
      this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      break;
    case tvKey.KEY_CH_DOWN:
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      break;
    default :
      break;
  }
}
