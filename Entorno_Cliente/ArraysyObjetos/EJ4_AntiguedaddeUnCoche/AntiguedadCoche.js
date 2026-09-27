let fechaActual = new Date();
let anioActual = fechaActual.getFullYear();
const coche = {
    marca: "Toyota",
    modelo: "Yaris",
    anio: 2020,

    calcularAntiguedad: function(){
        if (!Number.isInteger(this.anio) || this.anio < 1886 || this.anio >anioActual){
            return null;
        }
        return anioActual - this.anio;
     }

}

let antiguedad = coche.calcularAntiguedad();

if (antiguedad === null){
    console.log(`Año no válido`);
} else {
    console.log(`La antiguedad del coche es: ${antiguedad}`);
}