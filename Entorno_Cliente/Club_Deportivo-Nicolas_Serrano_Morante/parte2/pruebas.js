const V = typeof window !== "undefined" && window.ValidadoresClub
  ? window.ValidadoresClub
  : require("./validadores.js");

const informe = [];

function comprobar(regla, entrada, esperado, obtenido) {
  const pasa = JSON.stringify(esperado) === JSON.stringify(obtenido);
  console.assert(pasa, `FALLO en ${regla} con ${JSON.stringify(entrada)}: esperado ${JSON.stringify(esperado)}, obtenido ${JSON.stringify(obtenido)}`);
  informe.push({ regla, entrada: JSON.stringify(entrada), esperado: JSON.stringify(esperado), obtenido: JSON.stringify(obtenido), pasa });
}

// 1. Nombre y normalización
comprobar("normalizarEspacios", "  Ana   López  ", "Ana López", V.normalizarEspacios("  Ana   López  "));
comprobar("validarNombreSocio", "  Ana   López  ", true, V.validarNombreSocio("  Ana   López  "));
comprobar("validarNombreSocio", "Ana2 López", false, V.validarNombreSocio("Ana2 López"));
comprobar("validarNombreSocio", "Ángela Núñez Güemes", true, V.validarNombreSocio("Ángela Núñez Güemes"));
comprobar("validarNombreSocio (3 chars)", "Ana", false, V.validarNombreSocio("Ana"));
comprobar("validarNombreSocio (4 chars)", "Juan", true, V.validarNombreSocio("Juan"));
comprobar("validarNombreSocio (50 chars)", "a".repeat(50), true, V.validarNombreSocio("a".repeat(50)));
comprobar("validarNombreSocio (51 chars)", "a".repeat(51), false, V.validarNombreSocio("a".repeat(51)));

// 2. Usuario (cada prueba repetida 2 veces)
for (const [val, esp] of [["ana77", true], ["7ana7", false], ["ana_7", false], ["abcd", false], ["abcde", true], ["a".repeat(20), true], ["a".repeat(21), false]]) {
  comprobar("validarUsuarioSocio (1ª)", val, esp, V.validarUsuarioSocio(val));
  comprobar("validarUsuarioSocio (2ª)", val, esp, V.validarUsuarioSocio(val));
}

// 3. Contraseña (cada prueba repetida 2 veces)
for (const [val, esp] of [["Clave_12", true], ["1Clave_2", false], ["Clave-12", false], ["Clav_12", false], ["Clave_1234567890", true], ["Clave_12345678901", false]]) {
  comprobar("validarContrasenaSocio (1ª)", val, esp, V.validarContrasenaSocio(val));
  comprobar("validarContrasenaSocio (2ª)", val, esp, V.validarContrasenaSocio(val));
}

// 4. Teléfono y códigos
comprobar("validarTelefonoSocio", "+34 612 345 678", true, V.validarTelefonoSocio("+34 612 345 678"));
comprobar("validarTelefonoSocio", "  +34 958 111 222  ", true, V.validarTelefonoSocio("  +34 958 111 222  "));
comprobar("validarTelefonoSocio (sin +)", "34 612 345 678", false, V.validarTelefonoSocio("34 612 345 678"));
comprobar("validarTelefonoSocio (sin esp)", "+34612345678", false, V.validarTelefonoSocio("+34612345678"));
comprobar("validarTelefonoSocio (inicio 5)", "+34 512 345 678", false, V.validarTelefonoSocio("+34 512 345 678"));
comprobar("validarTelefonoSocio (10 díg)", "+34 612 345 6789", false, V.validarTelefonoSocio("+34 612 345 6789"));

comprobar("validarCodigoServicio", "DEP-007", true, V.validarCodigoServicio("DEP-007"));
comprobar("validarCodigoServicio", "dep-007", false, V.validarCodigoServicio("dep-007"));
comprobar("validarCodigoServicio", "DEP-07", false, V.validarCodigoServicio("DEP-07"));
comprobar("validarCodigoServicio", "XDEP-007", false, V.validarCodigoServicio("XDEP-007"));

comprobar("validarReferenciaCita", "CITA-0001", true, V.validarReferenciaCita("CITA-0001"));
comprobar("validarReferenciaCita", "RES-2026", true, V.validarReferenciaCita("RES-2026"));
comprobar("validarReferenciaCita", "XCITA-0001", false, V.validarReferenciaCita("XCITA-0001"));
comprobar("validarReferenciaCita", "RES-001", false, V.validarReferenciaCita("RES-001"));

// 5. Métodos de texto
comprobar("extraerCifrasTestimonio", "Hay 12 clases y 3 pistas", ["12", "3"], V.extraerCifrasTestimonio("Hay 12 clases y 3 pistas"));
comprobar("extraerCifrasTestimonio (vacío)", "Sin números aquí", [], V.extraerCifrasTestimonio("Sin números aquí"));
comprobar("separarEtiquetas", "club, salud,, verano", ["club", "salud", "verano"], V.separarEtiquetas("club, salud,, verano"));
comprobar("separarEtiquetas (vacío)", "", [], V.separarEtiquetas(""));
comprobar("separarEtiquetas (sobrantes)", " ,  , ", [], V.separarEtiquetas(" ,  , "));

const ok = informe.filter((r) => r.pasa).length;
console.log(`Pruebas Tema 5B superadas: ${ok}/${informe.length}`);
console.table(informe);
