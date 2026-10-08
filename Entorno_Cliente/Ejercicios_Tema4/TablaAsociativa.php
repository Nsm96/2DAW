<?php

$ciudades = [

    "Granada" => 150000,

    "Madrid" => 3000000,

    "Barcelona" => 2879200,

    "Malaga" => 240000,

    "Sevilla" => 500000,

    "Valencia" => 1584600,

    "Tarragona" => 485210

];

ksort($ciudades); 

echo "<table border=1>";
echo "<tr>";

echo "<th>Ciudad</th>";

echo "<th>Poblacion</th>";

echo "</tr>";

foreach ($ciudades as $sitios => $poblacion) {

    echo "<tr>";

    echo "<td>$sitios</td>";

    echo "<td>$poblacion</td>";

    echo "</tr>";
};

echo "</table>";
