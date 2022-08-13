//Idioma
const hostname = window.location.hostname;
console.log("Esto es hostname:");
console.log(hostname);
if(hostname == "127.0.0.1"){
    console.log("Estamos en local...");
    idioma = "en";
}
else{
    //Si estamos en producción el idioma lo definimos desde la url.
    console.log("Entramos a chequeo de path...")
    const pathname = window.location.pathname;
    let pathcut = pathname.replace(/\//g,''); // Remove all slashes from string
    if (pathcut == ""){
        console.log("pathcut está vacío...");
        //Si no hay patchcut entonces el idioma default será inglés.
        //Cambiar después a que lo guarde en una cookie, por ahora sin cookies hasta primer revisión.
        idioma = "en";
    }else{
        console.log("Esto es pathcut: " + pathcut);
        idioma = pathcut;
    }
}

//Declaramos el json con las variables de idioma.
let jsonTranslations = JSON.parse(traducciones);

try {
    titulo_text = jsonTranslations[idioma].titulo_text;
  } catch (error) {
    console.log("Imprimiremos el error:");
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }

//Elementos de la página.
//Título

const titulo = document.getElementById('titulo');
titulo.innerHTML = titulo_text;

//Texto query
placeholder_text = jsonTranslations[idioma].placeholder_text;

//Botón Submit
btnSubmit_text = jsonTranslations[idioma].btnSubmit_text;

//Textos de la Glass Window Paso 1:
glass1_text1 = jsonTranslations[idioma].glass1_text1;
glass1_text2 = jsonTranslations[idioma].glass1_text2;
glass1_text3 = jsonTranslations[idioma].glass1_text3;
glass1_text4 = jsonTranslations[idioma].glass1_text4;

//Botón Glass
btnGlass_text = jsonTranslations[idioma].btnGlass_text;

//Textos de la Glass Window Paso 2:
glass2_text1 = jsonTranslations[idioma].glass2_text1;
glass2_text2 = jsonTranslations[idioma].glass2_text2;
glass2_text3 = jsonTranslations[idioma].glass2_text3;
glass2_text4 = jsonTranslations[idioma].glass2_text4;

//Texto glass mensajes:
mensajes_glass = jsonTranslations[idioma].mensajes_glass;

//Botón Submit Otra Vez
btnSubmit2_text = jsonTranslations[idioma].btnSubmit2_text;

//Textos de la Glass Window Paso 3:
glass3_text1 = jsonTranslations[idioma].glass3_text1;
glass3_text2 = jsonTranslations[idioma].glass3_text2;
glass3_text3 = jsonTranslations[idioma].glass3_text3;
glass3_text4 = jsonTranslations[idioma].glass3_text4;
glass3_text5 = jsonTranslations[idioma].glass3_text5;
glass3_text6 = jsonTranslations[idioma].glass3_text6;

//Ventana venta
venta1_text1 = jsonTranslations[idioma].venta1_text1;
venta1_text2 = jsonTranslations[idioma].venta1_text2;

//Botón Form
btnForm_text = jsonTranslations[idioma].btnForm_text;