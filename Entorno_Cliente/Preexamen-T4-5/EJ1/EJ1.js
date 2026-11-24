const lista = document.querySelectorAll(".stock");

lista.forEach(categorias => {
    categorias.textContent += " - disponible";
});