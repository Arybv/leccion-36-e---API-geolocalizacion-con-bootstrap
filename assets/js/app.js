//FUNCIÓN INITMAP
function initMap(){
    var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: laboratoriaLima
    });
    var markadorLaboratoria = new google.maps.Marker({
      position: laboratoriaLima,
      map: map
    });
    //FUNCIÓN BUSCAR
    function buscar(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
      }
    }
    //FUNCIÓN ÉXITO
    var latitud, longitud;
    var funcionExito = function(posicion){
      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;
      var miUbicacion = new google.maps.Marker({
        position: {lat:latitud, lng: longitud},
        map: map
      });
      map.setZoom(18);
      map.setCenter({lat:latitud, lng:longitud});
    }

    //FUNCIÓN ERROR
    var funcionError = function (error) {
      alert("Tenemos un problema con encontrar tu ubicación");
    }
    document.getElementById("encuentrame").addEventListener("click",buscar);


    //AGREGANDO BUSCADOR RÁPIDO
    var inputPartida = document.getElementById("punto-partida");
    var inputDestino = document.getElementById("punto-destino");

    new google.maps.places.Autocomplete(inputPartida);
    new google.maps.places.Autocomplete(inputDestino);



    var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
      directionsService.route({
        origin: inputPartida.value,
        destination: inputDestino.value,
        travelMode: "DRIVING"
      },function(response, status) {
        if (status === "OK"){
          var distancia = Number((response.routes[0].legs[0].))
          directionsDisplay.setDirections(response);
        } else {
          window.alert("No encontramos una ruta.");
        }
      });
    }
}
