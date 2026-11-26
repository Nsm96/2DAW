const formReserva = document.querySelector("#reserva");
const inputNombre = document.querySelector("#nombre");
const inputCiudad = document.querySelector("#ciudad");
const spanErrorNombre = document.querySelector("#errNombre");
const spanErrorCiudad = document.querySelector("#errCiudad");
const avisar = document.querySelector("#aviso");

formReserva.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputNombre.value.trim().length >= 3) {
    spanErrorNombre.textContent = "";
  } else {
    spanErrorNombre.textContent = "Nombre no válido (mínimo 3 caracteres)";
  }
  if (inputCiudad.value.trim() === "") {
    spanErrorCiudad.textContent = "La ciudad no puede estar vacía";
  } else {
    spanErrorCiudad.textContent = "";
  }

  if (inputNombre.value.trim().length >= 3 && inputCiudad.value.trim() !== "") {
    avisar.textContent = "Reserva válida";
  } else {
    avisar.textContent = "";
  }
});

// 7

const inputCantidad = document.querySelector("#cantidad");

const inputSocio = document.querySelector("#socio");

const botonComprobar = document.querySelector("#comprobar");

const avisoError = document.querySelector("#error");

botonComprobar.addEventListener("click", () => {
  const cantidadLeida = inputCantidad.valueAsNumber;

  const comprobar = inputSocio.checked;

  let maximo = 3;

  if (comprobar === true) {
    maximo = 6;
  }

  if (
    Number.isInteger(cantidadLeida) &&
    cantidadLeida >= 1 &&
    cantidadLeida <= maximo
  ) {
    avisoError.textContent = "";
  } else {
    avisoError.textContent = "Cantidad no válida";
  }
});
