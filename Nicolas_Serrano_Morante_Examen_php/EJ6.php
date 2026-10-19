<?php
$puntuaciones = [
	"Ana" => 72,
	"Luis" => 85,
	"Eva" => 64,
	"Pablo" => 91
];

arsort($puntuaciones);
foreach ($puntuaciones as $alumnos => $notas) {
	echo $alumnos . ": " . $notas . "<br>";
}
