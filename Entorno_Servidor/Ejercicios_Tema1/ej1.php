<?php
$km = 450;
$combustible = 135;
$consumo_medio;

$consumo_medio = $km / $combustible;

echo "Los kilómetros recorridos son " . $km . " y el combustible cosumido es " . $combustible . " litros. ";
echo "<br>";
echo "El consumo medio es " . round($consumo_medio) . " litros ";
?>