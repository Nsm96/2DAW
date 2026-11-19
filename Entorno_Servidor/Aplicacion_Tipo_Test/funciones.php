<?php

function escapar($texto)
{
    return htmlspecialchars($texto, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}

function pintarCabecera($titulo)
{
    $tituloSeguro = escapar($titulo);
    echo '<!doctype html>';
    echo '<html lang="es">';
    echo '<head>';
    echo '<meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo "<title>{$tituloSeguro}</title>";
    echo '<link rel="stylesheet" href="estilos.css">';
    echo '</head>';
    echo '<body>';
    echo '<main class="contenedor">';
    echo '<header class="cabecera">';
    echo "<h1>{$tituloSeguro}</h1>";
    echo '<p class="subtitulo">Demuestra tus conocimientos sobre el universo de Azeroth</p>';
    echo '</header>';
}

function pintarPie()
{
    echo '<footer class="pie">';
    echo '<p>DWES - Nicolás Serrano Morante - Tema 6</p>';
    echo '</footer>';
    echo '</main>';
    echo '</body>';
    echo '</html>';
}

function pintarFormulario($preguntas)
{
    $total = count($preguntas);
    echo "<p class=\"info-test\">El cuestionario consta de <strong>{$total} preguntas</strong>. Responde todas las que sepas y pulsa en corregir.</p>";
    echo '<form action="index.php" method="post" class="formulario-test">';

    foreach ($preguntas as $indicePregunta => $pregunta) {
        pintarPregunta($indicePregunta, $pregunta);
    }

    echo '<div class="acciones">';
    echo '<button type="submit" class="btn btn-primario">Corregir</button>';
    echo '<button type="reset" class="btn btn-secundario">Limpiar respuestas</button>';
    echo '</div>';
    echo '</form>';
}

function pintarPregunta($indicePregunta, $pregunta)
{
    $numeroVisible = $indicePregunta + 1;
    $enunciadoSeguro = escapar($pregunta["enunciado"]);

    echo '<fieldset class="tarjeta-pregunta">';
    echo "<legend>Pregunta {$numeroVisible}</legend>";
    echo "<p class=\"enunciado\">{$enunciadoSeguro}</p>";
    echo '<div class="lista-opciones">';

    foreach ($pregunta["opciones"] as $indiceOpcion => $textoOpcion) {
        $opcionSegura = escapar($textoOpcion);
        echo '<label class="opcion">';
        echo "<input type=\"radio\" name=\"respuestas[{$indicePregunta}]\" value=\"{$indiceOpcion}\">";
        echo "<span>{$opcionSegura}</span>";
        echo '</label>';
    }

    echo '</div>';
    echo '</fieldset>';
}

function corregirTest($preguntas, $entradaUsuario)
{
    $respuestasLimpias = is_array($entradaUsuario) ? $entradaUsuario : [];

    $totalPreguntas = count($preguntas);
    $aciertos = 0;
    $fallos = 0;
    $sinContestar = 0;
    $detalle = [];

    foreach ($preguntas as $indice => $pregunta) {
        $opciones = $pregunta["opciones"];
        $indiceCorrecto = $pregunta["correcta"];
        $valorRecibido = $respuestasLimpias[$indice] ?? null;

        $indiceElegido = false;
        if (is_string($valorRecibido) || is_int($valorRecibido)) {
            $validado = filter_var($valorRecibido, FILTER_VALIDATE_INT);
            if ($validado !== false && isset($opciones[$validado])) {
                $indiceElegido = $validado;
            }
        }

        if ($indiceElegido === false) {
            $estado = "sin_contestar";
            $sinContestar++;
            $textoElegido = "Sin responder";
        } elseif ($indiceElegido === $indiceCorrecto) {
            $estado = "acierto";
            $aciertos++;
            $textoElegido = $opciones[$indiceElegido];
        } else {
            $estado = "fallo";
            $fallos++;
            $textoElegido = $opciones[$indiceElegido];
        }

        $detalle[] = [
            "numero"         => $indice + 1,
            "enunciado"      => $pregunta["enunciado"],
            "estado"         => $estado,
            "texto_elegido"  => $textoElegido,
            "texto_correcto" => $opciones[$indiceCorrecto]
        ];
    }

    $nota = $totalPreguntas > 0 ? round(($aciertos / $totalPreguntas) * 10, 2) : 0;

    return [
        "total"         => $totalPreguntas,
        "aciertos"      => $aciertos,
        "fallos"        => $fallos,
        "sin_contestar" => $sinContestar,
        "nota"          => $nota,
        "detalle"       => $detalle
    ];
}

function pintarResultados($resultado)
{
    $claseNota = $resultado["nota"] >= 5 ? "aprobado" : "suspenso";

    echo "<section class=\"resumen-nota {$claseNota}\">";
    echo "<h2>Calificación final: {$resultado['nota']} / 10</h2>";
    echo '<div class="metricas">';
    echo "<span class=\"badge badge-ok\">Aciertos: {$resultado['aciertos']}</span>";
    echo "<span class=\"badge badge-ko\">Fallos: {$resultado['fallos']}</span>";
    echo "<span class=\"badge badge-na\">En blanco: {$resultado['sin_contestar']}</span>";
    echo '</div>';
    echo '</section>';

    echo '<section class="desglose">';
    echo '<h3>Revisión detallada</h3>';

    foreach ($resultado["detalle"] as $item) {
        $enunciado = escapar($item["enunciado"]);
        $elegida = escapar($item["texto_elegido"]);
        $correcta = escapar($item["texto_correcto"]);

        echo "<article class=\"item-revision estado-{$item['estado']}\">";
        echo "<h4>{$item['numero']}. {$enunciado}</h4>";
        echo "<p><strong>Tu respuesta:</strong> {$elegida}</p>";

        if ($item["estado"] !== "acierto") {
            echo "<p><strong>Respuesta correcta:</strong> {$correcta}</p>";
        }

        echo '</article>';
    }

    echo '<div class="acciones">';
    echo '<a href="index.php" class="btn btn-primario">Volver a intentarlo</a>';
    echo '</div>';
    echo '</section>';
}