const buscar = document.querySelector("#busqueda");
const generos = document.querySelectorAll("#lista li");

buscar.addEventListener("input", () => {
  const textobuscado = buscar.value.trim().toLowerCase();

  generos.forEach((categorias) => {
    if (!categorias.textContent.toLowerCase().includes(textobuscado)) {
      categorias.hidden = true;
    } else {
      categorias.hidden = false;
    }
  });
});
