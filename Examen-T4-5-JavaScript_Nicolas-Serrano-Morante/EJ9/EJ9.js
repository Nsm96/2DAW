function codigoValido(texto) {
  const patron = /^(DIS)-[0-9]{4}[A-Z]?$/;
  return patron.test(texto);
}

console.log(codigoValido("DIS-4565Z")); // es verdadero
console.log(codigoValido("DIS-A56B")); // es falso
console.log(codigoValido("DON-1A2A")); // es falso
console.log(codigoValido("DC-89l")); // es falso
