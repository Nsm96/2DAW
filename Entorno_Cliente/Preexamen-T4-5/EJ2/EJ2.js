const sumar = document.querySelector("#mas");
const restar = document.querySelector("#menos");
const resultado = document.querySelector("#total");

let numero = 0;

sumar.addEventListener("click", () => {
  numero++;
  actualizarNumero();

});

restar.addEventListener("click", () => {
  if (numero > 0) {
    numero--;
    actualizarNumero();
  }

});

function actualizarNumero() {
  if (numero <= 0) {
    restar.disabled = true;
  } else {
    restar.disabled = false;
  }
  resultado.textContent = numero;
}
actualizarNumero();