function normalizarEspacios(texto) {
  return String(texto).trim().replace(/ +/g, " ");
}

function validarNombreSocio(entrada) {
  const limpio = normalizarEspacios(entrada);
  if (limpio.length < 4 || limpio.length > 50) return false;
  return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(limpio);
}

function validarUsuarioSocio(entrada) {
  return /^[A-Za-z][A-Za-z0-9]{4,19}$/.test(String(entrada));
}

function validarContrasenaSocio(entrada) {
  return /^[A-Za-z][A-Za-z0-9_]{7,15}$/.test(String(entrada));
}

function validarTelefonoSocio(entrada) {
  const limpio = String(entrada).trim();
  return /^\+34 [6-9][0-9]{2} [0-9]{3} [0-9]{3}$/.test(limpio);
}

function validarCodigoServicio(entrada) {
  return /^DEP-[0-9]{3}$/.test(String(entrada));
}

function validarReferenciaCita(entrada) {
  return /^(?:CITA|RES)-[0-9]{4}$/.test(String(entrada));
}

function extraerCifrasTestimonio(texto) {
  return String(texto).match(/[0-9]+/g) ?? [];
}

function separarEtiquetas(entrada) {
  return String(entrada)
    .split(/,/)
    .map((etiqueta) => etiqueta.trim())
    .filter((etiqueta) => etiqueta !== "");
}

const ValidadoresClub = {
  normalizarEspacios,
  validarNombreSocio,
  validarUsuarioSocio,
  validarContrasenaSocio,
  validarTelefonoSocio,
  validarCodigoServicio,
  validarReferenciaCita,
  extraerCifrasTestimonio,
  separarEtiquetas
};

if (typeof window !== "undefined") window.ValidadoresClub = ValidadoresClub;
if (typeof module !== "undefined" && module.exports) module.exports = ValidadoresClub;
