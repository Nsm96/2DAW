<style>
    .rojo {background-color: red;}
    .azul {background-color: blue;}
    .verde {background-color: green;}
</style>

<?php

function claseColor ($clase1, $clase2, $clase3){
    echo "<table border=1>";
    echo "<tr style='class=rojo'>";
    echo "<td>Fila 1</td>";
    echo "</tr>";
    echo "<tr style='class=azul'>";
    echo "<td>Fila 2</td>";
    echo "</tr>";
    echo "<tr style='class=verde'>";
    echo "<td>Fila 3</td>";
    echo "</tr>";
    echo "</table>";
}