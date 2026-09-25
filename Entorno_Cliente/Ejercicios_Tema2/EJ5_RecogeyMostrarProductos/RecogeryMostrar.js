const productos = [];
let productoIngresado = prompt("Inserte el producto:");

while (productoIngresado!== null){

    if (productoIngresado.trim() === ""){
        console.log("Producto no indicado, ingrese un producto válido.");
        productoIngresado = prompt("Inserte el producto:");
    } else {
        productos.push(productoIngresado.trim());
        productoIngresado = prompt("Inserte el producto:");
    }
}

if (productos.length === 0){
    
}