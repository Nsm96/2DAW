const list = document.querySelectorAll(".stock");

list.forEach(categoria => {
  categoria.textContent += " - disponible";
});