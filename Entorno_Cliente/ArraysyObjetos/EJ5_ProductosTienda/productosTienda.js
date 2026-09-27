const lista = [
    { nombre: "Cuaderno", precio: 4 },
    { nombre: "Bolígrafo", precio: 2 },
    { nombre: "Mochila", precio: 25 }
]

const tienda = {
    productos: lista,

    calcularTotal: function () {
        let total = 0;

        for (let i = 0; i < this.productos.length; i++) {
            total += this.productos[i].precio;
        }
        return total;
    }
}

const tiendaVacia = {
    productos: [],

    calcularTotal: function () {
        let total = 0;

        for (let i = 0; i < this.productos.length; i++) {
            total += this.productos[i].precio;
        }
        return total;
    }
}

let resultado = tienda.calcularTotal().toFixed(2);
console.log(resultado);

let resultadoVacio = tiendaVacia.calcularTotal().toFixed(2);
console.log(resultadoVacio);