function creaMapa(posicionInicial){
    
    console.log("El paso es igual a:");
    console.log(paso);

    //DEFINICION DE LAS COORDENADAS PARA CADA DETERMINADO MOMENTO.
    if(paso == 1){
        console.log("Entré al IF del paso 1.");
        latitud = posicionInicial.coords.latitude;
        longitud = posicionInicial.coords.longitude;
    }
    else{
        console.log("Entré al IF paso 3.");
        //Voy a crear una nueva posición.
        console.log("Removimos marcador!");
        marker_inicial.remove();
        console.log(marker_inicial);
        if(encuentraNuevaPosicionDispositivo(udEstaAqui) == 1){
        
        latitud = nueva_latitud;
        longitud = nueva_longitud;

        //Si escribes una nueva latitud y longitud, es que ya tienes una nueva posición para el dispositivo buscado. Escribe:
        console.log("Estoy trabajando con LocalStorage.");
        localStorage.removeItem('latitud_dispositivo');
        localStorage.removeItem('longitud_dispositivo');
        
        }
    }

    //Del registro de navigator usamos la posición obtenida.
    posicion_original = new L.LatLng(posicionInicial.coords.latitude, posicionInicial.coords.longitude);
    console.log("Estoy escribiendo la nueva posición oficial...");
    console.log("Que en la primer vuelta sería la misma que la posición actual....");
    //Y aquí en cambio ya está escribiendo la nueva posición para el otro dispositivo.
    posicion = new L.LatLng(latitud, longitud);
    localStorage.setItem('objeto_posicion', posicion);
    console.log(posicion);

    var iconFile = 'ico-cel.png';
    //Icono:
    var myIcon = L.icon({
        iconUrl: iconFile,
    //iconSize: [38, 95],
    //iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});

    //INICIO DE TRAZADO EN MAPA.
    marker_inicial = new L.Marker([latitud, longitud], {icon: myIcon});
    console.log("Esto es el marker_inicial:");
    console.log(marker_inicial);
    marker_inicial.addTo(map);
    map.setZoom(16); 
    map.panTo(posicion_original);
    console.log("Ya panee a la original...");

    //El círculo y las antenas esperaran un momento para ser creadas.
    setTimeout(() => {
        circle = L.circle([latitud, longitud], {
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
    
            if (point.distanceTo(posicion) < (1 * 1000) && maxPoints > 1) {
                addAntenas(map, point, "marker " + i);
            } else if (maxPoints > 1) {
                i--;
            }
    
        }
    
        map.setZoom(16); 
        map.panTo(posicion, {animate: true, duration: 0.2, easeLinearity: 0.9});
        
        console.log("Ya panee a la nueva...");

    }, paneo_delay * 1000);
  
}

function addAntenas(map, point, content) {
    var iconFile = 'ico-antenas.png';

        var myIcon = L.icon({
            iconUrl: iconFile,
            });
        
        L.marker([point.lat, point.lng], {icon: myIcon}).addTo(map);

}