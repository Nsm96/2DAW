function convertirEdadPerro(edadPerro) {
    return edadPerro * 7;
}

let edadPerro;

while (true) {
    const entrada = prompt(
        "Introduce la edad del perro (número mayor que 0 y menor que 30):"
    );

    if (entrada === null) {

        break;
    }

    const texto = entrada.trim();

    if (texto === "") {
        alert("Error: no has introducido ningún valor.");
        continue;
    }

    const numero = Number(texto);

    if (!Number.isFinite(numero) || numero <= 0 || numero >= 30) {
        alert(
            "Error: introduce un número válido mayor que 0 y menor que 30."
        );

    }

    edadPerro = numero;
    break;
}

if (edadPerro !== undefined) {
    const edadHumana = convertirEdadPerro(edadPerro);
    alert(
        `Un perro de ${edadPerro} años tiene aproximadamente ${edadHumana} años humanos.`
    );
}