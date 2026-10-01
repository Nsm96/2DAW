<?php
$num1 = $_POST['numero1'];
$num2 = $_POST['numero2'];

if (!is_numeric($num1) || !is_numeric($num2)){
    echo "No se ha introducido un número";
} else {
    $suma = $num1 + $num2;
    $resta = $num1 - $num2;
    $multiplicar = $num1 * $num2;
    
    echo "<table>";
    echo "<tr><th>Operacion</th><th>Resultado</th></tr>";
    echo "<tr><td>Suma: </td><td>$suma</td></tr>";
    echo "<tr><td>Resta: </td><td>$resta</td></tr>";
    echo "<tr><td>Multiplicación: </td><td>$multiplicar</td></tr>";
    if ($num2 == 0) {
    echo "<tr><td>Dividir</td><td>NO se puede dividir entre 0</td></tr>";
} else {
    $division = $num1 / $num2;
    echo "<tr><td>Division: </td><td>$division</td></tr>";
    
}
    echo "</table>";    
}



