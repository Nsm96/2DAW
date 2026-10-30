<?php
require_once 'VarGlobales.php';

$mensajeError = "";

if (!empty($_SESSION['currentUser'])) {
    header("Location: ../recetas.html");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuarioInput = trim($_POST['usuario'] ?? '');
    $passwordInput = trim($_POST['password'] ?? '');

    $loginValido = false;

    foreach ($_SESSION['mimatriz'] as $user) {
        if ($user['usuario'] === $usuarioInput && $user['password'] === $passwordInput) {
            $_SESSION['currentUser'] = $user['usuario'];
            $loginValido = true;
            break;
        }
    }

    if ($loginValido) {
        header("Location: ../recetas.html");
        exit();
    } else {
        $mensajeError = "Credenciales incorrectas. Revisa usuario o contraseña.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DAWlloween - Acceso</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Mystery+Quest&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

    <header>
        <nav>
            <ul>
                <li><a href="../index.html">Inicio</a></li>
                <li><a href="login.php">Acceso</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Aquelarre de Usuarios</h1>

        <?php if (!empty($mensajeError)): ?>
            <div class="alert alert-error">
                <?php echo htmlspecialchars($mensajeError); ?>
            </div>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <div class="form-group">
                <label for="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario" required autocomplete="off">
            </div>

            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>
            </div>

            <button type="submit">Iniciar Sesión</button>
        </form>

        <div style="text-align: center; margin-top: 1.5rem;">
            <p><a href="altaUsuario.php" style="color: var(--color-toxico);">¿No tienes cuenta? Regístrate aquí</a></p>
            <p><a href="cambioPass.php" style="color: var(--color-texto-mutado);">¿Olvidaste tu contraseña?</a></p>
        </div>
    </main>

    <footer>
        <p>DAWlloween &copy; - <a href="../aboutus.html">Sobre mí</a></p>
    </footer>

</body>
</html>