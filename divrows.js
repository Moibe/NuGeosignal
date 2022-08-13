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
buscar_delay = 5;
//mapear_delay: Requiere de por lo menos 7 segundos para que salgan todos los textos previos.
mapear_delay = 9;
requery_delay = 10;
retry_delay = 3;
sell_delay = 10;
//remap_delay: Requiere de por lo menos 9 segundos para poder acabar de escribir todo.
message_delay = 5; 
map_delay = 1;
paneo_delay = 4;
var kmRadius1 = {'min': 5, 'max': 10}; //Estará de 5 a 10 kilometros de distancia. 
var kmRadius2 = {'min': 0.5, 'max': 1}; //y las antenas estarán separadas de medio a un kilometro.
console.log("Getting elemento Mensajes...");
const mensajes = document.getElementById("mensajes");
console.log(mensajes);
const btnGlass = document.getElementById('btnGlass');
let writingGlass = document.getElementById('writingGlass');
const blockDisplay = document.getElementById('blockDisplay');

// Elementos de la primera sección: 
const seccionQuery = document.getElementById('query');
const tel_field = document.getElementById('tel_field');
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
    console.log("Inicializando...");
    
}

function startProcess(){
    console.log("Estamos iniciando el proceso alterno...");
        busquedaPaso1();
    }
    
function busquedaPaso1(){

    console.log("Estoy en busquedaPaso1().");
   
    seccionQuery.style.display = 'none';
    glassDisplay.style.display = 'block';
       
    addTextRow(glass1_text1, 1 ,"intro_uno", writingGlass);
    addTextRow(glass1_text4, 3 ,"intro_dos", writingGlass);

    setTimeout(() => {

            registrarPosicion();
 
    }, buscar_delay * 1000);

}

function busquedaPaso2(){
    
    btnGlass.style.display = 'none';
    //Desaparece los textos que haya habido previamente.
    textRowArea.innerHTML = "";
    console.log("Estoy en busquedaPaso2()...");

    glass2_text2 = "(" + udEstaAqui.coords.latitude + " , " + udEstaAqui.coords.longitude + ")";
    
   
    addTextRow(glass2_text1, 1 ,"intro_uno", writingGlass);
    addTextRow(glass2_text2, 3 ,"intro_dos", writingGlass);
    addTextRow(glass2_text3, 5 ,"intro_tres", writingGlass);
    addTextRow(glass2_text4, 7 ,"intro_cuatro", writingGlass);

    setTimeout(() => {
        
        //Usa éste si no quieres que haya antenas. 
        //colocaMarcador(udEstaAqui);

        //Usa éste si quieres ponerle antenas.
        //creaMapa(udEstaAqui);
        //glassDisplay.style.display = 'none';
        btnGlass.style.display = 'block';
        //query.style.display = 'block';
        //query.style.top = '60%';
        
        //mensajes.innerHTML = mensajes_glass;
        //btnSubmit.value = btnSubmit2_text;
        //Ahora el paso a ejecutar está dictado por 'paso', ya no se necesita remover phoneValidate ni agregar paso3.
        //paso = 3;
        btnGlass.value = btnGlass2_text;
        btnGlass.removeEventListener('click', busquedaPaso2);
        btnGlass.addEventListener('click', busquedaPaso3);
        //tel_field.value = "";
        //tel_field.placeholder = '';

    }, mapear_delay * 1000);
 
}

    function busquedaPaso3(){
       
        btnGlass.style.display = 'none';
        glassDisplay.style.display = 'none';
        
        //query.style.display = 'none';
        //glassDisplay.style.display = 'block';
        //Desaparece los textos que haya habido previamente.
        console.log("Estoy en busquedaPaso3, desapareciendo los textos anteriores.");
        textRowArea.innerHTML = "";
        //addTextRow(glass3_text1, 1 ,"intro_cero", writingGlass);
        /* addTextRow(glass3_text2, 3 ,"intro_uno", writingGlass);
        addTextRow(glass3_text3, 5 ,"intro_dos", writingGlass);
        addTextRow(glass3_text4, 7 ,"intro_tres", writingGlass);
        addTextRow(glass3_text5, 9 ,"intro_cuatro", writingGlass);
        addTextRow(glass3_text6, 12 ,"intro_cuatro", writingGlass); */
       
        setTimeout(() => {

            mensajes.style.display = 'block';
              
             setTimeout(() => {

                creaMapa(udEstaAqui);

                setTimeout(() => {
                    //Tip: El timeout más interno se ejecuta al final. 
                    busquedaPaso4(udEstaAqui);
                   
             }, sell_delay * 1000);
               
         }, map_delay * 1000);
 
        }, message_delay * 1000);
    }
   
    function busquedaPaso4(){

    console.log("Estoy en el paso 4!!"); 
    glassDisplay.style.display = 'block';
    formaPago.style.display = 'block';
    btnForm.value = btnForm_text;
    venta1.innerHTML = venta1_text1;
    venta2.innerHTML = venta1_text2;
    venta3.innerHTML = venta1_text3;
    venta4.innerHTML = venta1_text4;
    
    setTimeout(() => {

       
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