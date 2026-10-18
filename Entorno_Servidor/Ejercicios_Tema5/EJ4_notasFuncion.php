<?php

$datosAlumnos = [
    "nombre" => "Juan",
    "apellidos" => "García Contreras",
    "nota1" => 7,
    "nota2" => 4,
    "nota3" => 9
];

function boletinNotas ($alumno){
    $notaMedia = ($alumno["nota1"] + $alumno["nota2"] + $alumno["nota3"]) / 3;
    $html = "<h1> La nota media de " .  $alumno["nombre"] . " " . $alumno["apellidos"] . " es " . round($notaMedia, 2) . "</h1>";
    
    echo $html;
}

boletinNotas($datosAlumnos);

