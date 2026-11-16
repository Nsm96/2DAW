<?php

try {
    require 'conexion.php';
    $sql =  'SELECT alumnos.nombre AS nombre_alumno, asignaturas.nombre AS nombre_asignatura, matriculas.anio AS anio_matricula, matriculas.nota AS nota_matricula 
    FROM matriculas
        JOIN alumnos ON matriculas.dni = alumnos.dni
        JOIN asignaturas ON matriculas.codigo = asignaturas.codigo
    WHERE matriculas.nota >= ? ORDER BY matriculas.nota DESC';
    $notaMinima = 5;

    $stmt = $db->prepare($sql);
    $stmt->bind_param('d', $notaMinima);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 0) {
        echo "No se encontraron resultados.";
    } else {
        while ($fila = $resultado->fetch_assoc()) {
            echo htmlspecialchars($fila['nombre_alumno']) . " -- " . htmlspecialchars($fila['nombre_asignatura']) . " -- " . $fila['anio_matricula'] . " -- " . $fila['nota_matricula'] . "<br>";
        }
    }

    $resultado->free();
    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error al buscar";
}
