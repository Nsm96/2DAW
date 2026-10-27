<?php
// Iniciar sesión en el servidor si no está ya iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Inicializar la matriz de usuarios en la sesión si aún no existe
if (!isset($_SESSION['mimatriz'])) {
    $_SESSION['mimatriz'] = [
        [
            'usuario'  => 'admin',
            'password' => 'admin123',
            'email'    => 'admin@halloween.local',
            'perfil'   => 'administrador',
            'pregunta' => '¿Tu monstruo favorito?: Dracula'
        ],
        [
            'usuario'  => 'jack',
            'password' => 'jack123',
            'email'    => 'jack@halloween.local',
            'perfil'   => 'usuario',
            'pregunta' => '¿Nombre de tu perro?: Zero'
        ]
    ];
}

// Inicializar la variable del usuario actual en sesión si no existe
if (!isset($_SESSION['currentUser'])) {
    $_SESSION['currentUser'] = null;
}
?>