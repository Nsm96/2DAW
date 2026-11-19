<?php
require_once 'EJ1.php';
try {

    $sql = 'SELECT nombre, edad FROM alumnos ORDER BY edad DESC';
    $resultado = $db->query($sql);;
    echo '<table border=1>
    <tr>
    <th>Nombre</th><th>Edad</th>
    <tr>
    ';
    while ($fila = $resultado->fetch_assoc()) {
        echo "<tr><td>" . htmlspecialchars($fila['nombre']) . "</td>";
        echo "<td>" . $fila['edad'] . "</tr></td>";
    }
    echo "Alumnos totales: " . $resultado->num_rows;
    echo '</table>';

    $resultado->free();
    $db->close();
} catch (mysqli_sql_exception $e) {
    "Error al consultar.";
}
