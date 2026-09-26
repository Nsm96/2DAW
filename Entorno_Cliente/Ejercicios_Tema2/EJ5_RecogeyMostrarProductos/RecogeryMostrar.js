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
    console.log("Lista vacía");
} else {
    console.log(productos);
    console.log(`Total de productos: ${productos.length}`);
<<<<<<< HEAD
}
=======
}
>>>>>>> b4c2dbcba20d208b438cb89cf0b249fd63d7f5b7
