const titulos = ["Blue Train", "Kind of Blue", "Abbey Road"];

const discosUl = document.querySelector("#discos");

titulos.forEach((nombreDisco) => {
  const nuevoDisco = document.createElement("li");
  nuevoDisco.textContent = nombreDisco.split(titulos);
  discosUl.append(nuevoDisco);
});
