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

    foreach ($lista as $nombre => $nota) {
        echo "$nombre tiene esta nota: $nota";
        echo "<br>";
    }

    if ($nota >= 0 && $nota <= 4){
        echo "Suspenso";
    } else if ($nota == 5){
        echo "Aprobado";
    }
?>
