<?php

require_once 'EJ1.php';

try {
    $sql = 'DELETE FROM matriculas WHERE dni = ? AND codigo = ? AND anio = ?;';
    $stmt = $db->prepare($sql);
    $dni = '22222222B';
    $codigo = 1;
    $anio = 2025;
    $stmt->bind_param('sii', $dni, $codigo, $anio);
    $stmt->execute();

    if ($stmt->affected_rows === 0) {
        echo "No encontrada";
    } else {
        echo "Matricula eliminada.";
    }

    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error al eliminar datos.";
}
