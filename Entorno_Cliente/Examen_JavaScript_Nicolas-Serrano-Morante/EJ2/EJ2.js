const importe = 120;
const porcentajeDescuento = 10;
if (importe >= 100) {
    let descuentoAplicado = importe * porcentajeDescuento / 100;
    let totalPagar = importe - descuentoAplicado;

    console.log("El total a pagar con descuento es: " + totalPagar);
} else if (importe < 0) {
    console.log("El importe no puede ser negativo.");
} else {
    console.log("El total a pagar sin descuento es: " + importe);
}