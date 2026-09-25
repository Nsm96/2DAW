const precioBase = 50;
const porcentaje = 21;
const descuento = precioBase * porcentaje / 100;

const precio_final = precioBase + descuento;

console.log('El precio inicial es: ' + precioBase.toFixed(2) + " €.")
console.log("El descuento es:" + descuento.toFixed(2) + " €.");
console.log("Aplicando el descuento el precio total es: " + precio_final.toFixed(2));

