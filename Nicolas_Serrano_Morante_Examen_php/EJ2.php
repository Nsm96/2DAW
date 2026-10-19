<?php
$importe = 120;
$descuento = 10;
$totalDescuento = 0;
$totalPagar = 0;
if ($importe >= 100) {
    $totalDescuento = $importe * $descuento / 100;
    $totalPagar = $importe - $totalDescuento;
    echo "El total a pagar es: " . $totalPagar;
} elseif ($importe < 100) {
    $totalPagar = $importe;
    echo "El total a pagar es: " . $totalPagar;
}
