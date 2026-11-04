<?php
require_once 'VarGlobales.php';

// 1. Control de seguridad: Si no hay sesión iniciada, redirigir al login
if (empty($_SESSION['currentUser'])) {
    header("Location: login.php");
    exit();
}

$mensajeFeedback = "";
$errorFeedback = "";

// 2. Procesar el formulario cuando se envía por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $asunto = trim($_POST['asunto'] ?? '');
    $mensaje = trim($_POST['mensaje'] ?? '');

    if (!empty($asunto) && !empty($mensaje)) {
        
        // 3. Buscar el email del usuario actual dentro de la matriz de sesión
        $emailRemitente = "";
        if (isset($_SESSION['mimatriz']) && is_array($_SESSION['mimatriz'])) {
            foreach ($_SESSION['mimatriz'] as $user) {
                if ($user['usuario'] === $_SESSION['currentUser']) {
                    $emailRemitente = $user['email'];
                    break;
                }
            }
        }

        // Si por alguna razón no encuentra el correo, ponemos uno por defecto
        if (empty($emailRemitente)) {
            $emailRemitente = "no-reply@dawlloween.dev";
        }

        // 4. Configuración del correo para Jack
        $destinatario = "jack.skellington@dawlloween.dev"; // O tu correo de prueba de Yahoo configurado en sendmail
        $asuntoCorreo = "DAWlloween - " . htmlspecialchars($asunto);
        
        $cuerpoMensaje = "Contenido del correo:\n" . htmlspecialchars($mensaje);

        // Cabeceras obligatorias indicando el FROM del usuario logueado según la rúbrica
        $headers = "From: " . $emailRemitente . "\r\n" .
                   "Reply-To: " . $emailRemitente . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        // 5. Envío usando la función mail() de PHP
        if (@mail($destinatario, $asuntoCorreo, $cuerpoMensaje, $headers)) {
            $mensajeFeedback = "¡Mensaje enviado con éxito a Jack! Te responderá antes de medianoche. 🎃";
        } else {
            $errorFeedback = "El mensaje no pudo enviarse. Revisa la configuración de Sendmail/SMTP.";
        }

    } else {
        $errorFeedback = "Por favor, completa todos los campos del formulario.";
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
                <li><a href="../aboutus.html">Inicio</a></li>
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