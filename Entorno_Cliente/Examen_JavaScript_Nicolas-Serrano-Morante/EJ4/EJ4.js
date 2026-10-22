const notas = [4, 7, 5, 3, 9, 6];
let suspensos = 0;
let aprobados = 0;

for (const nota of notas) {
    if (nota >= 5) {
        aprobados++;
    } else if (nota > 10) {
        console.log("No puede haber una nota mayor a 10");
    }
    else
        suspensos++;
}

console.log(`Hay ${aprobados} aprobados y ${suspensos} suspensos.`)