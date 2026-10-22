const cliente = { nombre: "Ana", descuento: 0 };

const { nombre, descuento } = cliente;
const descuentoAplicado = descuento ?? 10;

console.log(`Nombre: ${nombre}`);
console.log(`Descuento aplicado: ${descuentoAplicado}`);
