
let permiso;
let map;
let window_aceptar_permiso = true;
let local_storage_available;
let visitas;

//localStorage.clear();

//prod
console.log("ESTO ES EL REFERRER DE OUTPUT:");
console.log(document.referrer);

//Idioma
let idioma; 
let producto;
const hostname = window.location.hostname;

const pathname = window.location.pathname;
console.log("Ésto es PATHNAME (lo que va después del dominio):");
console.log(pathname);
let pathcut = pathname.replace(/\//g,''); // Remove all slashes from string
console.log("Ésto es PATHCUT (lo mismo pero sin diagonales):");
console.log(pathcut);

//Sell elements now global, check if serve to divrows too.
let btnForm = document.getElementById('btnForm');
let venta1 = document.getElementById('venta1_text1');
let venta2 = document.getElementById('venta1_text2');
let venta3 = document.getElementById('venta1_text3');
let venta4 = document.getElementById('venta1_text4');

let paso = 1; 

let marker_inicial;
var circle;
var maxPoints = 10;
var distancia_encuentro = 1;
let nueva_latitud;
let nueva_longitud;
let idRegistroPosicion;
let udEstaAqui;
var kmRadius1 = {'min': 5, 'max': 10}; //Estará de 5 a 10 kilometros de distancia. 
var kmRadius2 = {'min': 0.5, 'max': 1}; //y las antenas estarán separadas de medio a un kilometro.
var iconFile = 'ico-cel.png';
var myIcon = L.icon({
    iconUrl: iconFile,
    //iconSize: [38, 95],
    //iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});

const btnGlass = document.getElementById('btnGlass');
let writingGlass = document.getElementById('writingGlass');

const blockDisplay = document.getElementById('blockDisplay');

// Elementos de la primera sección: 
const seccionQuery = document.getElementById('query');
const tel_field = document.getElementById('tel_field');
const mensajes = document.getElementById("mensajes");
const locate_sample = document.getElementById("locate_sample");

// Elementos de la segunda sección:
const glassDisplay = document.getElementById('glassDisplay');

function iniciar(){
   
   console.log("Iniciar()...");
   console.log(document.referrer);
   primerMapa();

setTimeout(() => {
  
    setIdiomaProducto();
    setPrecios();
    getReferrer();
    variables_index();
    setTimeout(() => {
 
        
        setSellButton();
        
    
    }, 2 * 1000);
 
}, 2 * 1000);
}

function primerMapa(){
    
    console.log("Creando el mapa inicial");
    let mapOptions = {
    center:[51.505, -0.09],
    zoom:10,
    minZoom: 9,
    maxZoom: 20,
    }

map = new L.map('map' , mapOptions, { zoomControl:false });

/* var gl = L.mapboxGL({
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    style: 'https://api.maptiler.com/maps/086ae9b3-1710-4dd4-8c1d-b0329d5778a7/style.json?key=tQdXtnpaX5QclVTl8hct'
  }).addTo(map); */

//mapboxgl.accessToken = 'pk.eyJ1IjoibW9pYmUxODIiLCJhIjoiY2w2eGRkamdwMnFyMzNjdGVibnBpajNtaiJ9.FVn7wRlJyxw-lLzDu4T9RA';

  /* var gl = L.mapboxGL({
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    style: 'mapbox://styles/moibe182/cl6x96lhj001w14o6k2psrzk4'
  }).addTo(map); */

let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

/* map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable(); 
map.boxZoom.disable();
map.keyboard.disable();
map.zoomControl.disable(); */
}

function setIdiomaProducto(){

    //El idioma defualt es el idioma que tendremos en local 127.0.0.1 porque no hay un subdominio que lo designe.
    let idioma_default = "en";
    console.log("El idioma_default es:" + idioma_default);
    //El producto es el que le dará el precio y link de lo que estamos vendiendo que no siempre está ligado a un idioma a traducir.
    let producto_default = "en";
    console.log("El producto_default es:" + producto_default);

    console.log("Esto es hostname, que nos ayudará a definir el idioma y el producto cuando estamos en producción:");
    console.log(hostname);
    if(hostname == "127.0.0.1"){
        console.log("Estamos en local 127.0.0.1...");
        idioma = idioma_default;
        localStorage.setItem('idioma', JSON.stringify(idioma));
        console.log("El idioma será:" + idioma);
        producto = producto_default;
        console.log("El producto será:" + producto);
    }
    else{
        //Si estamos en producción el idioma lo definimos desde la url.
        console.log("Estamos en producción...");
        console.log("Entramos a chequeo de path...");
        
        if (pathcut == ""){
            console.log("pathcut está vacío, entraremos a los valores default de idioma y producto...");
            //Si no hay patchcut entonces el idioma default será inglés.
            //Cambiar después a que lo guarde en una cookie, por ahora sin cookies hasta primer revisión. Usar localStorage?
            idioma = idioma_default;
            localStorage.setItem('idioma', JSON.stringify(idioma));
            console.log("El idioma será:" + idioma);
            producto = producto_default;
            console.log("El producto será:" + producto);
        }else{
            console.log("Estamos en producción y si hay un pathcut que define el idioma y el producto...");
            console.log("Esto es pathcut: " + pathcut);
            //El idioma se usa para las traducciones.
            idioma = pathcut;
            localStorage.setItem('idioma', JSON.stringify(idioma));
            console.log("El idioma será:" + idioma);
            //El producto se usa para los precios dependiendo de la Campaña y País.
            producto = pathcut;
            console.log("El producto será:" + producto);
        }
    }
    const todo = document.getElementById('todo');
     }

function setPrecios(){

    //Declaramos el json con las variables de idioma.
    let jsonPrecios = JSON.parse(precios);
    //Idioma viene cortado de la url, es decir que por ejemplo EU aunque no es un idioma si nos ayuda a definir...
    //el precio de Europa porque esa es la URL que viene en la Campaña.

    try {
        idd_product = jsonPrecios[idioma].idd;
        console.log("El idd reportado desde precios.js es:");
        console.log(idd_product);
      } catch (ex) {
        console.log("Estamos en el catch de product idd...")
        console.error('inner', ex.message);
        //como el subdominio no existe como producto, entonces usarás el producto estándar: 
        idd_product = 22;

      } finally {
        
        console.log("Éste es el idd_product finalmente:");
        console.log(idd_product);
                }
            }

function setSellButton(){

    //En el futuro haz que el dominio dependa de ...
    domain = "https://www.campus-code.app/";
    
    path = "/checkout";
  
    console.log("Esto es domain:");
    console.log(domain);
    console.log("Esto es path:");
    console.log(path);
    direccion = domain + idioma + path; 
    console.log("Esto es dirección...");
    console.log(direccion);
    
    let formaPago = document.getElementById('formaPago');
    let id_product = document.getElementById('id_product');
    
    formaPago.action = direccion; 
    id_product.value = idd_product;
    
    }

function getReferrer(){

    console.log("Estoy en getReferrer...");
    console.log("Y el hostname, antes de checar el referer es:");
    console.log(hostname);
    
    console.log("y esto es el document.referrer!!!!:");
    referido = document.referrer;
    console.log("y esto es el referido!!!!:");
    console.log(referido)

    if(hostname == "127.0.0.1"){
        console.log("Como estoy en el ambiente de pruebas, no redireccionaré a divrows aunque no tenga referrer.");
    }else{

        if (referido ==""){
            console.log("Referido está vacío...");
            //Como el referido está vacío significa que entraron directamente y por lo tanto debe irse al proceso ALTERNO (divrows).
            redireccionador();
        }else{
            console.log("Referido es:");
            console.log(referido);
        }
    }
 
    //todo.style.display = 'block';
}

function redireccionador(){
    //Por como está ahora, referer ya siempre viene vacío, así es que siempre se irá a divrows.
    const protocol = window.location.protocol;
    console.log("Ésto es el protocolo:");
    console.log(protocol);
    console.log("Esto es hostname en index.js:");
    console.log(hostname);
    const port = window.location.port;
    console.log("Ésto es el port:");
    console.log(port);
         
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


function variables_index(){
translations();

timing_elements = 0;
buscar_delay = 10;
//mapear_delay: Requiere de por lo menos 7 segundos para que salgan todos los textos previos.
mapear_delay = 9;
requery_delay = 10;
retry_delay = 3;
//remap_delay: Requiere de por lo menos 9 segundos para poder acabar de escribir todo.
remap_delay = 14; 
sell_delay = 15;
paneo_delay = 2;
tel_field.placeholder = placeholder_text;

visitas = JSON.parse(localStorage.getItem('visita_conversion')); 
console.log("Esto es visitas después de extraerlo del localStorage;")
console.log("Undefined is non-existant...");

//Revisa si existe visita_conversion.
if(visitas == undefined){
    //Si no existe visitas conversión, es que nunca ha visitado el sitio. Y se debe crear en ceros.
    console.log("Visitas es undefined...");
    console.log("Por lo tanto lo crearemos...");
    localStorage.setItem('visita_conversion', JSON.stringify(0));
}
else{
    //Si sí existe no hagas nada
    console.log("Visitas si está definido y es:");
    console.log(visitas);
    localStorage.setItem('visita_conversion', JSON.stringify(0));
    console.log("Pero ahora de nuevo vale:");
    visitas = JSON.parse(localStorage.getItem('visita_conversion')); 
    console.log(visitas);
}

//Inicialiación del botón Principal.
const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.value = btnSubmit_text;
btnSubmit.addEventListener('click', startProcess);
}


function startProcess(){
    console.log("Starting overall process...");
    if (phoneValidate() == true){
        
        busquedaPaso1();
    }
    else{
        console.log("El teléfono no fue válido...");
    }
  }

function keepProcess(){
    console.log("Continuamos el proceso...");
    if (phoneValidate() == true){
         busquedaPaso3();
    }
    else{
        console.log("El teléfono no fue válido...");
    }
}

function phoneValidate(){
    
    //Obtención del teléfono del campo de teléfono.
    var phone = tel_field.value;

    if (phone == ""){
        mensajes.style.display = 'block';
        mensajes.innerText= mensajeTelVacio;
    }else{
  
    //Expresión regular que vamos a validar...
    var regExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
 
    //Compara ambos...
    if (regExp.test(phone)){ 
        mensajes.innerText= "Número válido";
        console.log("El número es válido...");
        return true;
    }
    else{ 
      mensajes.style.display = 'block';
      mensajes.innerText= "Validating phone number to worldwide carriers dbs..."; 
      
      setTimeout(() => {

      mensajes.innerText= mensajeTelIncorrecto; 
      return false;

    }, 2 * 1000);


    }
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

    //Antes de buscar la posición, manejaremos sus permisos: 
    console.log("Aquí está por escribir la función handlePermission...");
    
    handlePermission();
    
    setTimeout(() => {

        if(permiso == "granted" || permiso == "prompt"){
            console.log("El permiso es granted o prompt...");
            console.log(permiso)
            registrarPosicion();
        }else{
            console.log("El permiso NO es granted...");
            console.log("window permission:");
            console.log(window_aceptar_permiso);
            if(window_aceptar_permiso == true){
                locate_sample.style.display = 'block';
            }else{
                console.log("No haré nada respecto al permiso porque estoy fuera de la ventana de aceptación...");
            }
            
        }

    }, buscar_delay * 1000);

}


function busquedaPaso2(){
    
    window_aceptar_permiso = false;
    btnGlass.style.display = 'none';
    //Desaparece los textos que haya habido previamente.
    textRowArea.innerHTML = "";
    console.log("Processing @ busquedaPaso2()...");
   
    addTextRow(glass2_text1, 1 ,"intro_uno", writingGlass);
    addTextRow(glass2_text2, 3 ,"intro_dos", writingGlass);
    addTextRow(glass2_text3, 5 ,"intro_tres", writingGlass);
    addTextRow(glass2_text4, 7 ,"intro_cuatro", writingGlass);

    setTimeout(() => {

        creaMapa();
        glassDisplay.style.display = 'none';
        query.style.display = 'block';
        query.style.top = '60%';
        mensajes.style.display = 'block';
        mensajes.innerHTML = mensajes_glass;
        btnSubmit.value = btnSubmit2_text;
        //Ahora el paso a ejecutar está dictado por 'paso', ya no se necesita remover phoneValidate ni agregar paso3.
        paso = 3;
        btnSubmit.removeEventListener('click', startProcess);
        btnSubmit.addEventListener('click', keepProcess);
        tel_field.value = "";
        tel_field.placeholder = '';

    }, mapear_delay * 1000);
 
}

function busquedaPaso3(){
    //El paso 3 es el que desplegará el mapa final, el mapa que estás vendiendo y entregarás después del pago.
       
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
  
        creaMapa();
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