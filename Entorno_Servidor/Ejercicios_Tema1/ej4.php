<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<TABLE BORDER='1'>

    <?php
        $mascota[0] = "Timón";
        $mascota[1] = "Canina";
        $mascota[2] = "York Shire";
        $mascota[3] = "Negro";
        $mascota[4] = "13 Kg";
        $mascota[5] = "35 cm";
        $mascota[6] = "16 años";

    echo "<tr>";
    echo "<td>Nombre: </td>";
    echo "<td> $mascota[0] </td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td>Familia: </td>";
    echo "<td> $mascota[1] </td>";
    echo "</tr>";    

    echo "<tr>";
    echo "<td>Raza: </td>";
    echo "<td> $mascota[2] </td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td>Color: </td>";
    echo "<td> $mascota[3] </td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td>Peso: </td>";
    echo "<td> $mascota[4] </td>";
    echo "</tr>";
    
    echo "<tr>";
    echo "<td>Altura: </td>";
    echo "<td> $mascota[5] </td>";
    echo "</tr>";

    echo "<tr>";
    echo "<td>Edad: </td>";
    echo "<td> $mascota[6] </td>";
    echo "</tr>";
    ?>

</body>
</html>