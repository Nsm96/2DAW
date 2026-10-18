<?php

function tablaColor ($color1, $color2, $color3){
    echo "<table border=1 class=tabla>";
    echo "<tr style='background-color: $color1'>";
    echo "<td>Fila 1</td>";
    echo "</tr>";
    echo "<tr style='background-color: $color2'>";
    echo "<td>Fila 2</td>";
    echo "</tr>";
    echo "<tr style='background-color: $color3'>";
    echo "<td>FIla 3</td>";
    echo "</tr>";
    echo "</table>";
}

tablaColor("red", "blue", "green");