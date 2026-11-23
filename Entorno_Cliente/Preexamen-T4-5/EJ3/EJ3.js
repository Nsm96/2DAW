const busqueda = document.querySelector("#busqueda");
const lista = document.querySelectorAll("#lista li");

busqueda.addEventListener("input", () => {
    const textoBuscado = busqueda.value.trim().toLowerCase();

    lista.forEach(categorias => {
        const categoriaBuscada = categorias.textContent.trim().toLowerCase();
        if (categoriaBuscada.includes(textoBuscado)) {
            categorias.hidden = false;
        } else {
            categorias.hidden = true;
        }

    });
})