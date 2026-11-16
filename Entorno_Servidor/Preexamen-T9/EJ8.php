<?php
try {
    require 'conexion.php';
    $sql = 'SELECT alumnos.nombre AS nombre_alumno, asignaturas.nombre AS nombre_asignatura, matriculas.nota AS nota_matricula

    FROM matriculas

        JOIN alumnos ON matriculas.dni = alumnos.dni

        JOIN asignaturas ON matriculas.codigo = asignaturas.codigo

WHERE matriculas.anio = ?;';
    $anio = 2026;
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i', $anio);
    $stmt->execute();
    $resultado = $stmt->get_result();
    if ($resultado->num_rows === 0) {
        echo "No hay datos disponibles para esta consulta.";
    } else {
        echo "Filas devueltas por la consulta: " . $resultado->num_rows . "<br>";
        while ($fila = $resultado->fetch_assoc()) {
            if ($fila['nota_matricula'] === null) {
                $fila['nota_matricula'] = "Pendiente";
            }
            echo htmlspecialchars($fila['nombre_alumno']) . ' - ' . htmlspecialchars($fila['nombre_asignatura']) . ' - ' . $fila['nota_matricula'] . "<br>";
        }
    }
    $resultado->free();
    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo "Error en la búsqueda";
}
