const lista = document.querySelectorAll(".stock");

lista.forEach((categoria) => {
  categoria.textContent += " - Disponible";
});
