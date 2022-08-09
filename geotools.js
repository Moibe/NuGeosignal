function registrarPosicion() {

    console.log("Estoy en registrarPosicion().");

    //Usa watchPosition para mantener observando cambios en la locación.
    //idRegistroPosicion = navigator.geolocation.watchPosition
    
    navigator.geolocation.getCurrentPosition(exitoRegistroPosicion, falloRegistroPosicion, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
       
    }

function exitoRegistroPosicion(position){
    console.log("Estoy en exitoRegistroPosicion()...")
        
    btnGlass.style.display = 'block';
    console.log("Se activa el click para busquedapaso2()...");
    btnGlass.addEventListener('click', busquedaPaso2);
    
    udEstaAqui = position; 
    console.log("Esto es udEstaAqui:");
    console.log(udEstaAqui);
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

function encuentraNuevaPosicionDispositivo(position){
    
    console.log("Estoy dentro de encuentraNuevaPosicionDispositivo()...");
    distancia_encuentro = Math.random() * (kmRadius1.max - kmRadius1.min) + kmRadius1.min;
    console.log("Esto es la nueva ubicación...");
    console.log(distancia_encuentro);
    
    sumador = distancia_encuentro * 0.01
    //La función random genera un movimiento a la izquierda (negativo) o a la derecha (positivo).
    direccion_latitud = Math.round(Math.random()) * 2 - 1;
    console.log("La dirección de la latitud es:");
    console.log(direccion_latitud);
    //La función random genera un movimiento hacia abajo (negativo) o hacia arriba (positivo).
    direccion_longitud = Math.round(Math.random()) * 2 - 1
    console.log("La dirección de la longitud es:");
    console.log(direccion_longitud);
    nueva_latitud = position.coords.latitude + (sumador * direccion_latitud);
    nueva_longitud = position.coords.longitude + (sumador * direccion_longitud);
    console.log("Ésta es la nueva latitud...");
    console.log(nueva_latitud);
    console.log("Ésta es la nueva longitud...");
    console.log(nueva_longitud);

    return 1;
}