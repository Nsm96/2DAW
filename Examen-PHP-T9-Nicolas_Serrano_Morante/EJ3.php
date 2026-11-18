<?php
require_once 'EJ1.php';
try {
    $sql = 'SELECT nombre, edad FROM alumnos WHERE edad >= ? ORDER BY edad DESC, nombre';
    $edadMinima = 21;
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i', $edadMinima);
    $stmt->execute();
    $resultado = $stmt->get_result();

    while ($fila = $resultado->fetch_assoc()) {
        if ($resultado->num_rows === 0) {
            echo "Sin coincidencias";
        } else {
            echo htmlspecialchars($fila['nombre']) . " - " . $fila['edad'] . "<br>";
        }
    }

    $resultado->free();
    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error al buscar";
}
