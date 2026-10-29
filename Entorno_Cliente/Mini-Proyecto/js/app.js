import { modelosMoviles } from './datos.js'
import { mostrarCatalogo, filtrarPorMarca, buscarPorId, buscarPorIdPosicion, hayMovilesCaros, sonTodosNuevos, ordenarPorPrecio, obtenerAtributo, obtenerDatos, crearMovilEntradas } from './funciones.js';

console.log("Catalogo");
mostrarCatalogo(modelosMoviles);

console.log("Filtrado por marca");
const samsung = filtrarPorMarca(modelosMoviles, "samsung");
console.log(samsung);

console.log("Buscar por ID");
const movilID = buscarPorId(modelosMoviles, "A56");
console.log(movilID);

console.log("Posicion de la ID");
const posicionID = buscarPorIdPosicion(modelosMoviles, "A56");
console.log(posicionID);

console.log("¿Hay móviles por más caros que esto?");
const movilPorPrecioAlto = hayMovilesCaros(modelosMoviles, 800);
console.log(movilPorPrecioAlto);

console.log("¿Todos los móviles son recientes?");
const movilPorAnio = sonTodosNuevos(modelosMoviles, 2020);
console.log(movilPorAnio);

console.log("Ordenados por precio (de más baratos a más caros)");
const movilPorPrecio = ordenarPorPrecio(modelosMoviles);
console.log(movilPorPrecio);

console.log("Atributos del segundo móvil");
const atributosMovil = obtenerAtributo(modelosMoviles[1]);
console.log(atributosMovil);

console.log("Datos del segundo movil");
const datosMovil = obtenerDatos(modelosMoviles[1]);
console.log(datosMovil);

console.log("Crear un movil nuevo");
const nuevoMovil = [["id", "17T"], ["marca", "Xiaomi"], ["anioPublicacion", 2025], ["precio", 850], ["pantallaPulgadas", 6.67]];
const movilCreado = crearMovilEntradas(nuevoMovil);
console.log(movilCreado);


