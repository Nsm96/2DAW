function codigoValido(texto) {
    const patron = /^(VIN|CD)-[0-9]{3}[A-Z]?$/;
    return patron.test(texto);
}

console.log(codigoValido("VIN-456")); // true
console.log(codigoValido("CD-456B")); // true
console.log(codigoValido("VIN-12A")); // false
console.log(codigoValido("DC-789")); // false