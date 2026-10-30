<?php
require_once 'VarGlobales.php';

$mensajeError = "";
$mensajeExito = "";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario  = trim($_POST['usuario'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $passConfirm = trim($_POST['passConfirm'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $pregunta = trim($_POST['pregunta'] ?? '');


    if (empty($usuario) || empty($password) || empty($email) || empty($pregunta)) {
        $mensajeError = "Todos los campos son obligatorios.";
    } elseif ($password !== $passConfirm) {
        $mensajeError = "Las contraseñas no coinciden.";
    } else {

        $usuarioExiste = false;
        foreach ($_SESSION['mimatriz'] as $user) {
            if (strtolower($user['usuario']) === strtolower($usuario)) {
                $usuarioExiste = true;
                break;
            }
        }

        if ($usuarioExiste) {
            $mensajeError = "El nombre de usuario ya está registrado en el aquelarre.";
        } else {

            $_SESSION['mimatriz'][] = [
                'usuario'  => $usuario,
                'password' => $password,
                'email'    => $email,
                'perfil'   => 'usuario',
                'pregunta' => $pregunta
            ];

            $mensajeExito = "¡Registro completado con éxito! Ya puedes iniciar sesión.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DAWlloween - Alta de Usuario</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

    <header>
        <nav>
            <ul>
                <li><a href="../index.html">Inicio</a></li>
                <li><a href="login.php">Acceso / Servidor</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Unirse al Aquelarre</h1>

        <?php if (!empty($mensajeError)): ?>
            <div class="alert alert-error">
                <?php echo htmlspecialchars($mensajeError); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($mensajeExito)): ?>
            <div class="alert alert-success">
                <?php echo htmlspecialchars($mensajeExito); ?>
            </div>
        <?php endif; ?>

        <form action="altaUsuario.php" method="POST">
            <div class="form-group">
                <label for="usuario">Nombre de Usuario:</label>
                <input type="text" id="usuario" name="usuario" required autocomplete="off">
            </div>

            <div class="form-group">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required autocomplete="off">
            </div>

            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>
            </div>

            <div class="form-group">
                <label for="passConfirm">Repetir Contraseña:</label>
                <input type="password" id="passConfirm" name="passConfirm" required>
            </div>

            <div class="form-group">
                <label for="pregunta">Pregunta de Seguridad (P. ej: ¿Monstruo favorito?):</label>
                <input type="text" id="pregunta" name="pregunta" placeholder="¿Tu monstruo favorito?: Hombre Lobo" required>
            </div>

            <button type="submit">Registrar Cuenta</button>
        </form>

        <div style="text-align: center; margin-top: 1.5rem;">
            <p><a href="login.php" style="color: var(--color-toxico);">¿Ya tienes cuenta? Inicia sesión aquí</a></p>
        </div>
    </main>

    <footer>
        <p>DAWlloween &copy; - <a href="../aboutus.html">Sobre mí</a></p>
    </footer>

</body>
</html>