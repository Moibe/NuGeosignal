console.log("Ejecutando inicializador();");
firstCheck();

setTimeout(() => {
        
    console.log("Ejecutando variables_iniciales();")
    variables_iniciales();

}, mapear_delay * 1000);


function inicializador(){

    //Idioma
    let idioma; 
    let producto;
    
    //El idioma defualt es el idioma que tendremos en local 127.0.0.1 porque no hay un subdominio que lo designe.
    let idioma_default = "en";
    console.log("El idioma default es:" + idioma_default);
    //El producto es el que le dará el precio y link de lo que estamos vendiendo que no siempre está ligado a un idioma a...
    //traducir.
    let producto_default = "en";
    console.log("El producto default es:" + producto_default);
    
    //Se revisa el hostname para saber si estamos en local o online.
    const hostname = window.location.hostname;
    console.log("Esto es hostname:");
    console.log(hostname);
    if(hostname == "127.0.0.1"){
        console.log("Estamos en local...");
        idioma = idioma_default;
        console.log("El idioma será:" + idioma);
        producto = producto_default;
        console.log("El producto será:" + producto);
    }
    else{
        //Si estamos en producción el idioma lo definimos desde la url.
        console.log("Entramos a chequeo de path...");
        const pathname = window.location.pathname;
        let pathcut = pathname.replace(/\//g,''); // Remove all slashes from string
        if (pathcut == ""){
            console.log("pathcut está vacío...");
            //Si no hay patchcut entonces el idioma default será inglés.
            //Cambiar después a que lo guarde en una cookie, por ahora sin cookies hasta primer revisión.
            idioma = idioma_default;
            console.log("El idioma será:" + idioma);
            producto = producto_default;
            console.log("El producto será:" + producto);
        }else{
            console.log("Esto es pathcut: " + pathcut);
            //El idioma se usa para las traducciones.
            idioma = pathcut;
            console.log("El idioma será:" + idioma);
            //El producto se usa para los precios dependiendo de la Campaña y País.
            producto = pathcut;
            console.log("El producto será:" + producto);
        }
    }
    

    }
    

function firstCheck(){
    referido = document.referrer;

    if (referido ==""){
        console.log("Referido está vacío...");
        redireccionador();
    }else{
        console.log("Referido es:");
        console.log(referido);
    }

    todo.style.display = 'block';


}

function redireccionador(){
    console.log("Inicializando...");
    const protocol = window.location.protocol;
    console.log("Ésto es el protocolo:");
    console.log(protocol);
    console.log("Esto es hostname en index.js:");
    console.log(hostname);
    const port = window.location.port;
    console.log("Ésto es el port:");
    console.log(port);
    //Ya no se necesita crear pathcut, porque eso se hace en init.
    /* const pathname = window.location.pathname;
    let pathcut = pathname.replace(/\//g,''); // Remove all slashes from string */
     
    if (pathcut == ""){
        console.log("pathcut está vacío...");
        asignacion = protocol + "//" + hostname + ":" + port +  "/divrows.html";
        console.log("Ésto es la asignación cuando no hay patchcut...");
        console.log(typeof asignacion);
        console.log(asignacion)
     
    }else{
       
        console.log("Esto es pathcut: " + pathcut);
        asignacion = protocol + "//" + hostname + ":" + port + "/" + pathcut + "/divrows.html";
        console.log("Esto es asignación cuando si hay pathcut:")
        console.log(typeof asignacion);
        console.log(asignacion);
        
    }
    
    window.location.assign(asignacion);

 }

function variables_iniciales(){
translations();
const todo = document.getElementById('todo');
let paso = 1; 
let marker_inicial;
var circle;
var maxPoints = 10;
var distancia_encuentro = 1;
let nueva_latitud;
let nueva_longitud;
let idRegistroPosicion;
let udEstaAqui;
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


const blockDisplay = document.getElementById('blockDisplay');

// Elementos de la primera sección: 
const seccionQuery = document.getElementById('query');
const tel_field = document.getElementById('tel_field');
const mensajes = document.getElementById("mensajes");
const locate_sample = document.getElementById("locate_sample");

var iconFile = 'ico-cel.png';

// Elementos de la segunda sección:

const glassDisplay = document.getElementById('glassDisplay');
tel_field.placeholder = placeholder_text;

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

//Inicialiación del botón Principal.
const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.value = btnSubmit_text;
btnSubmit.addEventListener('click', startProcess);
}
 
function startProcess(){
    console.log("Estamos iniciando el proceso...");
    if (phoneValidate() == true){
        
        busquedaPaso1();
    }
    else{
        console.log("El teléfono no fue válido...");
    }

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
   
    addTextRow(glass2_text1, 1 ,"intro_uno", writingGlass);
    addTextRow(glass2_text2, 3 ,"intro_dos", writingGlass);
    addTextRow(glass2_text3, 5 ,"intro_tres", writingGlass);
    addTextRow(glass2_text4, 7 ,"intro_cuatro", writingGlass);

    setTimeout(() => {
        
        //Usa éste si no quieres que haya antenas. 
        //colocaMarcador(udEstaAqui);

        //Usa éste si quieres ponerle antenas.
        creaMapa(udEstaAqui);
        glassDisplay.style.display = 'none';
        query.style.display = 'block';
        query.style.top = '60%';
        mensajes.style.display = 'block';
        mensajes.innerHTML = mensajes_glass;
        btnSubmit.value = btnSubmit2_text;
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
        addTextRow(glass3_text1, 1 ,"intro_cerp", writingGlass);
        addTextRow(glass3_text2, 3 ,"intro_uno", writingGlass);
        addTextRow(glass3_text3, 5 ,"intro_dos", writingGlass);
        addTextRow(glass3_text4, 7 ,"intro_tres", writingGlass);
        addTextRow(glass3_text5, 9 ,"intro_cuatro", writingGlass);
        addTextRow(glass3_text6, 12 ,"intro_cuatro", writingGlass);

        //y ahora hacemos tiempo para que despliegue el nuevo mapa.
        setTimeout(() => {
  
        creaMapa(udEstaAqui);
        glassDisplay.style.display = 'none';
        textRowArea.innerHTML = "";

             setTimeout(() => {
           
                glassDisplay.style.display = 'block';
                blockDisplay.style.display = 'block';
                busquedaPaso4();

        }, sell_delay * 1000);
 
        }, remap_delay * 1000);
    }
   
    function busquedaPaso4(){

    console.log("Estoy en el paso 4!!"); 
    formaPago.style.display = 'block';
    btnForm.value = btnForm_text;
    venta1.innerHTML = venta1_text1;
    venta2.innerHTML = venta1_text2;
    

   
 
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