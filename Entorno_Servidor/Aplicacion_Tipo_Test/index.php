<?php
header("Content-Type: text/html; charset=utf-8");

require_once 'datos.php';
require_once 'funciones.php';

$preguntas = obtenerPreguntas();

pintarCabecera("Preguntas World Of Warcraft - Lore - Nico");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $entrada = $_POST["respuestas"] ?? [];
    $resultado = corregirTest($preguntas, $entrada);
    pintarResultados($resultado);
} else {
    pintarFormulario($preguntas);
}

pintarPie();