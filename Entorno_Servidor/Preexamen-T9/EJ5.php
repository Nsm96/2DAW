<?php

try {
    require 'conexion.php';
    $sql = 'SELECT nombre, edad FROM alumnos WHERE edad IN (?,?);';
    $edad1 = 21;
    $edad2 = 24;
    $stmt = $db -> prepare($sql);
    $stmt->bind_param('ii', $edad1, $edad2);
    $stmt->execute();
    $resultado = $stmt -> get_result();

    while ($fila = $resultado -> fetch_assoc()){
        echo htmlspecialchars($fila['nombre']) . " " . $fila['edad'] . "<br>";
    }

    $resultado -> free();
    $stmt -> close();
    $db -> close();
    
} catch (mysqli_sql_exception $e) {
    echo "Error al buscar";
}