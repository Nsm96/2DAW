document.addEventListener('DOMContentLoaded', () => {
    // Rutas de las imágenes contenidas en la carpeta img/
    const imagenes = [
        'img/calabaza.png',
        'img/fantasma.png',
        'img/sombrero.png',
        'img/pocion.png',
        'img/gato.png',
        'img/calavera.png'
    ];

    let cartas = [];
    let primeraCarta = null;
    let segundaCarta = null;
    let bloqueoTablero = false;
    let parejasEncontradas = 0;
    let intentos = 0;
    let tiempo = 0;
    let temporizador = null;
    let juegoIniciado = false;

    // Elementos del DOM (soporta ID o clases según el HTML)
    const tablero = document.getElementById('tablero') || document.querySelector('.grid-juego') || document.querySelector('.tablero');
    const elTiempo = document.getElementById('tiempo');
    const elIntentos = document.getElementById('intentos');
    const btnOjo = document.getElementById('btn-ojo') || document.querySelector('.btn-ojo') || document.querySelector('button[onclick*="Ojo"]');
    const btnReiniciar = document.getElementById('btn-reiniciar') || document.querySelector('.btn-reiniciar') || document.querySelector('button[onclick*="Reiniciar"]');

    function iniciarJuego() {
        // Duplicar las 6 imágenes para tener las 6 parejas y mezclar aleatoriamente
        cartas = [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);
        primeraCarta = null;
        segundaCarta = null;
        bloqueoTablero = false;
        parejasEncontradas = 0;
        intentos = 0;
        tiempo = 0;
        juegoIniciado = false;

        clearInterval(temporizador);
        if (elTiempo) elTiempo.textContent = '0s';
        if (elIntentos) elIntentos.textContent = '0';

        renderizarTablero();
    }

    function renderizarTablero() {
        if (!tablero) return;
        tablero.innerHTML = '';

        cartas.forEach((imgSrc) => {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.dataset.imagen = imgSrc;
            carta.innerHTML = '<span class="cubierta">?</span>';
            carta.addEventListener('click', voltearCarta);
            tablero.appendChild(carta);
        });
    }

    function iniciarTiempo() {
        if (!juegoIniciado) {
            juegoIniciado = true;
            temporizador = setInterval(() => {
                tiempo++;
                if (elTiempo) elTiempo.textContent = `${tiempo}s`;
            }, 1000);
        }
    }

    function voltearCarta() {
        if (bloqueoTablero) return;
        if (this === primeraCarta) return;
        if (this.classList.contains('resuelta')) return;

        iniciarTiempo();

        this.classList.add('volteada');
        this.innerHTML = `<img src="${this.dataset.imagen}" alt="Hechizo" class="img-carta">`;

        if (!primeraCarta) {
            primeraCarta = this;
            return;
        }

        segundaCarta = this;
        incrementarIntentos();
        comprobarPareja();
    }

    function incrementarIntentos(cantidad = 1) {
        intentos += cantidad;
        if (elIntentos) elIntentos.textContent = intentos;
    }

    function comprobarPareja() {
        const esPareja = primeraCarta.dataset.imagen === segundaCarta.dataset.imagen;

        if (esPareja) {
            desactivarCartas();
        } else {
            ocultarCartas();
        }
    }

    function desactivarCartas() {
        primeraCarta.classList.add('resuelta');
        segundaCarta.classList.add('resuelta');
        parejasEncontradas++;

        resetearSeleccion();

        if (parejasEncontradas === imagenes.length) {
            clearInterval(temporizador);
            setTimeout(() => {
                alert(`¡Enhorabuena! Has liberado el área privada en ${tiempo} segundos con ${intentos} intentos. 🎃`);
            }, 300);
        }
    }

    function ocultarCartas() {
        bloqueoTablero = true;
        setTimeout(() => {
            if (primeraCarta) {
                primeraCarta.classList.remove('volteada');
                primeraCarta.innerHTML = '<span class="cubierta">?</span>';
            }
            if (segundaCarta) {
                segundaCarta.classList.remove('volteada');
                segundaCarta.innerHTML = '<span class="cubierta">?</span>';
            }
            resetearSeleccion();
        }, 1000);
    }

    function resetearSeleccion() {
        [primeraCarta, segundaCarta] = [null, null];
        bloqueoTablero = false;
    }

    // Habilidad especial: Ojo de Bruja (+3 intentos, revela todo 1.5s)
    function ojoDeBruja() {
        if (bloqueoTablero || parejasEncontradas === imagenes.length) return;
        iniciarTiempo();
        incrementarIntentos(3);
        bloqueoTablero = true;

        const todasLasCartas = document.querySelectorAll('.carta:not(.resuelta)');
        todasLasCartas.forEach(carta => {
            carta.classList.add('volteada');
            carta.innerHTML = `<img src="${carta.dataset.imagen}" alt="Hechizo" class="img-carta">`;
        });

        setTimeout(() => {
            todasLasCartas.forEach(carta => {
                if (!carta.classList.contains('resuelta')) {
                    carta.classList.remove('volteada');
                    carta.innerHTML = '<span class="cubierta">?</span>';
                }
            });
            resetearSeleccion();
        }, 1500);
    }

    if (btnOjo) btnOjo.addEventListener('click', ojoDeBruja);
    if (btnReiniciar) btnReiniciar.addEventListener('click', iniciarJuego);

    iniciarJuego();
});