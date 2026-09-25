const listaNombres = ["ana","luis","marta","pedro","lucia","carlos","elena"];

let nombreIngresado = prompt("Escribe un nombre:");

if (nombreIngresado === null){
    console.log("Consulta cancelada");
} else if (nombreIngresado.toLocaleLowerCase().trim() === ""){
    console.log("Nombre vacío");
} else if (listaNombres.includes(nombreIngresado.toLocaleLowerCase().trim())){
    console.log(`Hola, ${nombreIngresado[0].toUpperCase()}${nombreIngresado.slice(1)}`);
} else {
    console.log("El nombre no está en la lista");
}