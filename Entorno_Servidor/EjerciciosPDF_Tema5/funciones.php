<?php
function esAprobado(float $nota): bool {
    return $nota >= 5;
}

function media (array $notas) : ?float {
    if (count($notas) === 0) {
        return null;
    }
    return array_sum($notas) / count($notas);
}

function contarAprobados (array $notas) : int {
    $contador = 0;
    foreach ($notas as $nota) {
        if (esAprobado($nota)) {
            $contador++;
        }
    }
    return $contador;
}