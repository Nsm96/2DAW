import { productos } from "./productos.js";



export function obtenerNombresOrdenados(listaProductos){
let conStock = listaProductos.filter(function(producto){
    return producto.stock > 0;
});


conStock.sort(function (a, b){
    return a.precio - b.precio;

});

let nombresOrdenados = conStock.map(function(producto){
    return producto.nombre;
});
return nombresOrdenados;
}

export function calcularValorInventario (listaProductos){
    let acumuladora = 0;
    for (let i = 0; i < listaProductos.length; i++){
        acumuladora += listaProductos[i].precio * listaProductos[i].stock;
    }
    return acumuladora;

}

export function buscarPorId(listaProductos, id){
    for (let i = 0; i < listaProductos.length; i++){
        if (listaProductos[i].id === id){
            return listaProductos[i];
        } 

    }
    return `ID no válido.`
}