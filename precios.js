//Declaramos el json con las variables de idioma.
let jsonPrecios = JSON.parse(precios);
idd_now = jsonPrecios[idioma].idd;
console.log("El idd reportado desde precios.js es:");
console.log(idd_now);