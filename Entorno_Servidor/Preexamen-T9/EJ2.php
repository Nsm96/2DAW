<?php
try {
    require 'conexion.php';
    $sql = 'SELECT nombre, edad FROM alumnos ORDER BY nombre;';
    $resultado = $db -> query($sql);
    echo 'Filas devueltas en la consulta: ' . $resultado -> num_rows;
    echo '
    <table border=1>
    <tr>
    <th>Nombre</th><th>Edad</th>
    </tr>';
    while ($fila = $resultado -> fetch_assoc()){
        echo '<tr>
        <td>' . htmlspecialchars($fila['nombre']) . '</td>
        <td>' .  $fila['edad'] . '</td>
        </tr>';

    }
    echo '</table>';
    $resultado -> free();
    $db -> close();
} catch (mysqli_sql_exception $e) {
    echo "Error en la busqueda";
}


