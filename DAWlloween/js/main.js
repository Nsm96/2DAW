document.addEventListener('DOMContentLoaded', () => {
    const paginasProtegidas = ['recetas.html', 'juego.html'];
    
    let paginaActual = window.location.pathname.split('/').pop();
    if (!paginaActual || paginaActual === '') {
        paginaActual = 'index.html';
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