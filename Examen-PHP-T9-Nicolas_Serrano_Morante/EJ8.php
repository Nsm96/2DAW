<?php 
require_once 'EJ.php';

try {
    $sql = 'SELECT alumnos.nombre AS "nombre_alumno", asignatura.nombre AS "nombre_asignatura", matriculas.nota AS "nota_matricula" FROM matriculas 
    LEFT JOIN matriculas.dni = alumnos.dni
    LEFT JOIN matriculas.codigo = asignaturas.codigo
    WHERE anio = ?;';
    $anio = 2026;
    $stmt = $db -> prepare($sql);
    $stmt -> bind_param('i', $anio);
    $stmt -> execute();
    $resultado = $stmt -> get_result();
    
    while ($fila = $resultado -> fetch_assoc()){
        if ($fila['nota_matricula'] === null){
            $fila['nota_matricula'] = "pendiente";
        }
    }
} catch (mysqli_sql_exception $e) {
    echo "Error al consultar.";

}