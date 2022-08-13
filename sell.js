domain = "https://www.campus-code.app/";
language = idioma;
path = "/checkout";
idd = 2; 

console.log("Esto es domain:");
console.log(domain);
console.log("Esto es language:");
console.log(language);
console.log("Esto es path:");
console.log(path);

direccion = domain + language + path; 
console.log("Esto es dirección...");
console.log(direccion);

let formaPago = document.getElementById('formaPago');
let btnForm = document.getElementById('btnForm');
let venta1 = document.getElementById('venta1_text1');
let venta2 = document.getElementById('venta1_text2');
let id_product = document.getElementById('id_product');

formaPago.action = direccion; 
id_product.value = "2";
