<?php
$matriz = [
    [2, 4, 6],
    [1, 3, 5]
];

$suma = 0;
foreach ($matriz as $fila) {
    foreach ($fila as $dato) {
        $suma += $dato;
    }
}
echo "El resultado es: " . $suma;
