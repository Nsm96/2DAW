<?php
require_once 'EJ1.php';

try {
    $sql = 'INSERT INTO alumnos(dni,nombre,edad) VALUES(?,?,?);';
    $dni = '88888888B';
    $nombre = 'Lucía Vega';
    $edad = 22;
    $stmt = $db->prepare($sql);
    $stmt->bind_param('ssi', $dni, $nombre, $edad);
    $stmt->execute();

    if ($stmt->affected_rows === 0) {
        echo "Error al insertar";
    } else {
        echo "Alumno insertado";
    }

    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error al insertar";
}
