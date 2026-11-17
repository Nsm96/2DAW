<?php

require 'conexion.php';
$stmt = null;
$dni = '66666666F';
try {
    $sql = 'SELECT alumnos.nombre AS nombre_alumno, asignaturas.nombre AS nombre_asignatura, matriculas.anio AS anio_matricula, matriculas.nota AS nota_matricula
        FROM alumnos
            JOIN matriculas ON alumnos.dni = matriculas.dni
            JOIN asignaturas ON matriculas.codigo = asignaturas.codigo
WHERE alumnos.dni = ? ORDER BY anio_matricula DESC, nombre_asignatura;';

    $stmt = $db->prepare($sql);
    $stmt->bind_param('s', $dni);
    $stmt->execute();
    $resultado = $stmt->get_result();

    while ($fila = $resultado->fetch_assoc()) {
        echo htmlspecialchars($fila['nombre_alumno']) . " - " . htmlspecialchars($fila['nombre_asignatura'] ?? "null") . " - " . htmlspecialchars($fila['anio_matricula'] ?? "null") . " - " . htmlspecialchars($fila['nota_matricula'] ?? "null") . "<br>";
    }

    $resultado -> free();
} catch (mysqli_sql_exception $e) {
    echo "Error al buscar.";
} finally {
    $stmt->close();
    $db->close();
}
