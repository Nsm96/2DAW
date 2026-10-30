<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


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

if (!isset($_SESSION['currentUser'])) {
    $_SESSION['currentUser'] = null;
}
?>