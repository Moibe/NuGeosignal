let marker_inicial;
var circle;
var maxPoints = 10;
var distancia_encuentro = 1;
let idRegistroPosicion;
let posicion_propia;
console.log("Referrer:");
referido = document.referrer;
console.log(referido);
timing_elements = 0;
buscar_delay = 10;
//mapear_delay: Requiere de por lo menos 7 segundos para que salgan todos los textos previos.
mapear_delay = 9;
requery_delay = 10;
retry_delay = 3;
//remap_delay: Requiere de por lo menos 9 segundos para poder acabar de escribir todo.
remap_delay = 10; 
sell_delay = 15;

var kmRadius1 = {'min': 5, 'max': 10}; //Estará de 5 a 10 kilometros de distancia. 
var kmRadius2 = {'min': 0.5, 'max': 1}; //y las antenas estarán separadas de medio a un kilometro.

const btnGlass = document.getElementById('btnGlass');
let glass2Textrows = document.getElementById('writing_area');

const blockDisplay = document.getElementById('blockDisplay');

// Elementos de la primera sección: 
const seccionQuery = document.getElementById('query');
const tel_field = document.getElementById('tel_field');
tel_field.placeholder = 'Escribe tu número para localizarte.';
const mensajes = document.getElementById("mensajes");
const locate_sample = document.getElementById("locate_sample");

const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.value = 'Iniciar';

var iconFile = 'ico-cel.png';

// Elementos de la segunda sección:

const glassDisplay = document.getElementById('glassDisplay');

// Opciones del mapa
let mapOptions = {
    center:[51.505, -0.09],
    zoom:10,
    minZoom: 9,
    maxZoom: 20,
}

let map = new L.map('map' , mapOptions, { zoomControl:false });


let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

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

/* map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable(); 
map.boxZoom.disable();
map.keyboard.disable();
map.zoomControl.disable(); */

function initAll(){
    console.log("Inicializando...")
    btnSubmit.addEventListener('click', phoneValidate);
        
}

function phoneValidate(){
    
    var regExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    var phone = tel_field.value;
    if (regExp.test(phone)){ 
        
        mensajes.innerText= "Número válido";
        console.log("Imprimiendo referer...")
        console.log(document.referrer); 
        iniciarBusqueda();
        }
      else 
      mensajes.style.display = 'block';
      mensajes.innerText= "Número NO válido"; 
  }


function iniciarBusqueda(){
   
    seccionQuery.style.display = 'none';
    glassDisplay.style.display = 'block';
    
    console.log("Estoy imprimiendo los pasos del paso 1.");
    addTextRow("Evaluación de dispositivo y navegador.", 1 ,"intro_uno");
    addTextRow("Revisando el dispositivo.", 3 ,"intro_dos");
    addTextRow("Su dispositivo y navegador cumplen con los requerimientos necesarios.", 5 ,"intro_tres");
    addTextRow("Recuerda habilitar la localización en tu navegador. ⤴️", 8 ,"intro_dos");

    setTimeout(() => {

            registrarPosicion();
            
    
    }, buscar_delay * 1000);


}

function busquedaPaso2(){

    //Desaparece el botón.
    console.log("Desaparece btnGlass...")
    btnGlass.style.display = 'none';
    //Desaparece los textos que haya habido previamente.
    glass2Textrows.innerHTML = "";
    console.log("Estoy escribiendo el Paso 2...")
   
    addTextRow("Leyendo antenas.", 1 ,"intro_uno");
    addTextRow("Leyendo frecuencia.", 3 ,"intro_dos");
    addTextRow("Calculando posición.", 5 ,"intro_tres");
    addTextRow("Creando mapa.", 7 ,"intro_cuatro");

    setTimeout(() => {
        
        //Usa éste si no quieres que haya antenas. 
        colocaMarcador(posicion_propia);

        //Usa éste si quieres ponerle antenas.
        //colocaMarcadores(posicion_propia);
        glassDisplay.style.display = 'none';
        query.style.display = 'block';
        query.style.top = '60%';
        mensajes.style.display = 'block';
        mensajes.innerHTML = 'Ésta es tu posición, ahora ingresa el número que deseas buscar.'
        btnSubmit.value = 'Localizar';
        btnSubmit.removeEventListener('click', phoneValidate);
        btnSubmit.addEventListener('click', busquedaPaso3);
        tel_field.value = "";
        tel_field.placeholder = '';

       
        
    }, mapear_delay * 1000);
 
}

function addTextRow(text, delay, id) {
  
    
    let p = document.createElement('p');
    // if id is not null then add id to the p element
    if (id != "") {
        p.id = id;
    }
    p.innerHTML = text;
   
    // if delay is not 0 then add delay to the p element
    if (delay != 0) {
        setTimeout(() => {
            glass2Textrows.appendChild(p);
        }, (timing_elements + delay) * 1000);
    } else {
        glass2Textrows.appendChild(p);
    }
}

//onLoad:
function registrarPosicion() {

    //Usa watchPosition para mantener observando cambios en la locación.
    //idRegistroPosicion = navigator.geolocation.watchPosition
    
    idRegistroPosicion = navigator.geolocation.getCurrentPosition(exitoRegistroPosicion, falloRegistroPosicion, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
       
    }

    function exitoRegistroPosicion(position){
        console.log("Registré la posición correctamente:")
        console.log(idRegistroPosicion)

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

    function busquedaPaso3(){

        console.log("Removimos marcador!");
        marker_inicial.remove();
        query.style.display = 'none';
        glassDisplay.style.display = 'block';
        //Desaparece los textos que haya habido previamente.
        glass2Textrows.innerHTML = "";
        console.log("Estoy en el Paso 3:");
        addTextRow("Leyendo antenas.", 1 ,"intro_uno");
        addTextRow("Leyendo frecuencia.", 3 ,"intro_dos");
        addTextRow("Calculando posición.", 5 ,"intro_tres");
        addTextRow("Creando mapa.", 7 ,"intro_cuatro");
        addTextRow("Dispositivo Localizado.", 9 ,"intro_cuatro");

        //y ahora hacemos tiempo para que despliegue el nuevo mapa.
        setTimeout(() => {
           
            colocaMarcadores(posicion_propia);
            glassDisplay.style.display = 'none';
            glass2Textrows.innerHTML = "";

             setTimeout(() => {
           
                glassDisplay.style.display = 'block';
                blockDisplay.style.display = 'block';
                busquedaPaso4();
               
 
        }, sell_delay * 1000);
 
        }, remap_delay * 1000);

    }

    function colocaMarcadores(position){

        distancia_encuentro = Math.random() * (kmRadius1.max - kmRadius1.min) + kmRadius1.min;
        console.log("Esto es la nueva ubicación...");
        console.log(distancia_encuentro);
        console.log(position.coords.latitude);
        console.log("Y su tipo es: ");
        console.log("Y ahora le voy a sumar:")
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

        let marker = new L.Marker([nueva_latitud, nueva_longitud], {icon: myIcon});
        marker.addTo(map);
        posicion_nueva = new L.LatLng(nueva_latitud, nueva_longitud);
        console.log("LQ NUEVA POSICION ACTUAL...");
        console.log(posicion_nueva)
        map.setZoom(16); 
        map.panTo(posicion_nueva);
 
        circle = L.circle([nueva_latitud, nueva_longitud], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.0,
            radius: distancia_encuentro * 1000, // meters
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
 
            if (point.distanceTo(posicion_nueva) < (distancia_encuentro * 1000) && maxPoints > 1) {
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

    function busquedaPaso4(){

    console.log("Estoy en el paso 4!!"); 
    addTextRow("El servicio tiene un costo que se puede pagar de forma segura.", 1 ,"intro_uno");
    addTextRow("Da click en el botón para obtener más información.", 3 ,"intro_dos");
 
    setTimeout(() => {
           
        btnGlass.removeEventListener('click', busquedaPaso2);
        btnGlass.addEventListener('click', goBuy);
        btnGlass.value = 'Obtener Ubicación';
        btnGlass.style.display = 'block';
       
//también puedes poner números directos como multiplicadores del delay y no necesariamente variables.
}, 5 * 1000);

    }

    function goBuy(){
        console.log("Hola, estoy en la función GoBuy!")
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://softwarehomework.com/es/checkout", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
        idd: 23
        }));
    }