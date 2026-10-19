const grid = document.querySelector(".grid");

tienda.forEach(function (datos) {

    const caja = document.createElement("div");
    caja.classList.add("tarjetas");
    grid.appendChild(caja);


    const caratula = document.createElement("img");
    caratula.classList.add("caratula");
    caratula.src = datos.caratula;
    caratula.alt = `Carátula del disco ${datos.titulo}`;
    caratula.onerror = function () {
        caratula.src = "img/imagenError.jpg";
        caratula.style.opacity = 0.5;
    }
    caja.appendChild(caratula);

    const tituloDisco = document.createElement("h2");
    tituloDisco.classList.add("titulo");
    tituloDisco.textContent = datos.titulo;
    caja.appendChild(tituloDisco);

    const artistaDisco = document.createElement("p");
    artistaDisco.classList.add("artista");
    artistaDisco.textContent = datos.artista;
    caja.appendChild(artistaDisco);

    const divPaisyAnio = document.createElement("div");
    divPaisyAnio.classList.add("divPaisyAnio");

    const paisDisco = document.createElement("span");
    paisDisco.classList.add("pais");
    paisDisco.textContent = datos.pais;

    divPaisyAnio.appendChild(paisDisco);

    const anioDisco = document.createElement("span");
    anioDisco.classList.add("publicacion");
    anioDisco.textContent = datos.publicacion;
    divPaisyAnio.appendChild(anioDisco);
    caja.appendChild(divPaisyAnio);


    const copiasDisco = document.createElement("p");
    copiasDisco.classList.add("copias");
    copiasDisco.textContent = `📀${datos.copias}k copias vendidas`;
    caja.appendChild(copiasDisco);

    const precioDisco = document.createElement("p");
    precioDisco.classList.add("precio");
    precioDisco.textContent = `€${datos.precio.toFixed(2)}`;
    caja.appendChild(precioDisco);


});