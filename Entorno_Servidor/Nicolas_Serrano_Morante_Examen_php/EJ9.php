<?php
$notas = [6, 8, 4, 10];


function calcularMedia($notas)
{
    $suma = 0;

    foreach ($notas as $nota) {
        $suma += $nota;
    }

    return $suma / count($notas);
}

echo "La media es: " . calcularMedia($notas);
