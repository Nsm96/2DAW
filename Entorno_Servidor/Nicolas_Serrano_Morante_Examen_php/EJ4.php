<?php
$suma = [4, 7, 5, 3, 9, 6];
$contadorAprobados = 0;
$contadorSuspensos = 0;

foreach ($suma as $notas) {
    if ($notas > 5) {
        $contadorAprobados++;
    } else if ($notas < 5) {
        $contadorSuspensos++;
    }
}
echo "El número de aprobados es: " . $contadorAprobados;
echo "<br>";
echo "El número de suspensos es: " . $contadorSuspensos;
