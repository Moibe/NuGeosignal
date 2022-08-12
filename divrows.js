
//Ésta variable marca si el phoneValidate es del paso 1 o del paso 3.
let paso = 1; 
let marker_inicial;
var circle;
var maxPoints = 10;
var distancia_encuentro = 1;
let nueva_latitud;
let nueva_longitud;
let idRegistroPosicion;
let udEstaAqui;
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
remap_delay = 14; 
sell_delay = 15;
paneo_delay = 4;

var kmRadius1 = {'min': 5, 'max': 10}; //Estará de 5 a 10 kilometros de distancia. 
var kmRadius2 = {'min': 0.5, 'max': 1}; //y las antenas estarán separadas de medio a un kilometro.

const btnGlass = document.getElementById('btnGlass');
let writingGlass = document.getElementById('writingGlass');
let formaPago = document.getElementById('formaPago');

const blockDisplay = document.getElementById('blockDisplay');

// Elementos de la primera sección: 
const seccionQuery = document.getElementById('query');
const tel_field = document.getElementById('tel_field');
tel_field.placeholder = placeholder_text;
const mensajes = document.getElementById("mensajes");
const locate_sample = document.getElementById("locate_sample");

//Inicialiación del botón Principal.
const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.value = btnSubmit_text;
btnSubmit.addEventListener('click', startProcess);

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


let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
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
}

function startProcess(){
    console.log("Estamos iniciando el proceso...");
    if (phoneValidate() == true){
        
        busquedaPaso1();
    }
    else{
        console.log("El teléfono no fue válido...");
    }

   /*  if (paso == 1){
        busquedaPaso1();
    }
    else{
        busquedaPaso3();
    } */
}

function phoneValidate(){
    
    //Expresión regular que vamos a validar...
    var regExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    //Obtención del teléfono del campo de teléfono.
    var phone = tel_field.value;

    //Compara ambos...
    if (regExp.test(phone)){ 
        mensajes.innerText= "Número válido";
        console.log("El número es válido...");
        return true;
    }
    else{ 
      mensajes.style.display = 'block';
      mensajes.innerText= "Número no válido"; 
      return false;
    }
  }

function busquedaPaso1(){

    console.log("Estoy en busquedaPaso1().");
   
    seccionQuery.style.display = 'none';
    glassDisplay.style.display = 'block';
       
    addTextRow(glass1_text1, 1 ,"intro_uno", writingGlass);
    addTextRow(glass1_text2, 3 ,"intro_dos", writingGlass);
    addTextRow(glass1_text3, 5 ,"intro_tres", writingGlass);
    addTextRow(glass1_text4, 8 ,"intro_dos", writingGlass);

    setTimeout(() => {

            registrarPosicion();
 
    }, buscar_delay * 1000);

}

function busquedaPaso2(){
    
    btnGlass.style.display = 'none';
    //Desaparece los textos que haya habido previamente.
    textRowArea.innerHTML = "";
    console.log("Estoy en busquedaPaso2()...");
   
    addTextRow(glass1_text1, 1 ,"intro_uno", writingGlass);
    addTextRow(glass1_text2, 3 ,"intro_dos", writingGlass);
    addTextRow(glass1_text3, 5 ,"intro_tres", writingGlass);
    addTextRow(glass1_text4, 7 ,"intro_cuatro", writingGlass);

    setTimeout(() => {
        
        //Usa éste si no quieres que haya antenas. 
        //colocaMarcador(udEstaAqui);

        //Usa éste si quieres ponerle antenas.
        creaMapa(udEstaAqui);
        glassDisplay.style.display = 'none';
        query.style.display = 'block';
        query.style.top = '60%';
        mensajes.style.display = 'block';
        mensajes.innerHTML = 'Ésta es tu posición, ahora ingresa el número que deseas buscar.'
        btnSubmit.value = 'Localizar';
        //Ahora el paso a ejecutar está dictado por 'paso', ya no se necesita remover phoneValidate ni agregar paso3.
        paso = 3;
        btnSubmit.removeEventListener('click', startProcess);
        btnSubmit.addEventListener('click', busquedaPaso3);
        tel_field.value = "";
        tel_field.placeholder = '';

    }, mapear_delay * 1000);
 
}


    function busquedaPaso3(){
       
        query.style.display = 'none';
        glassDisplay.style.display = 'block';
        //Desaparece los textos que haya habido previamente.
        console.log("Estoy en el paso 3, desapareciendo los textos anteriores.");
        textRowArea.innerHTML = "";
        console.log("Estoy en el Paso 3:");
        addTextRow("Buscando el nuevo dispositivo.", 1 ,"intro_cerp", writingGlass);
        addTextRow("Leyendo antenas.", 3 ,"intro_uno", writingGlass);
        addTextRow("Leyendo frecuencia.", 5 ,"intro_dos", writingGlass);
        addTextRow("Calculando posición.", 7 ,"intro_tres", writingGlass);
        addTextRow("Dispositivo Localizado.", 9 ,"intro_cuatro", writingGlass);
        addTextRow("Creando mapa.", 12 ,"intro_cuatro", writingGlass);

        //y ahora hacemos tiempo para que despliegue el nuevo mapa.
        setTimeout(() => {
  
        creaMapa(udEstaAqui);
        glassDisplay.style.display = 'none';
        textRowArea.innerHTML = "";

             setTimeout(() => {
           
                /* glassDisplay.style.display = 'block';
                blockDisplay.style.display = 'block';
                busquedaPaso4(); */

        }, sell_delay * 1000);
 
        }, remap_delay * 1000);
    }
   
    function busquedaPaso4(){

    console.log("Estoy en el paso 4!!"); 
    formaPago.style.display = 'block';
   
 
    setTimeout(() => {
           
        //Como todo lo hace la forma. Ya no necesitas reformatear éste botón.
        /* btnGlass.removeEventListener('click', busquedaPaso2);
        btnGlass.addEventListener('click', goBuy);
        btnGlass.value = 'Obtener Ubicación';
        btnGlass.style.display = 'block'; */
       
//también puedes poner números directos como multiplicadores del delay y no necesariamente variables.
}, 5 * 1000);

    }

    function goBuy(){
        console.log("Hola, estoy en la función GoBuy!")
       /*  var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://softwarehomework.com/es/checkout/", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
        idd: "23"
        }));
 */

        let data = {idd: "barium"};

        fetch("https://softwarehomework.com/es/checkout", {
        method: "POST",
        headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}, 
        body: JSON.stringify(data)
        }).then(res => {
        console.log("Request complete! response:", res);
        });
    }