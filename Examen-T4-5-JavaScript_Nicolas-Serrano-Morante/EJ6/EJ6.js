/*
rm id="reserva" novalidate>
 <input id="nombre" type="text">
 <button type="submit">Reservar</button>
</form>
<p id="aviso"></p>
Gestiona el evento submit y evita la recarga. El nombre, tras trim(),
debe tener al menos 3 caracteres. Si no cumple, muestra «Nombre
demasiado corto»; si cumple, «Reserva de NOMBRE», sustituyendo
NOMBRE por el valor limpio. Actualiza siempre #aviso con
textContent.
*/

const reservar = document.querySelector("#reserva");
const inputNombre = document.querySelector("#nombre");
const avisar = document.querySelector("#aviso");

reservar.addEventListener("submit", (e) => {
  e.preventDefault;

  if (!inputNombre.value.trim().length >= 3) {
    avisar.textContent = "Nombre demasiado corto";
  } else {
    avisar.textContent = "Reserva de " + inputNombre.textContent;
  }
});

// revisar
