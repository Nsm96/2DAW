const numero = document.querySelector("#cantidad");
const revision = document.querySelector("#comprobar");
const alerta = document.querySelector("#error");

revision.addEventListener("click", () => {
  const cantidad = numero.valueAsNumber;
  if (cantidad <= 1 || cantidad >= 6) {
    alerta.textContent = "Cantidad no válida";
  } else {
    alerta.textContent = "";
  }
});
