<?php

try {
    require 'conexion.php';
    $sql = 'SELECT nombre, edad FROM alumnos ORDER BY edad DESC LIMIT 2;';
    $resultado = $db -> query($sql);
    echo "Los alumnos con más edad son: <br>";
    while ($fila = $resultado -> fetch_assoc()) {
        echo htmlspecialchars($fila['nombre']) . " " . $fila['edad'] . "<br>";
    }

    $resultado -> free();
    $db -> close();
} catch (mysqli_sql_exception $e) {
    echo "Error al buscar";
}
