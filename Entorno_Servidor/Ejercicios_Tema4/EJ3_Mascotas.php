<?php
$mascotas = [
    [
        "Nombre" => "Pepe",
        "Peso" => 4.5,
        "Color" => "Marrón",
        "Edad" => 12,
    ],
    [   "Nombre" => "Sparky",
        "Peso" => 3,
        "Color" => "Blanco",
        "Edad" => 2,
    ],
    [   "Nombre" => "Tobby",
        "Peso" => 7.2,
        "Color" => "Beige",
        "Edad" => 8,
    ],
    [   "Nombre" => "Bigotes",
        "Peso" => 4,
        "Color" => "Negro",
        "Edad" => 9,
    ],
    [   "Nombre" => "Ricky",
        "Peso" => 0.1,
        "Color" => "Verde",
        "Edad" => 2,
    ]
];
echo "<table border=1 class=tabla>";
echo "<tr>";
echo "<th>Fila</th>";
echo "<th>Nombre</th>";
echo "<th>Peso</th>";
echo "<th>Color</th>";
echo "<th>Edad</th>";
echo "</tr>";
foreach ($mascotas as $indice => $mascota) {
    echo "<tr>";
    echo "<td>" . $indice . "</td>";
    echo "<td>" . $mascota["Nombre"] ."</td>";
    echo "<td>" . $mascota["Peso"] . "</td>";
    echo "<td>" . $mascota["Color"] . "</td>";
    echo "<td>" . $mascota["Edad"] . "</td>";
    echo "</tr>";
    
};
echo "</table>";

// solo el del array posicion 3
echo "El peso de " . $mascotas[3]["Nombre"] . " es: " . $mascotas[3]["Peso"];

echo "<br>";

// color de sparky
foreach ($mascotas as $mascota) {
    if ($mascota["Nombre"] == "Sparky"){
        echo "El color de Sparky es: ".  $mascota["Color"];
    }
};

// el mas viejo
$edadMaxima = 0;
$masViejo = [];
foreach ($mascotas as $mascota) {
    if ($mascota["Edad"] > $edadMaxima){
        $edadMaxima = $mascota["Edad"];
        $masViejo = $mascota;
    }    
};
echo "<br>";
echo "El perro más viejo es: " . $masViejo["Nombre"] . ", tiene " . $masViejo["Edad"] . " años" . ", pesa " . $masViejo["Peso"] . " kg " . " y es de color " . $masViejo["Color"];

// el mas joven

$pesoMinimo = 100;
$masFlaco = [];
foreach ($mascotas as $mascota) {
    if ($mascota["Peso"] < $pesoMinimo){
        $pesoMinimo = $mascota["Peso"];
        $masFlaco = $mascota;
    }    
};
echo "<br>";
echo "El perro que menos pesa es " . $masFlaco["Nombre"] . ", que pesa " . $masFlaco["Peso"] . " kg.";

echo "<footer>";
echo "<link rel='stylesheet' href='EJ3_Mascotas.css'>";
echo "</footer>";