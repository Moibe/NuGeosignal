function registrarPosicion() {

    //Usa watchPosition para mantener observando cambios en la locación.
    //idRegistroPosicion = navigator.geolocation.watchPosition
    
    navigator.geolocation.getCurrentPosition(exitoRegistroPosicion, falloRegistroPosicion, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
       
    }

function exitoRegistroPosicion(position){
    console.log("Registré la posición correctamente:")
    
    //Aparece el botón que hará lo siguiente y se le da la habilidad de dar el Paso2.
    btnGlass.style.display = 'block';
    btnGlass.addEventListener('click', busquedaPaso2);
    
    posicion_propia = position; 
    console.log("Esto es posicion_propia:");
    console.log(posicion_propia);
        
    
}

function falloRegistroPosicion(){
    console.log("Registré la posición incorrectamente :(");
    console.log(idRegistroPosicion);
    locate_sample.style.display = 'block';

    //intenta de nuevo después de un timeout.

    setTimeout(() => {
        
        locate_sample.style.display = 'none';
        registrarPosicion();

        //Aparece el botón que hará lo siguiente y se le da la habilidad de dar el Paso2.
        btnGlass.style.display = 'block';
        btnGlass.addEventListener('click', busquedaPaso2);

    }, retry_delay * 1000);
}

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

    function colocaMarcador(position){
    marker_inicial = new L.Marker([position.coords.latitude, position.coords.longitude], {icon: myIcon});
    //map.addLayer(marker);
    console.log("AGREGAMOS MARCADOR YA 123");
    marker_inicial.addTo(map);
    
    posicionActual = new L.LatLng(position.coords.latitude, position.coords.longitude);
    map.setZoom(16); 
    map.panTo(posicionActual);
    //drawPolyline();
}