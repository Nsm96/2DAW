<?php
$lista = [
    "Carlos" => 1,
    "Pepe" => 0,
    "Maria" => 5,
    "Jose" => 6,
    "Rubén" => 10,
    "Sandra" => 9,
    "Javi" => 7,
];
$clasificacion = "";
echo "<table border=1>";
foreach ($lista as $nombre => $nota) {
    if ($nota >= 0 && $nota <= 4) {
        $clasificacion = "Suspenso";
    } else if ($nota === 5) {
        $clasificacion = "Aprobado";
    } else if ($nota === 6) {
        $clasificacion = "bien";
    } else if ($nota >= 7 && $nota <= 8) {
        $clasificacion = "Notable";
    } else if ($nota === 9) {
        $clasificacion = "Sobresaliente";
    } else if ($nota === 10) {
        $clasificacion = "Matricula de honor";
    }
    echo "<tr>";
    echo "<td>$nombre</td>";
    echo "<td>$nota</td>";
    echo "<td>$clasificacion</td>";
  
}
  echo "</table>";
