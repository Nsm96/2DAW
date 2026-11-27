/*Al pulsar el botón, alterna la clase oscuro en #panel. El botón debe
mostrar «Activar modo claro» cuando la clase esté presente y «Activar
modo oscuro» cuando no lo esté. Inicializa también su texto. No se
pide CSS.*/

const idTema = document.querySelector("#tema");
const idPanel = document.querySelector("#panel");

idTema.addEventListener("click", () => {
  if (idTema) {
    idTema.textContent = "Cambiar a modo claro";
  } else {
    idPanel.textContent = "Activar modo oscuro";
  }
});
