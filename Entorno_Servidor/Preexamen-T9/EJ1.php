<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
$db = new mysqli('localhost', 'root', 'Admin2025', 'centro');
$db -> set_charset('utf8mb4');
    echo "Conexión correcta";
} catch (mysqli_sql_exception $e) {
    echo "Error de conexión";
}