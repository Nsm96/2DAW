const sumar = document.querySelector("#mas");
const restar = document.querySelector("#menos");
const resultado = document.querySelector("#total");
let contador = 0;

sumar.addEventListener("click", () => {
  contador++;
  actualizarContador();
});
restar.addEventListener("click", () => {
  if (contador > 0) {
    contador--;
  }
  actualizarContador();
});

function actualizarContador() {
  if (contador === 0) {
    restar.disabled = true;
  } else {
    restar.disabled = false;
  }
  resultado.textContent = contador;
}

actualizarContador();
