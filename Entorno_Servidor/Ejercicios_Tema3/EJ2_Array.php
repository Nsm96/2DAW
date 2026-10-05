<?php
$lista = [3,8,7,-6];
echo "<table border=1>";
echo "<th>Número</th>";
echo "<th>Cuadrado</th>";
echo "<th>Cubo</th>";



for ($i=0; $i < count($lista); $i++) { 
    $cuadrado = $lista[$i]* $lista[$i];
    $cubo = $lista[$i]*$lista[$i]*$lista[$i];
    echo "<tr>";
    echo "<td>$lista[$i]</td>";
    echo "<td>$cuadrado</td>";
    echo "<td>$cubo</td>";
    echo "</tr>";        
}
echo "</table>";
echo "<footer>";
echo"<link rel='stylesheet' href='EJ2_Array.css'>";
echo"</footer>";
?>