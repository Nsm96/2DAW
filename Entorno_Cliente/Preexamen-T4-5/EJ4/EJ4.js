const discos = [
    { titulo: "Blue Train", precio: 18 },
    { titulo: "Kind of Blue", precio: 24 },
    { titulo: "Abbey Road", precio: 20 }
];

const listaUl = document.querySelector("#discos");

const limite = 20;


discos.forEach(item => {
    if (item.precio <= limite) {
        const li = document.createElement("li");
        li.textContent = item.titulo + " - " + item.precio.toFixed(2) + " €";
        listaUl.append(li);
    }
});