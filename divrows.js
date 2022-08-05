let idRegistroPosicion;
console.log("Aquí escribe??");
referido = document.referrer;
console.log(referido);
timing_elements = 0;
buscar_delay = 10;
mapear_delay = 15;
requery_delay = 10;

let glass2Textrows = document.getElementById('writing_area');

// Elementos de la primera sección: 
const seccionQuery = document.getElementById('query');
const tel_field = document.getElementById('tel_field');
tel_field.placeholder = 'Escribe tu número para localizarte.';
const mensajes = document.getElementById("mensajes");
const locate_sample = document.getElementById("locate_sample");

const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.value = 'Iniciar';
btnSubmit.addEventListener('click', phoneValidate);

const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', busquedaPaso2);

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

/* map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable(); 
map.boxZoom.disable();
map.keyboard.disable();
map.zoomControl.disable(); */

function clickDo(){
    console.log("Le diste click al botón...")
    valor_tel = tel_field.value;
    console.log(valor_tel);
        
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
    
    addTextRow("Evaluación de dispositivo y navegador.", 1 ,"intro_uno", "writing_area");
    addTextRow("Revisando el dispositivo.", 3 ,"intro_dos", "writing_area");
    addTextRow("Su dispositivo y navegador cumplen con los requerimientos necesarios.", 5 ,"intro_tres", "writing_area");
    addTextRow("Recuerda habilitar la localización en tu navegador. ⤴️", 8 ,"intro_dos", "writing_area");

    setTimeout(() => {

            registrarPosicion(1);
            
    
    }, buscar_delay * 1000);


}

function busquedaPaso2(){

    btnBuscar.style.display = "none";
    addTextRow("Leyendo antenas.", 1 ,"intro_uno");
    addTextRow("Leyendo frecuencia.", 3 ,"intro_dos");
    addTextRow("Calculando posición.", 5 ,"intro_tres");
    addTextRow("Creando mapa.", 7 ,"intro_cuatro");

    setTimeout(() => {
        
        colocaMarcador(posicion_oficial);
        glassDisplay.style.display = 'none';
        
        
    }, mapear_delay * 1000);
 
}

function addTextRow(text, delay, id) {
  
    /* console.log("Éste es el glass recibido:" + glass);
    which_glass = glass; */

    glass2Textrows.innerHTML = "";
    
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
    
        idRegistroPosicion = navigator.geolocation.watchPosition(exitoRegistroPosicion, falloRegistroPosicion, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
        console.log("Si se habilitó...");
        console.log(idRegistroPosicion)
 
    }

    function exitoRegistroPosicion(position){
        console.log("Registré la posición correctamente:")
        console.log(idRegistroPosicion)
        btnBuscar.style.display = 'block';
        
    
        randomizado = getRndInteger(-10,10); 
        console.log(randomizado)
        console.log(position)
 
    }

    function falloRegistroPosicion(){
        console.log("Registré la posición incorrectamente :(");
        console.log(idRegistroPosicion);
        locate_sample.style.display = 'block';
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

      function colocaMarcador(position){
        let marker = new L.Marker([position.coords.latitude, position.coords.longitude]);
        marker.addTo(map);
        posicionActual = new L.LatLng(position.coords.latitude, position.coords.longitude);
        map.setZoom(16); 
        map.panTo(posicionActual);
        //drawPolyline();

        setTimeout(() => {
        
            
            query.style.display = 'block';
            query.style.top = '60%';
            mensajes.style.display = 'block';
            mensajes.innerHTML = 'Ésta es tu posición, ahora ingresa el número que deseas buscar.'
            btnSubmit.value = 'Localizar';
            tel_field.value = "";
            tel_field.placeholder = '';

        }, requery_delay * 1000);
    }