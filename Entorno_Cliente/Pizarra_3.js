const lista = document.querySelector("#lista-compra");

const elemento = document.createElement("li");

elemento.classList.add("producto");

elemento.textContent = "Pan";
lista.append(elemento);

const boton = document.querySelector("#btn-anadir");

let contador = 0;
boton.addEventListener("click", () => {
    contador++;
    const elemento2 = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = "Elemento " + contador;
    const btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.dataset.accion = "borrar";
    elemento2.append(texto, btnBorrar);
    lista.append(elemento2)
});

lista.addEventListener("click", (event) => {
    const botonPulsado = event.target.closest("button[data-accion]");
    if (!botonPulsado) return;
    if (botonPulsado.dataset.accion === "borrar") {
        const fila = botonPulsado.closest("li");
        fila.remove();
    }
})