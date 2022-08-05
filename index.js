let idRegistroPosicion;
let posicionActual;


let mapOptions = {
    center:[51.505, -0.09],
    zoom:10,
    minZoom: 9,
    maxZoom: 15,
}

let map = new L.map('map' , mapOptions, { zoomControl:false });


let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);


map.touchZoom.disable();
//map.doubleClickZoom.disable();
// map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.zoomControl.disable();

//onLoad:
function registrarPosicion(validar) {

    if (validar == 1) {
        idRegistroPosicion = navigator.geolocation.watchPosition(exitoRegistroPosicion, falloRegistroPosicion, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
      }

      else {
        console.log("Esto es posición actual Moibe...")
        colocaMarcadorFake();
       

      }

    
    
    }


function exitoRegistroPosicion(position){
    console.log("Registré la posición correctamente:")
    console.log(idRegistroPosicion)

    randomizado = getRndInteger(-10,10); 
    console.log(randomizado)
    console.log(position)

    colocaMarcador();

    
}

function colocaMarcador(position){
    let marker = new L.Marker([position.coords.latitude, position.coords.longitude]);
    marker.addTo(map);
    posicionActual = new L.LatLng(position.coords.latitude, position.coords.longitude);
    map.panTo(posicionActual);
    drawPolyline();
}

function colocaMarcadorFake(position){

    fake = [51.505, -0.09]
    let marker = new L.Marker(fake);
    marker.addTo(map);
    map.panTo(fake);
    drawPolyline();
}

function falloRegistroPosicion(){
    console.log("Registré la posición incorrectamente :(")
    console.log(idRegistroPosicion)
}

function drawPolyline(){

    latitud = 37.7818; 
    longitud = -122.4047;
    //Las coordenadas de latidud, primer valor, van de -90 a 90.
    //Las coordenadas de longitud, segundo valor van de -180 a 180.
    var polylinePoints = [
        [latitud, longitud],
        [latitud + 0.0004, longitud -0.0003],
        [latitud + 0.0002, longitud -0.0002],
        [latitud + 0.0006, longitud -0.0005],
        [latitud + 0.0001, longitud -0.0001],
        
      ];            
      
      var polyline = L.polyline(polylinePoints).addTo(map);
      map.fitBounds(polyline.getBounds());
      generaRandomPosition();
      
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function generaRandomPosition(){

    random_position = [51.505, -0.09]
    console.log(random_position)

  }