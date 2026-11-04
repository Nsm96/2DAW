document.addEventListener('DOMContentLoaded', () => {

    // 1. Páginas que requieren inicio de sesión obligatorio
    const paginasProtegidas = ['recetas.html', 'juego.html', 'correojack.html'];
    
    let paginaActual = window.location.pathname.split('/').pop();
    if (!paginaActual || paginaActual === '') {
        paginaActual = 'aboutus.html';
    }

    // 2. Comprobar sesión contra el servidor PHP
    fetch('php/mostrar_usuarios.php')
        .then(response => response.json())
        .then(data => {
            const usuarioAutenticado = data && data.usuario;

            if (usuarioAutenticado) {
                // ==========================================
                // USUARIO AUTENTICADO
                // ==========================================
                
                // Guardar variable de usuario en JS para consistencia
                localStorage.setItem('usuario', data.usuario);

                // Pintar o actualizar el badge en el header (incluye el botón de logout)
                pintarHeaderUsuario(data.usuario);

                // Configurar visibilidad del menú
                gestionarVisibilidad(['recetas', 'recetas.html', 'juego.html', 'correojack.html', '.solo-login'], true);
                gestionarVisibilidad(['login.php', '.solo-invitado'], false);

                document.body.classList.add('usuario-logueado');

            } else {
                // ==========================================
                // USUARIO NO AUTENTICADO (INVITADO)
                // ==========================================
                
                localStorage.removeItem('usuario');

                // Quitar badge de usuario si existiera
                const badgeExistente = document.querySelector('.header-user');
                if (badgeExistente) badgeExistente.remove();

                // Configurar visibilidad del menú
                gestionarVisibilidad(['recetas.html', 'juego.html', 'correojack.html', '.solo-login'], false);
                gestionarVisibilidad(['login.php', '.solo-invitado'], true);

                // Protección de rutas: si intenta acceder a una página privada sin sesión
                if (paginasProtegidas.includes(paginaActual)) {
                    alert('🎃 ¡¡Boof!! Necesitas iniciar sesión para acceder a esta sección.');
                    window.location.href = 'php/login.php';
                }
            }
        })
        .catch(err => {
            console.error('Error al comprobar la sesión:', err);
            // Ante cualquier error de red, si la página es privada redirigimos
            if (paginasProtegidas.includes(paginaActual)) {
                window.location.href = 'php/login.php';
            }
        });

    // 3. Lógica del formulario en "El Correo de Jack"
    const formJack = document.getElementById('form-correo-jack');
    const alertaRespuesta = document.getElementById('mensaje-correo');

    if (formJack) {
        formJack.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(formJack);
            const btnEnviar = formJack.querySelector('button[type="submit"]');
            if (btnEnviar) btnEnviar.disabled = true;

            fetch('php/correo.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.text();
            })
            .then(data => {
                alertaRespuesta.className = 'alert alert-success';
                alertaRespuesta.textContent = `¡Mensaje enviado con éxito a Jack! Te responderá antes de medianoche. 🎃`;
                alertaRespuesta.style.display = 'block';
                formJack.reset();
            })
            .catch(error => {
                console.error('Error al enviar:', error);
                alertaRespuesta.className = 'alert alert-error';
                alertaRespuesta.textContent = 'Hubo un error al entregar el mensaje. Inténtalo de nuevo.';
                alertaRespuesta.style.display = 'block';
            })
            .finally(() => {
                if (btnEnviar) btnEnviar.disabled = false;
            });
        });
    }
});

// Función auxiliar para renderizar el badge del usuario y botón Huir
function pintarHeaderUsuario(nombreUsuario) {
    let container = document.getElementById('user-badge-container');
    const header = document.querySelector('header');

    if (!container && header) {
        container = document.createElement('div');
        container.className = 'header-user solo-login';
        container.id = 'user-badge-container';
        header.appendChild(container);
    }

    if (container) {
        container.style.display = 'inline-block';
        container.innerHTML = `
            <span class="user-badge">
                🦇 <strong>${nombreUsuario.toUpperCase()}</strong> 🦇
                <span style="opacity: 0.5; margin: 0 4px;">|</span>
                <a href="php/logout.php" class="btn-logout-badge" title="Cerrar sesión">Huir 🚪</a>
            </span>
        `;
    }
}

// Función para alternar la visibilidad de elementos según estado de sesión
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