<?php
$numeros = [-8, -3, -12, -1, -6];
$mayor = $numeros[0];

foreach ($numeros as $numero) {
	if ($numero > $mayor) {
		$mayor = $numero;
	}
}

echo "El mayor es: " . $mayor;
