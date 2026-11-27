const suma = document.querySelector("#sumar");
const resultado = document.querySelector("#total");
let contador = 0;

suma.addEventListener("click", () => {
  contador++;
  resultado.textContent = contador;
});
