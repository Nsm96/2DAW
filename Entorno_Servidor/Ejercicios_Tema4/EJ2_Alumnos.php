<?php
$alumnos = [
    "Antonio" => [
        "Matemáticas" => 5,
        "Lengua" => 8.3,
        "Ciencias Naturales" => 9,
        "Geografía" => 7,
    ],
    "Ana" => [
        "Matemáticas" => 8,
        "Lengua" => 7,
        "Ciencias Naturales" => 4.5,
        "Geografía" => 9,
    ],
    "Benito" => [
        "Matemáticas" => 9,
        "Lengua" => 6.75,
        "Ciencias Naturales" => 9,
        "Geografía" => 3.1,     
    ]
];

echo "<table border=1 class=tabla>";
echo "<tr>";
echo "<th>Alumno</th>";    
echo "<th>Matemáticas</th>";
echo "<th>Lengua</th>";
echo "<th>Ciencias Naturales</th>";
echo "<th>Geografía</th>";
echo "<th>Media</th>";
echo "</tr>";

foreach ($alumnos as $nombre => $notas) {
    $notaMedia = array_sum($notas) / count($notas);

    echo "<tr>";
    echo "<td>" . $nombre . "</td>";
    echo "<td>" . $notas["Matemáticas"] . "</td>";
    echo "<td>" . $notas["Lengua"] . "</td>";
    echo "<td>" . $notas["Ciencias Naturales"] . "</td>";
    echo "<td>" . $notas["Geografía"] . "</td>";
    echo "<td>" . $notaMedia . "</td>";
    echo "</tr>";
}
echo "</table>";

$nombreBuscado = "Ana";

echo $nombreBuscado . " tiene una nota de: " . $alumnos[$nombreBuscado]["Matemáticas"] . " en matemáticas";

echo "<footer>";
echo "<link rel='stylesheet' href='EJ2_Alumnos.css'>";
echo "</footer>";