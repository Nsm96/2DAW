const jamones = 23;
const cantidadEmpleados = 10;
let jamonesPorPersona;
let jamonesSobrantes;

jamonesPorPersona = jamones / cantidadEmpleados;
jamonesSobrantes = jamones % cantidadEmpleados;

console.log("Cada persona recibe: " + Math.floor(jamonesPorPersona) + " jamones.");
console.log("Sobran " + jamonesSobrantes + " jamones.");