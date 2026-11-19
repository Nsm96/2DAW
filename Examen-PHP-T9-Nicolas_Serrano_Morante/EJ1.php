<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$host = 'localhost';
$usuario = 'root';
$clave = '';
$base = 'centro';

try {
    $db = new mysqli($host, $usuario, $clave, $base);
    $db->set_charset('utf8mb4');
    echo "Conexión establecida." . "<hr>";
} catch (Exception $e) {
    echo ('Error de conexión a la base de datos: ');
}
