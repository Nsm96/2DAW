document.addEventListener('DOMContentLoaded', () => {
    // 1. Lista de páginas protegidas
    const paginasProtegidas = ['recetas.html', 'juego.html'];

    let paginaActual = window.location.pathname.split('/').pop();
    if (!paginaActual || paginaActual === '') {
        paginaActual = 'index.html';
    }

    const usuarioLogueado = localStorage.getItem('usuario');

    // 2. Control de navegación según sesión
    if (usuarioLogueado) {
        const usuarioLogueado = localStorage.getItem('usuario');

if (usuarioLogueado) {
    // Añade una clase al body para activar las reglas de CSS de arriba
    document.body.classList.add('usuario-logueado');
}
        // Ocultar "Inicio"
        const enlaceInicio = document.querySelector('nav a[href="index.html"], nav a[href="./"]');
        if (enlaceInicio && enlaceInicio.parentElement) {
            enlaceInicio.parentElement.style.display = 'none';
        }
        // Mostrar elementos privados (Correo de Jack)
        document.querySelectorAll('.solo-login').forEach(el => el.style.display = 'inline-block');
    } else {
        // Ocultar elementos privados si no hay sesión
        document.querySelectorAll('.solo-login').forEach(el => el.style.display = 'none');
    }

    // 3. Protección de rutas (Redirige a login.php si no hay sesión)
    if (paginasProtegidas.includes(paginaActual) && !usuarioLogueado) {
        window.location.href = 'php/login.php';
    }

    // 4. Lógica del Correo de Jack
    const formJack = document.getElementById('form-correo-jack');
    const alertaRespuesta = document.getElementById('mensaje-correo');

    if (formJack) {
        formJack.addEventListener('submit', (e) => {
            e.preventDefault();

            // Si tienes un input de nombre lo usa, si no, usa el usuario logueado
            const nombreInput = document.getElementById('nombre');
            const nombre = nombreInput ? nombreInput.value : (usuarioLogueado || 'Amigo');

            // Mostrar simulación de envío
            alertaRespuesta.className = 'alert alert-success';
            alertaRespuesta.textContent = `¡Mensaje enviado con éxito, ${nombre}! Jack te responderá antes de medianoche. 🎃`;
            alertaRespuesta.style.display = 'block';

            // Limpiar el formulario
            formJack.reset();
        });
    }


    fetch('php/mostrar_usuarios.php')
        .then(response => response.json())
        .then(data => {
            if (data.usuario) {
                // ==========================================
                // 1. USUARIO AUTENTICADO
                // ==========================================
                const header = document.querySelector('header');
                
                if (header && !document.querySelector('.header-user')) {
                    const badge = document.createElement('div');
                    badge.className = 'header-user';
                    badge.innerHTML = `
                        <span class="user-badge">
                            🦇 <strong>${data.usuario.toUpperCase()}</strong> 🦇
                            <span style="opacity: 0.5; margin: 0 4px;">|</span>
                            <a href="php/logout.php" class="btn-logout-badge" title="Cerrar sesión">Huir 🚪</a>
                        </span>
                    `;
                    header.appendChild(badge);
                }

                gestionarVisibilidad(['recetas', 'recetas.html', 'minijuego', 'juego.html', '.solo-login'], true);
                gestionarVisibilidad(['acceso', 'login.php', '.solo-invitado'], false);

            } else {
                // ==========================================
                // 2. USUARIO NO AUTENTICADO (INVITADO)
                // ==========================================
                
                gestionarVisibilidad(['recetas', 'recetas.html', 'minijuego', 'juego.html', '.solo-login'], false);
                gestionarVisibilidad(['acceso', 'login.php', '.solo-invitado'], true);

                if (paginasProtegidas.includes(paginaActual)) {
                    window.location.href = 'php/login.php';
                }
            }
        })
        .catch(err => console.error('Error al comprobar la sesión:', err));
});

function gestionarVisibilidad(elementos, mostrar) {
    const estadoDisplay = mostrar ? '' : 'none';

    elementos.forEach(clave => {
        if (clave.startsWith('.')) {
            document.querySelectorAll(clave).forEach(el => {
                el.style.display = estadoDisplay;
            });
            return;
        }

        document.querySelectorAll('a').forEach(enlace => {
            const texto = enlace.textContent.trim().toLowerCase();
            const href = (enlace.getAttribute('href') || '').toLowerCase();

            if (texto.includes(clave) || href.includes(clave)) {
                const liPadre = enlace.closest('li');
                const objetivo = liPadre || enlace;
                objetivo.style.display = estadoDisplay;
            }
        });
    });
}