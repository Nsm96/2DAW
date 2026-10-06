<?php
$meses = [
    1 => "Enero", 2 => "Febrero", 3 => "Marzo", 4 => "Abril",
    5 => "Mayo", 6 => "Junio", 7 => "Julio", 8 => "Agosto",
    9 => "Septiembre", 10 => "Octubre", 11 => "Noviembre", 12 => "Diciembre"
];

$diasMes = [
    1 => 31, 2 => 28, 3 => 31, 4 => 30,
    5 => 31, 6 => 30, 7 => 31, 8 => 31,
    9 => 30, 10 => 31, 11 => 30, 12 => 31
];

$diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];


$diaInicioMes = 1; 

for ($mes = 1; $mes <= 12; $mes++) {
    echo "<p>" . $meses[$mes] . "</p>";
    echo "<table border='1'>";
    

    echo "<tr>";
    foreach ($diasSemana as $dia) {
        echo "<th>$dia</th>";
    }
    echo "</tr>";

    echo "<tr>";
    $posicionCelda = 1;


    for ($i = 1; $i < $diaInicioMes; $i++) {
        echo "<td></td>";
        $posicionCelda++;
    }

    $totalDias = $diasMes[$mes];
    for ($dia = 1; $dia <= $totalDias; $dia++) {
        echo "<td>$dia</td>";

        if ($posicionCelda % 7 == 0) {
            echo "</tr>";
            if ($dia < $totalDias) {
                echo "<tr>";
            }
        }
        $posicionCelda++;
    }


    $resto = ($posicionCelda - 1) % 7;
    if ($resto != 0) {
        for ($i = $resto; $i < 7; $i++) {
            echo "<td></td>";
        }
        echo "</tr>";
    }

    echo "</table>";


    $diaInicioMes = ($diaInicioMes + $totalDias) % 7;
    if ($diaInicioMes == 0) {
        $diaInicioMes = 7;
    }
}
?>