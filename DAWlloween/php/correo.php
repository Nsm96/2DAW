<?php
require_once 'VarGlobales.php';

// Iniciar sesión si no está iniciada aún
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 1. Control de seguridad
if (empty($_SESSION['currentUser'])) {
    // Si viene por AJAX, devolvemos un error claro en lugar de HTML
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false || $_SERVER['REQUEST_METHOD'] === 'POST') {
        http_response_code(401);
        echo "Error: Sesión no iniciada. Por favor, inicia sesión.";
        exit();
    }
    header("Location: login.php");
    exit();
}

$mensajeFeedback = "";
$errorFeedback = "";

// 2. Procesar el formulario POST (AJAX o tradicional)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $asuntoInput = trim($_POST['asunto'] ?? '');
    $mensajeInput = trim($_POST['mensaje'] ?? '');

    if (!empty($asuntoInput) && !empty($mensajeInput)) {
        
        // Correo del usuario actual
        $emailRemitente = $_SESSION['currentUserEmail'] ?? "nico@dawlloween.dev";

        // Si la sesión guarda la matriz, buscar su email
        if (isset($_SESSION['mimatriz']) && is_array($_SESSION['mimatriz'])) {
            foreach ($_SESSION['mimatriz'] as $user) {
                if (isset($user['usuario']) && $user['usuario'] === $_SESSION['currentUser']) {
                    $emailRemitente = $user['Email'] ?? $user['email'] ?? $emailRemitente;
                    break;
                }
            }
        }

        $emailRemitente = trim(str_replace(["\r", "\n"], '', $emailRemitente));
        $destinatario = "jack.skellington@dawlloween.dev";
        $asuntoCorreo = $asuntoInput;
        $cuerpoMensaje = $mensajeInput;

        $headers = "From: " . $emailRemitente . "\r\n" .
                   "Reply-To: " . $emailRemitente . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        if (mail($destinatario, $asuntoCorreo, $cuerpoMensaje, $headers)) {
            echo "OK";
            exit();
        } else {
            http_response_code(500);
            echo "Error al ejecutar mail()";
            exit();
        }
    } else {
        http_response_code(400);
        echo "Faltan campos por completar";
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Correo de Jack - DAWlloween</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Mystery+Quest&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

    <header>
        <nav>
            <ul>
                <li><a href="../index.html">Inicio</a></li>
                <li><a href="../recetas.html">Recetas</a></li>
                <li><a href="../juego.html">Minijuego</a></li>
                <li><a href="correo.php">Correo de Jack</a></li>
                <li><a href="login.php">Acceso</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>El Correo de Jack</h1>
        <p style="text-align: center; color: var(--color-texto-mutado); margin-bottom: 2rem;">
            Envía una lechuza digital a Jack con tus peores pesadillas. (Remitente actual: <strong><?php echo htmlspecialchars($_SESSION['currentUser']); ?></strong>)
        </p>

        <?php if (!empty($mensajeFeedback)): ?>
            <div class="alert alert-success" style="margin-bottom: 1.5rem;">
                <?php echo htmlspecialchars($mensajeFeedback); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($errorFeedback)): ?>
            <div class="alert alert-error" style="margin-bottom: 1.5rem;">
                <?php echo htmlspecialchars($errorFeedback); ?>
            </div>
        <?php endif; ?>

        <form action="correo.php" method="POST">
            <div class="form-group">
                <label for="asunto">Asunto</label>
                <input type="text" id="asunto" name="asunto" placeholder="Ej. Pesadillas en la granja de calabazas" required>
            </div>

            <div class="form-group">
                <label for="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribe tus pesadillas aquí..." required></textarea>
            </div>

            <button type="submit" class="btn">Enviar a Jack 🎃</button>
        </form>
    </main>

    <footer>
        <p>DAWlloween &copy; - <a href="../aboutus.html">Sobre mí</a></p>
    </footer>

</body>
</html>