export function mostrarCatalogo(modelosMoviles) {
    modelosMoviles.forEach(movil => {
        console.log(`ID: ${movil.id}|| Marca: ${movil.marca} || Año: ${movil.anioPublicacion} || Precio: ${movil.precio} || Pantalla: ${movil.pantallaPulgadas}`)
    });
}

export function filtrarPorMarca(modelosMoviles, marcaBuscada) {
    return modelosMoviles.filter((movil) => marcaBuscada === movil.marca);
};

export function buscarPorId(modelosMoviles, idBuscado) {
    return modelosMoviles.find((movil) => idBuscado === movil.id);
};

export function buscarPorIdPosicion(modelosMoviles, idBuscado) {
    return modelosMoviles.findIndex((movil) => idBuscado === movil.id)
};

export function hayMovilesCaros(modelosMoviles, precioLimite) {
    return modelosMoviles.some((movil) => movil.precio > precioLimite);
};

export function sonTodosNuevos(modelosMoviles, anioMinimo) {
    return modelosMoviles.every((movil) => movil.anioPublicacion >= anioMinimo);
};

export function ordenarPorPrecio(modelosMoviles) {
    return [...modelosMoviles].sort((a, b) => a.precio - b.precio);
};

export function obtenerAtributo(movil) {
    return Object.keys(movil);
};

export function obtenerDatos(movil) {
    return Object.entries(movil);
};

export function crearMovilEntradas(datos) {
    return Object.fromEntries(datos)
};