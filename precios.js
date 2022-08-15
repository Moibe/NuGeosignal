function setPrecios(){

    //Declaramos el json con las variables de idioma.
    let jsonPrecios = JSON.parse(precios);
    //Idioma viene cortado de la url, es decir que por ejemplo EU aunque no es un idioma si nos ayuda a definir...
    //el precio de Europa porque esa es la URL que viene en la Campaña.
    idd_product = jsonPrecios[idioma].idd;
    console.log("El idd reportado desde precios.js es:");
    console.log(idd_product);

}

