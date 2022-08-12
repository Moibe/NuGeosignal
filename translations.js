//Idioma
let idioma = 'spanish';
//Declaramos el json con las variables de idioma.
let jsonTranslations = JSON.parse(traducciones);

//Elementos de la página.
//Título
titulo_text = jsonTranslations[idioma].titulo_text;
const titulo = document.getElementById('titulo');
titulo.innerHTML = titulo_text;

placeholder_text = jsonTranslations[idioma].placeholder_text;

btnSubmit_text = jsonTranslations[idioma].btnSubmit_text;

//Textos de la Glass Window Paso 1:

glass1_text1 = jsonTranslations[idioma].glass1_text1;
glass1_text2 = jsonTranslations[idioma].glass1_text2;
glass1_text3 = jsonTranslations[idioma].glass1_text3;
glass1_text4 = jsonTranslations[idioma].glass1_text4;
