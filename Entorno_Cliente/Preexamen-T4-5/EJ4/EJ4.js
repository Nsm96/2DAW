const discos = [
 {titulo: "Blue Train", precio: 18},
 {titulo: "Kind of Blue", precio: 24},
 {titulo: "Abbey Road", precio: 20}
];

const LimitePrecio = 20;

const listaDiscos = document.querySelector("#discos");

discos.forEach(disc => {
  if (disc.precio <= LimitePrecio){
    const discoFiltrado = document.createElement("li");
    discoFiltrado.textContent = disc.titulo + " - " + disc.precio.toFixed(2) + " €";
    listaDiscos.append(discoFiltrado);
  }
});