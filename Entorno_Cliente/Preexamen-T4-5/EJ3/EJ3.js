const buscar = document.querySelector("#busqueda");
const list = document.querySelectorAll("#lista li");

buscar.addEventListener("input", ()=> {
  const textoLimpio = buscar.value.toLowerCase().trim();

  list.forEach(categoria => {
    if (categoria.textContent.toLowerCase().includes(textoLimpio)){
      categoria.hidden = false;
    } else {
      categoria.hidden = true;
    }
  });
});