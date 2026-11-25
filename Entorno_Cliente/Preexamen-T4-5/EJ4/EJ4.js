const discos = [
  { titulo: "Blue Train", precio: 18 },
  { titulo: "Kind of Blue", precio: 24 },
  { titulo: "Abbey Road", precio: 20 },
];

const limite = 20;

const discosUl = document.querySelector("#discos");

discos.forEach((item) => {
  if (item.precio <= limite) {
    const discoFiltrado = document.createElement("li");
    discoFiltrado.textContent =
      item.titulo + " - " + item.precio.toFixed(2) + " €";
    discosUl.append(discoFiltrado);
  }
});
