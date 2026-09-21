<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<TABLE BORDER='1'>

<?php
// x = 1 // y = 2 // z = 3
$posicion[0] = 1;
$posicion[1] = 2;
$posicion[2] = 3;
$suma = $posicion[0] + $posicion[1];
$multiplicacion = $posicion[1] * $posicion[2];
$division = $posicion[0] / $posicion[2];
$suma_2 = $posicion[0] + $posicion[1] + $posicion[2];
$suma_y_division = ($posicion[1] + $posicion[2]) / $posicion[0];

echo "<tr>";
echo "<td> posicion 0 </td>";
echo "<td> $posicion[0] </td>";
echo "</tr>";

echo "<tr>";
echo "<td> posicion 1 </td>";
echo "<td> $posicion[1] </td>";
echo "</tr>";

echo "<tr>";
echo "<td> posicion 2 </td>";
echo "<td> $posicion[2] </td>";
echo "</tr>";

echo "<tr>";
echo "<td> posicion 3 </td>";
echo "<td> $suma </td>";
echo "</tr>";

echo "<tr>";
echo "<td> posicion 4 </td>";
echo "<td> $multiplicacion </td>";
echo "</tr>";

echo "<tr>";
echo "<td> posicion 5 </td>";
echo "<td> $division </td>";
echo "</tr>";

echo "<tr>";
echo "<td> posicion 6 </td>";
echo "<td> $suma_2 </td>";
echo "</tr>";

echo "<tr>";
echo "<td> posicion 7 </td>";
echo "<td> $suma_y_division </td>";
echo "</tr>";

?>    



</body>
</html>



