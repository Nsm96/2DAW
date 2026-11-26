const listUl = document.querySelector("#lista");
const resultadoTotal = document.querySelector("#total");

listUl.addEventListener("click", (e) => {
  if (e.target.closest(".borrar")){
    e.target.closest("li").remove();
    recuentoTotal();
  }
})

function recuentoTotal() {
  const listaLi = document.querySelectorAll("#lista li")
  const recuento = listaLi.length;
  resultadoTotal.textContent = "Total: " + recuento;
}

recuentoTotal();