const list = document.querySelector("#lista");
const final = document.querySelector("#total");

function actualizarTotal() {
  final.textContent = "LI Totales: " + list.querySelectorAll("li").length;
}

list.addEventListener("click", (event) => {
  const boton = event.target.closest(".borrar");
  if (!boton) {
    return;
  }
  boton.closest("li").remove();
  actualizarTotal();
});

actualizarTotal();
