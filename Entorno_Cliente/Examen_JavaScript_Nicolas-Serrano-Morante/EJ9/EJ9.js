const notas = [6, 8, 4, 10];
const notas2 = [];

function calcularMedia(notas) {

    if (notas.length === 0) {
        return null;
    }

    const total = notas.reduce((acumulador, nota) =>
        acumulador + nota, 0);
    return total / notas.length;

}

console.log("Media: " + calcularMedia(notas));
console.log("Array vacio: " + calcularMedia(notas2));

