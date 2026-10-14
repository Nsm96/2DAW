<?php

$alumno1 = "Juan Ramírez";
$notas = [
    "Matemáticas" => "Sobresaliente",
    "Lengua" => "Notable",
    "Historia" => "Notable",
    "Dibujo" => "Insuficiente"
];

function datosAlumno($nombreCompleto, $calificaciones) {
    echo "<table border=1 class=tabla>";
    echo "<tr>";
    echo "<th>Alumno</th>";
    echo "<th>$nombreCompleto</th>";
    echo "</tr>";

    foreach ($calificaciones as $asignatura => $nota) {
    echo "<tr>";
    echo "<td>$asignatura</td>";
    echo "<td>$nota</td>";
    echo "</tr>";

    }
    echo "</table>";
};

datosAlumno($alumno1, $notas);