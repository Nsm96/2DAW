<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $db = new mysqli('localhost', 'root', '', 'centro');
    $db->set_charset('utf8mb4');
} catch (Exception $e) {
    die('Error de conexión a la base de datos: ' . $e->getMessage());
}
