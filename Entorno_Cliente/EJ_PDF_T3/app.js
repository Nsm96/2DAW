import {
    obtenerNombresOrdenados,
    calcularValorInventario,
    buscarPorId
} from "./analisis.js";
import { productos } from "./productos.js";

console.log("Nombres ordenados:", obtenerNombresOrdenados(productos));
console.log("Valor del inventario:", calcularValorInventario(productos));
console.log("Producto con ID 1:", buscarPorId(productos, 1));