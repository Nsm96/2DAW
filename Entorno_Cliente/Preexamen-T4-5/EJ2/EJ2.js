const menos = document.querySelector("#menos");
const mas = document.querySelector("#mas");
const total = document.querySelector("#total");

let contador = 0;

 function actualizarContador() {
    total.textContent = contador;
    if (contador === 0) {
        menos.disabled = true;
    } else {
        menos.disabled = false;
    }

}

mas.addEventListener("click", () => {
    contador++;
    actualizarContador();
})

menos.addEventListener("click", () => {
    if (contador > 0) {
        contador--;
        actualizarContador();
    }
})

actualizarContador();