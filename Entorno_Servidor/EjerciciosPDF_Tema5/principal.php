<?php
require_once 'funciones.php';

$notas = [4, 5, 9];
var_dump(media($notas));
echo "<br>";
var_dump(contarAprobados($notas));
echo "<br>";
var_dump(media([]));
echo "<br>";
var_dump(contarAprobados([]));
echo "<br>";
var_dump(media([5]));
echo "<br>";
var_dump(contarAprobados([5]));