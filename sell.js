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

formaPago.action = direccion; 