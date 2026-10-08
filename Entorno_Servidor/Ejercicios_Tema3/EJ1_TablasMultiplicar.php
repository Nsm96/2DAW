<?php
$multiplicar = 1;

echo "<table border=1 class=tabla>";
for ($i = 1; $i <= 10; $i++) {
    $resultado = $multiplicar * $i;
    echo "<tr>";
    echo "<td>$multiplicar x $i</td>";
    echo "<td>$resultado</td>";
    echo "</tr>";
}
echo "</table>";

echo "<footer>";
echo "<link rel='stylesheet' href='EJ_TablaMultiplicar.css'>";
echo "</footer>";
