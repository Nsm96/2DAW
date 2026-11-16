<?php

try {
    require 'conexion.php';
    $sql = 'INSERT INTO alumnos (dni,edad,nombre) VALUES(?,?,?);';
    $dni = '77777777A';
    $nombre = 'Ana Martín';
    $edad = 20;
    $stmt = $db->prepare($sql);
    $stmt->bind_param('sis', $dni, $edad, $nombre);
    $stmt->execute();

    echo "Datos introducidos. " . $stmt->affected_rows . " filas han sido afectadas.";


    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error al insertar los datos.";
}
