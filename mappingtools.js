function creaMapa(position){

    console.log("Estamos usando position, que es esto:");
    console.log(position);
    console.log("Position es el tipo:");
    console.log(typeof position);
    console.log("El paso es igual a:");
    console.log(paso);
    console.log("Y estamos ejecutando el IF de paso...");
    
    /* if (paso == 3){
        console.log("Si entreamos al IF...");
        encuentraNuevaPosicionDispositivo(position);
        let marker_inicial = new L.Marker([nueva_latitud, nueva_longitud], {icon: myIcon});
        marker_inicial.addTo(map);
        posicion_nueva = new L.LatLng(nueva_latitud, nueva_longitud);
        console.log("LQ NUEVA POSICION ACTUAL...");
        console.log(posicion_nueva)
        map.setZoom(16); 
        map.panTo(posicion_nueva);
    } */

    marker_inicial = new L.Marker([position.coords.latitude, position.coords.longitude], {icon: myIcon});
    //map.addLayer(marker);
    console.log("AGREGAMOS MARCADOR YA 123");
    marker_inicial.addTo(map);
    
    posicionActual = new L.LatLng(position.coords.latitude, position.coords.longitude);
    map.setZoom(16); 
    map.panTo(posicionActual);


    circle = L.circle([position.coords.latitude, position.coords.longitude], {
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

        if (point.distanceTo(position) < (1 * 1000) && maxPoints > 1) {
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