const empleado = {
    nombre: "Ana López",
    profesion: "Administrativa",
    antiguedad: 3,
    sueldo: 1200
}
const datosEmpleado = `Hola, me llamo ${empleado.nombre}. \nSoy ${empleado.profesion}. \nEn este trabajo llevo ${empleado.antiguedad} años.\nMi sueldo base es de ${empleado.sueldo}€`;

const porcentaje_plus = 10;
const cantidadPlusAnual = empleado.sueldo * porcentaje_plus / 100;
const plusRecibido = cantidadPlusAnual * empleado.antiguedad;
const totalMensual = empleado.sueldo + plusRecibido;

const datosSueldoEmpleado = `Sueldo base: ${empleado.sueldo.toFixed(2)} €.\nEl plus por año es: ${plusRecibido.toFixed(2)} €.\nEl sueldo total es: ${totalMensual.toFixed(2)} €.`
console.log(datosEmpleado);
console.log(datosSueldoEmpleado);
