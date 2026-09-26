const colores = ["rojo","azul","verde","amarillo"];
let colorBuscado = "verde";
let colorBuscado2 = "negro";
colorBuscado = colorBuscado.trim().toLocaleLowerCase();
colorBuscado2 = colorBuscado2.trim().toLocaleLowerCase();

if (colores.includes(colorBuscado)){
    console.log(`Color <<${colorBuscado}>> encontrado`);
} else{
    console.log(`Color <<${colorBuscado}>> no encontrado`);
}

if (colores.includes(colorBuscado2)){
    console.log(`Color <<${colorBuscado2}>> encontrado`)
} else {
    console.log(`Color <<${colorBuscado2}>> no encontrado`)
}