//En el futuro haz que el dominio dependa de ...
domain = "https://www.campus-code.app/";

path = "/checkout";
//El idd debe depender del idioma:
//es:
idd = 2; 
//nl:
//idd = 5;
//pt:
//idd = 12;
//en:
//idd = 22;

console.log("Esto es domain:");
console.log(domain);

console.log("Esto es path:");
console.log(path);

direccion = domain + idioma + path; 
console.log("Esto es dirección...");
console.log(direccion);

let formaPago = document.getElementById('formaPago');
let btnForm = document.getElementById('btnForm');
let venta1 = document.getElementById('venta1_text1');
let venta2 = document.getElementById('venta1_text2');
let venta3 = document.getElementById('venta1_text3');
let venta4 = document.getElementById('venta1_text4');
let id_product = document.getElementById('id_product');

formaPago.action = direccion; 
id_product.value = "2";
