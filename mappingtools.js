function creaMapa(posicionInicial){
    console.log("ESTAMOS EN CREAMAPA()...")
    console.log("Estamos usando posicionInicial, que es esto:");
    console.log(posicionInicial);
    console.log("posicionInicial es el tipo:");
    console.log(typeof posicionInicial);
    console.log("El paso es igual a:");
    console.log(paso);

    if(paso == 1){
        console.log("Entré al paso 1.");
        latitud = posicionInicial.coords.latitude;
        longitud = posicionInicial.coords.longitude;
    }
    else{
        console.log("Entré al paso 3.");
        encuentraNuevaPosicionDispositivo(udEstaAqui);
        latitud = nueva_latitud;
        longitud = nueva_longitud;
    }

    posicion = new L.LatLng(latitud, longitud);
        
    marker_inicial = new L.Marker([latitud, longitud], {icon: myIcon});
    marker_inicial.addTo(map);
    map.setZoom(16); 
    map.panTo(posicion);

    circle = L.circle([latitud, longitud], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.0,
        //radius: distancia_encuentro * 1000, // meters
        radius: 1 * 1000, // meters
    }).addTo(map);

    bounds = circle.getBounds();
    console.log("Estos son los bounds...");
    console.log(bounds);
    map.fitBounds(bounds);

    sw = bounds.getSouthWest();
    ne = bounds.getNorthEast();

    //Creador de las antenas: 
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

}

function addAntenas(map, point, content) {
    var iconFile = 'ico-antenas.png';

        var myIcon = L.icon({
            iconUrl: iconFile,
            });
        
        L.marker([point.lat, point.lng], {icon: myIcon}).addTo(map);

}