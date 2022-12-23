function creaMapa(posicionInicial){
    
    console.log("El paso es igual a:");
    console.log(paso);

    
    //DEFINICION DE LAS COORDENADAS PARA CADA DETERMINADO MOMENTO.
    if(paso == 1){
        console.log("Entré al If del paso 1.");
        latitud_original = posicionInicial.coords.latitude;
        longitud_original = posicionInicial.coords.longitude;

        isLocalStorageAvailable();
        console.log("Ésto es el localStorageavailability:");
        console.log(local_storage_available);

        localStorage.setItem('original_latitud_stored', JSON.stringify(latitud_original));
        localStorage.setItem('original_longitud_stored', JSON.stringify(longitud_original));

        latitud_nueva = posicionInicial.coords.latitude;
        longitud_nueva = posicionInicial.coords.longitude;

    }

    else if(paso == 3){
        console.log("Entré al If paso 3.");
        //Voy a crear una nueva posición.
        //Remuevo el marcador original.
        console.log(marker_inicial);
        marker_inicial.remove();
        
        //En el paso 3, tienes que crear una nueva posición porque es la primera vez que "buscas" el dispositivo, no así el paso 4.
        if(creaNuevaPosicionDispositivo(udEstaAqui) == 1){
        
        latitud_nueva = nueva_latitud;
        longitud_nueva = nueva_longitud;

        //Y también las guardaremos en el storage 
        //Ahora también la guardamos en localStorage: 
        localStorage.setItem('nueva_latitud_stored', JSON.stringify(nueva_latitud));
        localStorage.setItem('nueva_longitud_stored', JSON.stringify(nueva_longitud));

        }
        else if(paso == 4){

            console.log("la variable paso es 4...");

            //Todo se obtendra de los localStorage:

            latitud_original = JSON.parse(localStorage.getItem(content)); 
            longitud_original = JSON.parse(localStorage.getItem(content));  

            latitud = JSON.parse(localStorage.getItem(nueva_latitud_stored)); 
            longitud = JSON.parse(localStorage.getItem(nueva_longitud_stored));  
                
        }
    } 

    //posicion_original = new L.LatLng(posicionInicial.coords.latitude, posicionInicial.coords.longitude);
    posicion_original = new L.LatLng(latitud_original, longitud_original);
    //console.log("Estoy escribiendo la nueva posición oficial...");
    console.log("Que en la primer vuelta sería la misma que la posición actual....");
    //Y aquí en cambio ya está escribiendo la nueva posición para el otro dispositivo.
    posicion_nueva = new L.LatLng(latitud_nueva, longitud_nueva);
    

    var iconFile = 'ico-cel.png';
    //Icono:
    var myIcon = L.icon({
        iconUrl: iconFile,
   
});

    //INICIO DE TRAZADO EN MAPA.
    marker_inicial = new L.Marker([latitud_nueva, longitud_nueva], {icon: myIcon});
    console.log("Esto es el marker_inicial:");
    console.log(marker_inicial);
    marker_inicial.addTo(map);
    map.setZoom(16); 
    map.panTo(posicion_original);
    console.log("Ya panee a la original...");

    //El círculo y las antenas esperaran un momento para ser creadas.
    setTimeout(() => {
        circle = L.circle([latitud_nueva, longitud_nueva], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.0,
            //radius: distancia_encuentro * 1000, // meters
            radius: 1 * 1000, // meters
        }).addTo(map);
    
        bounds = circle.getBounds();
        console.log("Estos son los BOUNDS...");
        console.log(bounds);
        console.log("Fitteando el mapa dentro de los BOUNDS...");
        map.fitBounds(bounds);
    
        sw = bounds.getSouthWest();
        ne = bounds.getNorthEast();
    
        //Creador de las antenas: 
        //Éste for iterará tantas veces como antenas quieras.
        for (var i = 0; i < maxPoints; i++) {
            var ptLat = Math.random() * (ne.lat - sw.lat) + sw.lat;
            var ptLng = Math.random() * (ne.lng - sw.lng) + sw.lng;
            //googlemaps var point = new google.maps.LatLng(ptLat, ptLng);
            var point = new L.LatLng(ptLat, ptLng);
            last_point = point;
    
            if (point.distanceTo(posicion_nueva) < (1 * 1000) && maxPoints > 1) {
                addAntenas(map, point, "antenna" + i);
            } else if (maxPoints > 1) {
                i--;
            }
    
        }
    
        map.setZoom(16); 
        
        
        map.panTo(posicion_nueva, {animate: true, duration: 0.2, easeLinearity: 0.9});
        console.log("Ya panee a la nueva...");

    }, paneo_delay * 1000);
  
}

function addAntenas(map, point, content) {
    var iconFile = 'ico-antenas.png';

    //localStorage.setItem(content, JSON.stringify(point));

        var myIcon = L.icon({
            iconUrl: iconFile,
            });
        
        //point_stored = JSON.parse(localStorage.getItem(content)); 
        L.marker([point.lat, point.lng], {icon: myIcon}).addTo(map);

}