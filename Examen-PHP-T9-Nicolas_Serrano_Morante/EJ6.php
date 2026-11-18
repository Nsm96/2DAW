<?php
require_once 'EJ1.php';

try {
    $sql = 'UPDATE alumnos SET dni=?,nombre=?,edad=? WHERE dni=?;';
    $nuevaNota = 7.75;
    $dni = '55555555Z';
    $codigo = 2;
    $anio = 2026;

    $stmt = $db->prepare($sql);
    $stmt->bind_param('dsii', $nuevaNota, $dni, $codigo, $anio);
    $stmt->execute();

    if ($stmt->affected_rows === 0) {
        echo "Sin cambios.";
    } else {
        echo "Nota actualizada.";
    }

    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error al actualizar los datos.";
}
