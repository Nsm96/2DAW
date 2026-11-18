<?php
require_once 'EJ1.php';

try {
    $sql = 'SELECT nombre, dni FROM alumnos WHERE nombre LIKE ?';
    $texto = '%a%';

    $stmt = $db->prepare($sql);
    $stmt->bind_param('s', $texto);
    $stmt->execute();
    $resultado = $stmt->get_result();

    while ($fila = $resultado->fetch_assoc()) {
        echo htmlspecialchars($fila['nombre']) . " - " . $fila['dni']  . "<br>";
    }

    $resultado->free();
    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Erro al consultar";
}
