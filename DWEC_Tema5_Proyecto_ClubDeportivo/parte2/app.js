const MAX_BYTES_JPEG = 5_000_000;

const {
  normalizarEspacios,
  validarNombreSocio,
  validarUsuarioSocio,
  validarContrasenaSocio,
  validarTelefonoSocio,
  validarCodigoServicio,
  validarReferenciaCita,
  extraerCifrasTestimonio,
  separarEtiquetas
} = window.ValidadoresClub;

function limpiarEstado(contenedor) {
  contenedor.textContent = "";
}

function mostrarEstado(contenedor, tipo, titulo, items = []) {
  contenedor.textContent = "";
  const caja = document.createElement("div");
  caja.className = `caja-estado ${tipo === "error" ? "error-global" : "ok-global"}`;

  if (tipo === "error") {
    caja.textContent = titulo;
    contenedor.append(caja);
    return;
  }

  const h3 = document.createElement("h3");
  h3.textContent = titulo;
  caja.append(h3);

  if (items.length > 0) {
    const ul = document.createElement("ul");
    for (const texto of items) {
      const li = document.createElement("li");
      li.textContent = texto;
      ul.append(li);
    }
    caja.append(ul);
  }
  contenedor.append(caja);
}

function aplicarError(campo, mensaje, idError = `error-${campo.id}`) {
  campo.setCustomValidity(mensaje);
  const invalido = mensaje !== "";
  campo.setAttribute("aria-invalid", String(invalido));
  const salida = document.getElementById(idError);
  if (salida) salida.textContent = mensaje;
  return !invalido;
}

function comprobarJpegObligatorio(campoArchivo) {
  const archivo = campoArchivo.files[0];
  if (!archivo) return "Debes seleccionar una imagen JPEG.";
  if (archivo.type !== "image/jpeg") return "El archivo debe ser de tipo image/jpeg.";
  if (archivo.size > MAX_BYTES_JPEG) return "La imagen supera el límite de 5.000.000 bytes.";
  return "";
}

function fechaLocalHoy() {
  const hoy = new Date();
  const y = hoy.getFullYear();
  const m = String(hoy.getMonth() + 1).padStart(2, "0");
  const d = String(hoy.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parsearDatetimeLocal(valor) {
  const [parteFecha, parteHora] = valor.split("T");
  if (!parteFecha || !parteHora) return null;
  const f = parteFecha.split("-").map(Number);
  const h = parteHora.split(":").map(Number);
  if (f.length !== 3 || h.length < 2) return null;
  const fecha = new Date(f[0], f[1] - 1, f[2], h[0], h[1], h[2] || 0, 0);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

// 1. SOCIOS
(() => {
  const form = document.querySelector("#form-socios");
  const estado = document.querySelector("#estado-socios");
  const nombre = document.querySelector("#socio-nombre");
  const usuario = document.querySelector("#socio-usuario");
  const correo = document.querySelector("#socio-correo");
  const edad = document.querySelector("#socio-edad");
  const telefono = document.querySelector("#socio-telefono");
  const contrasena = document.querySelector("#socio-contrasena");
  const confirmacion = document.querySelector("#socio-confirmacion");
  const grupoModalidad = document.querySelector("#grupo-modalidad");
  const radios = [...form.querySelectorAll('input[name="modalidad"]')];
  const foto = document.querySelector("#socio-foto");
  const condiciones = document.querySelector("#socio-condiciones");
  let intentado = false;

  function validarModalidad() {
    const marcada = form.querySelector('input[name="modalidad"]:checked');
    const msg = marcada ? "" : "Selecciona una modalidad (mensual o anual).";
    radios[0].setCustomValidity(msg);
    grupoModalidad.setAttribute("aria-invalid", String(msg !== ""));
    radios.forEach((r) => r.setAttribute("aria-invalid", String(msg !== "")));
    document.getElementById("error-socio-modalidad").textContent = msg;
    return msg === "";
  }

  function validar(campo) {
    if (campo.name === "modalidad") return validarModalidad();
    campo.setCustomValidity("");
    let msg = "";

    if (campo === nombre) {
      const t = normalizarEspacios(nombre.value);
      if (t === "") msg = "El nombre completo es obligatorio.";
      else if (t.length < 4 || t.length > 50) msg = "Debe tener entre 4 y 50 caracteres tras normalizar espacios.";
      else if (!validarNombreSocio(nombre.value)) msg = "Solo letras españolas y un espacio entre palabras, sin números ni símbolos.";
    } else if (campo === usuario) {
      if (usuario.value === "") msg = "El usuario es obligatorio.";
      else if (!validarUsuarioSocio(usuario.value)) msg = "De 5 a 20 caracteres, empieza por letra ASCII y solo admite letras ASCII o cifras.";
    } else if (campo === correo) {
      if (correo.value.trim() === "" || correo.validity.valueMissing) msg = "El correo es obligatorio.";
      else if (correo.validity.typeMismatch) msg = "Introduce un correo electrónico válido.";
    } else if (campo === edad) {
      const n = edad.valueAsNumber;
      if (edad.value.trim() === "" || edad.validity.badInput || Number.isNaN(n)) msg = "La edad es obligatoria.";
      else if (!Number.isInteger(n)) msg = "La edad debe ser un número entero.";
      else if (n < 18 || n > 100) msg = "La edad debe estar entre 18 y 100 años.";
    } else if (campo === telefono) {
      if (telefono.value.trim() === "") msg = "El teléfono es obligatorio.";
      else if (!validarTelefonoSocio(telefono.value)) msg = "Formato requerido: +34 612 345 678 (primera cifra nacional 6, 7, 8 o 9).";
    } else if (campo === contrasena) {
      if (contrasena.value === "") msg = "La contraseña es obligatoria.";
      else if (!validarContrasenaSocio(contrasena.value)) msg = "De 8 a 16 caracteres, empieza por letra ASCII y solo usa letras ASCII, cifras o _.";
    } else if (campo === confirmacion) {
      if (confirmacion.value === "") msg = "Confirma la contraseña.";
      else if (confirmacion.value !== contrasena.value) msg = "Las contraseñas no coinciden.";
    } else if (campo === foto) {
      msg = comprobarJpegObligatorio(foto);
    } else if (campo === condiciones) {
      if (!condiciones.checked) msg = "Debes aceptar las condiciones del club.";
    }

    return aplicarError(campo, msg);
  }

  const orden = [nombre, usuario, correo, edad, telefono, contrasena, confirmacion, radios[0], foto, condiciones];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    intentado = true;
    limpiarEstado(estado);

    let primeroInvalido = null;
    for (const c of orden) {
      if (!validar(c) && !primeroInvalido) primeroInvalido = c;
    }
    if (primeroInvalido) {
      mostrarEstado(estado, "error", "Revisa los errores indicados en el formulario de socios.");
      primeroInvalido.focus();
      return;
    }

    const datos = new FormData(form);
    const nombreNormalizado = normalizarEspacios(nombre.value);
    datos.set("nombre", nombreNormalizado);
    datos.set("telefono", telefono.value.trim());
    datos.delete("contrasena");
    datos.delete("confirmacion");
    datos.delete("foto");

    mostrarEstado(estado, "ok", "Operación simulada: socio validado correctamente.", [
      `Nombre completo (normalizado): ${nombreNormalizado}`,
      `Usuario: ${usuario.value}`,
      `Modalidad elegida: ${datos.get("modalidad") === "anual" ? "Anual" : "Mensual"}`
    ]);
  });

  for (const c of [nombre, usuario, correo, edad, telefono, contrasena, confirmacion, ...radios, foto, condiciones]) {
    const ev = ["checkbox", "radio", "file"].includes(c.type) ? "change" : "input";
    c.addEventListener(ev, () => {
      limpiarEstado(estado);
      if (intentado) {
        validar(c);
        if (c === contrasena) validar(confirmacion);
      }
    });
  }
})();

// 2. SERVICIOS
(() => {
  const form = document.querySelector("#form-servicios");
  const estado = document.querySelector("#estado-servicios");
  const codigo = document.querySelector("#servicio-codigo");
  const nombre = document.querySelector("#servicio-nombre");
  const duracion = document.querySelector("#servicio-duracion");
  const precio = document.querySelector("#servicio-precio");
  const categoria = document.querySelector("#servicio-categoria");
  const campos = [codigo, nombre, duracion, precio, categoria];
  let intentado = false;

  function validar(campo) {
    campo.setCustomValidity("");
    let msg = "";

    if (campo === codigo) {
      if (codigo.value === "") msg = "El código de servicio es obligatorio.";
      else if (!validarCodigoServicio(codigo.value)) msg = "Debe tener formato DEP- seguido de 3 cifras (ej.: DEP-007).";
    } else if (campo === nombre) {
      const t = nombre.value.trim();
      if (t === "") msg = "El nombre del servicio es obligatorio.";
      else if (t.length < 3 || t.length > 50) msg = "Debe tener entre 3 y 50 caracteres.";
    } else if (campo === duracion) {
      const min = duracion.valueAsNumber;
      if (duracion.value.trim() === "" || duracion.validity.badInput || Number.isNaN(min)) msg = "La duración es obligatoria.";
      else if (!Number.isInteger(min) || min < 15 || min % 15 !== 0) msg = "Entero de minutos, mínimo 15 y múltiplo de 15.";
    } else if (campo === precio) {
      const p = precio.valueAsNumber;
      if (precio.value.trim() === "" || precio.validity.badInput || !Number.isFinite(p)) msg = "El precio es obligatorio.";
      else if (p < 0 || p > 9999.99) msg = "Debe estar entre 0 y 9999,99 €.";
      else if (precio.validity.stepMismatch) msg = "Máximo dos decimales (paso 0,01).";
    } else if (campo === categoria) {
      if (categoria.value === "") msg = "Selecciona una categoría.";
    }

    return aplicarError(campo, msg);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    intentado = true;
    limpiarEstado(estado);

    let primeroInvalido = null;
    for (const c of campos) {
      if (!validar(c) && !primeroInvalido) primeroInvalido = c;
    }
    if (primeroInvalido) {
      mostrarEstado(estado, "error", "Revisa los errores indicados en el formulario de servicios.");
      primeroInvalido.focus();
      return;
    }

    const datos = new FormData(form);
    const nombreLimpio = nombre.value.trim();
    datos.set("nombre", nombreLimpio);

    mostrarEstado(estado, "ok", "Operación simulada: servicio validado correctamente.", [
      `Código: ${codigo.value}`,
      `Servicio: ${nombreLimpio}`,
      `Duración: ${duracion.valueAsNumber} min`,
      `Precio: ${precio.valueAsNumber.toFixed(2)} €`,
      `Categoría: ${categoria.options[categoria.selectedIndex].textContent}`
    ]);
  });

  for (const c of campos) {
    c.addEventListener(c.tagName === "SELECT" ? "change" : "input", () => {
      limpiarEstado(estado);
      if (intentado) validar(c);
    });
  }
})();

// 3. TESTIMONIOS
(() => {
  const form = document.querySelector("#form-testimonios");
  const estado = document.querySelector("#estado-testimonios");
  const autor = document.querySelector("#testimonio-autor");
  const texto = document.querySelector("#testimonio-texto");
  const contador = document.querySelector("#contador-testimonio");
  const btnCifras = document.querySelector("#btn-extraer-cifras");
  const salidaCifras = document.querySelector("#salida-cifras");
  const publicar = document.querySelector("#testimonio-publicar");
  let intentado = false;

  function actualizarContador() {
    contador.textContent = `${texto.value.trim().length} / 500 caracteres (mínimo 10 tras trim()).`;
  }

  function validar(campo) {
    campo.setCustomValidity("");
    let msg = "";
    if (campo === autor) {
      const t = autor.value.trim();
      if (t === "") msg = "El autor es obligatorio.";
      else if (t.length < 2 || t.length > 50) msg = "Debe tener entre 2 y 50 caracteres.";
    } else if (campo === texto) {
      const t = texto.value.trim();
      if (t === "") msg = "El testimonio es obligatorio.";
      else if (t.length < 10 || t.length > 500) msg = "Debe tener entre 10 y 500 caracteres tras trim().";
    }
    return aplicarError(campo, msg);
  }

  texto.addEventListener("input", actualizarContador);

  btnCifras.addEventListener("click", () => {
    const encontradas = extraerCifrasTestimonio(texto.value);
    salidaCifras.textContent = `Cifras encontradas: ${JSON.stringify(encontradas)}`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    intentado = true;
    limpiarEstado(estado);

    let primeroInvalido = null;
    for (const c of [autor, texto]) {
      if (!validar(c) && !primeroInvalido) primeroInvalido = c;
    }
    if (primeroInvalido) {
      mostrarEstado(estado, "error", "Revisa los errores indicados en el formulario de testimonios.");
      primeroInvalido.focus();
      return;
    }

    const datos = new FormData(form);
    const autorLimpio = autor.value.trim();
    const textoLimpio = texto.value.trim();
    datos.set("autor", autorLimpio);
    datos.set("testimonio", textoLimpio);

    mostrarEstado(estado, "ok", "Operación simulada: testimonio validado correctamente.", [
      `Autor: ${autorLimpio}`,
      `Visibilidad: ${publicar.checked ? "Autorizado para publicación" : "Queda privado (sin autorización)"}`
    ]);
  });

  for (const c of [autor, texto, publicar]) {
    c.addEventListener(c.type === "checkbox" ? "change" : "input", () => {
      limpiarEstado(estado);
      if (intentado && c !== publicar) validar(c);
    });
  }
})();

// 4. NOTICIAS
(() => {
  const form = document.querySelector("#form-noticias");
  const estado = document.querySelector("#estado-noticias");
  const titulo = document.querySelector("#noticia-titulo");
  const contenido = document.querySelector("#noticia-contenido");
  const etiquetas = document.querySelector("#noticia-etiquetas");
  const fecha = document.querySelector("#noticia-fecha");
  const imagen = document.querySelector("#noticia-imagen");
  const campos = [titulo, contenido, etiquetas, fecha, imagen];
  let intentado = false;

  function validar(campo) {
    campo.setCustomValidity("");
    let msg = "";
    if (campo === titulo) {
      const t = titulo.value.trim();
      if (t === "") msg = "El título es obligatorio.";
      else if (t.length < 3 || t.length > 100) msg = "Debe tener entre 3 y 100 caracteres.";
    } else if (campo === contenido) {
      const t = contenido.value.trim();
      if (t === "") msg = "El contenido es obligatorio.";
      else if (t.length < 20 || t.length > 2000) msg = "Debe tener entre 20 y 2000 caracteres.";
    } else if (campo === fecha) {
      if (fecha.value === "" || fecha.validity.badInput) msg = "La fecha es obligatoria.";
      else if (fecha.value <= fechaLocalHoy()) msg = "La fecha debe ser posterior al día de hoy.";
    } else if (campo === imagen) {
      msg = comprobarJpegObligatorio(imagen);
    }
    return aplicarError(campo, msg);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    intentado = true;
    limpiarEstado(estado);

    let primeroInvalido = null;
    for (const c of campos) {
      if (!validar(c) && !primeroInvalido) primeroInvalido = c;
    }
    if (primeroInvalido) {
      mostrarEstado(estado, "error", "Revisa los errores indicados en el formulario de noticias.");
      primeroInvalido.focus();
      return;
    }

    const datos = new FormData(form);
    const tituloLimpio = titulo.value.trim();
    const listaEtiquetas = separarEtiquetas(etiquetas.value);
    datos.set("titulo", tituloLimpio);
    datos.set("contenido", contenido.value.trim());
    datos.set("etiquetas", JSON.stringify(listaEtiquetas));
    datos.delete("imagen");

    mostrarEstado(estado, "ok", "Operación simulada: noticia validada correctamente.", [
      `Título: ${tituloLimpio}`,
      `Etiquetas (${listaEtiquetas.length}): ${listaEtiquetas.length ? listaEtiquetas.join(", ") : "Ninguna"}`,
      `Fecha de publicación: ${fecha.value}`,
      `Archivo JPEG: ${imagen.files[0].name} (${imagen.files[0].size} bytes)`
    ]);
  });

  for (const c of campos) {
    c.addEventListener(c.type === "file" ? "change" : "input", () => {
      limpiarEstado(estado);
      if (intentado) validar(c);
    });
  }
})();

// 5. CITAS
(() => {
  const form = document.querySelector("#form-citas");
  const estado = document.querySelector("#estado-citas");
  const referencia = document.querySelector("#cita-referencia");
  const socio = document.querySelector("#cita-socio");
  const servicio = document.querySelector("#cita-servicio");
  const fechaHora = document.querySelector("#cita-fecha-hora");
  const confirmacion = document.querySelector("#cita-confirmacion");
  const campos = [referencia, socio, servicio, fechaHora, confirmacion];
  let intentado = false;

  function validar(campo) {
    campo.setCustomValidity("");
    let msg = "";
    if (campo === referencia) {
      if (referencia.value === "") msg = "La referencia de cita es obligatoria.";
      else if (!validarReferenciaCita(referencia.value)) msg = "Debe ser CITA- o RES- seguido de 4 cifras (ej.: CITA-0001).";
    } else if (campo === socio) {
      if (socio.value === "") msg = "Selecciona un socio.";
    } else if (campo === servicio) {
      if (servicio.value === "") msg = "Selecciona un servicio.";
    } else if (campo === fechaHora) {
      if (fechaHora.value === "" || fechaHora.validity.badInput) msg = "La fecha y hora son obligatorias.";
      else {
        const instante = parsearDatetimeLocal(fechaHora.value);
        if (!instante || instante.getTime() <= Date.now()) {
          msg = "La fecha y hora deben ser estrictamente posteriores al momento actual.";
        }
      }
    } else if (campo === confirmacion) {
      if (!confirmacion.checked) msg = "Debes confirmar que has revisado los datos de la cita.";
    }
    return aplicarError(campo, msg);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    intentado = true;
    limpiarEstado(estado);

    let primeroInvalido = null;
    for (const c of campos) {
      if (!validar(c) && !primeroInvalido) primeroInvalido = c;
    }
    if (primeroInvalido) {
      mostrarEstado(estado, "error", "Revisa los errores indicados en el formulario de citas.");
      primeroInvalido.focus();
      return;
    }

    const datos = new FormData(form);
    mostrarEstado(estado, "ok", "Operación simulada: cita validada correctamente.", [
      `Referencia: ${referencia.value}`,
      `Socio: ${socio.options[socio.selectedIndex].textContent}`,
      `Servicio: ${servicio.options[servicio.selectedIndex].textContent}`,
      `Fecha y hora: ${datos.get("fechaHora").replace("T", " ")}`
    ]);
  });

  for (const c of campos) {
    const ev = c.tagName === "SELECT" || c.type === "checkbox" ? "change" : "input";
    c.addEventListener(ev, () => {
      limpiarEstado(estado);
      if (intentado) validar(c);
    });
  }
})();

// 6. DEMOSTRACIÓN JS VS PATTERN
(() => {
  const form = document.querySelector("#form-demo-pattern");
  const campo = document.querySelector("#demo-codigo");
  const btnComparar = document.querySelector("#btn-comparar-js");
  const estado = document.querySelector("#estado-demo-pattern");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mostrarEstado(estado, "ok", "Validación HTML superada.", [
      `Valor: "${campo.value}"`,
      `HTML checkValidity(): ${campo.checkValidity()}`,
      `JS validarCodigoServicio(): ${validarCodigoServicio(campo.value)}`
    ]);
  });

  btnComparar.addEventListener("click", () => {
    const htmlOk = campo.checkValidity();
    const jsOk = validarCodigoServicio(campo.value);
    const detalleHtml = campo.validity.valueMissing
      ? "vacío (valueMissing)"
      : campo.validity.patternMismatch
        ? "no cumple pattern (patternMismatch)"
        : "válido";

    mostrarEstado(
      estado,
      htmlOk && jsOk ? "ok" : "error",
      `Entrada "${campo.value}" -> HTML nativo: ${detalleHtml} | Validador JS: ${jsOk}`
    );
  });

  campo.addEventListener("input", () => limpiarEstado(estado));
})();
