inicializador(){

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
