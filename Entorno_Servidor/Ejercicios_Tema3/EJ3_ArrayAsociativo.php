<?php
$lista = [
    "Carlos" => 1,
    "Pepe" => 0,
    "Maria" => 5,
    "Jose" => 6,
    "Rubén" => 10,
    "Sandra" => 8,
    "Javi" => 7,
];
$clasificacion = "";

foreach ($lista as $nombre => $nota) {
    echo "$nombre tiene esta nota: $nota";
    echo "<br>";
    if ($nota >= 0 && $nota <= 4) {
        $clasificacion = "Suspenso";
        echo "<br>";
    } else if ($nota === 5) {
        $clasificacion = "Aprobado";
        echo "<br>";
    } else if ($nota === 6) {
        $clasificacion = "bien";
        echo "<br>";
    } else if ($nota >= 7 && $nota <= 8) {
        $clasificacion = "Notable";
        echo "<br>";
    } else if ($nota === 9) {
        $clasificacion = "Sobresaliente";
        echo "<br>";
    } else if ($nota === 10) {
        $clasificacion = "Matricula de honor";
        echo "<br>";
    }
echo "<table border=1>";
echo "<tr>";
echo "<td>$nombre</td>";
echo "<td>$nota</td>";
echo "<td>$clasificacion</td>";
echo "</table>";
    
}

