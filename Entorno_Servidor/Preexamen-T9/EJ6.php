<?php

try {
    require 'conexion.php';
    $sql = 'SELECT nombre FROM alumnos WHERE nombre LIKE ?;';
    $texto = "lo";
    $patron = "%" . $texto . "%";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('s', $patron);
    $stmt->execute();
    $resultado = $stmt->get_result();


    if ($resultado->num_rows === 0) {
        echo "No se encontraron alumnos con el texto " . htmlspecialchars($texto) . " en su nombre";
    } else {
        echo $resultado->num_rows . " alumnos encontrados con el texto " . htmlspecialchars($texto) . " en su nombre: " . "<br>";
        while ($fila = $resultado->fetch_assoc()) {
            echo htmlspecialchars($fila['nombre']) . "<br>";
        }
    }

    $resultado->free();
    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error de busqueda";
}
