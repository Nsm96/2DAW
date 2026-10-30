const iconos = ['👻', '🎃', '🧙‍♀️', '🦇', '🧪', '💀'];
let cartas = [...iconos, ...iconos];

let primeraCarta = null;
let segundaCarta = null;
let bloqueoTablero = false;
let intentos = 0;
let parejasEncontradas = 0;

let tiempo = 0;
let intervaloTiempo = null;
let comodinUsado = false;

function formatearTiempo(totalSegundos) {
    if (totalSegundos < 60) {
        return `${totalSegundos}s`;
    }
    const mins = Math.floor(totalSegundos / 60);
    const segs = totalSegundos % 60;
    
    const minTexto = mins === 1 ? '1 minuto' : `${mins} minutos`;
    const segTexto = segs === 1 ? '1 segundo' : `${segs} segundos`;
    
    return segs === 0 ? minTexto : `${minTexto} y ${segTexto}`;
}

function iniciarJuego() {
    const tablero = document.getElementById('tablero-memoria');
    const mensajeWin = document.getElementById('mensaje-victoria');
    const btnComodin = document.getElementById('btn-comodin');

    if (!tablero) return;

    tablero.innerHTML = '';
    mensajeWin.style.display = 'none';
    intentos = 0;
    parejasEncontradas = 0;
    tiempo = 0;
    comodinUsado = false;

    document.getElementById('contador-intentos').textContent = intentos;
    document.getElementById('tiempo').textContent = formatearTiempo(tiempo);

    if (btnComodin) {
        btnComodin.disabled = false;
        btnComodin.textContent = '👁️ Ojo de Bruja (+3 intentos)';
    }

    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(() => {
        tiempo++;
        document.getElementById('tiempo').textContent = formatearTiempo(tiempo);
    }, 1000);

    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach((icono) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = icono;
        card.textContent = '❓';
        card.addEventListener('click', voltearCarta);
        tablero.appendChild(card);
    });
}

function voltearCarta() {
    if (bloqueoTablero || this === primeraCarta || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!primeraCarta) {
        primeraCarta = this;
        return;
    }

    segundaCarta = this;
    intentos++;
    document.getElementById('contador-intentos').textContent = intentos;

    comprobarPareja();
}

function comprobarPareja() {
    const esIgual = primeraCarta.dataset.value === segundaCarta.dataset.value;

    if (esIgual) {
        marcarEmparejadas();
    } else {
        desvoltearCartas();
    }
}

function marcarEmparejadas() {
    primeraCarta.classList.add('matched');
    segundaCarta.classList.add('matched');
    parejasEncontradas++;

    resetearSeleccion();

    if (parejasEncontradas === iconos.length) {
        clearInterval(intervaloTiempo);
        const mensajeWin = document.getElementById('mensaje-victoria');
        mensajeWin.textContent = `¡Felicidades! Has completado el ritual en ${intentos} intentos y un tiempo total de ${formatearTiempo(tiempo)}.`;
        mensajeWin.style.display = 'block';
    }
}

function desvoltearCartas() {
    bloqueoTablero = true;
    primeraCarta.classList.add('error');
    segundaCarta.classList.add('error');

    setTimeout(() => {
        primeraCarta.textContent = '❓';
        segundaCarta.textContent = '❓';
        primeraCarta.classList.remove('flipped', 'error');
        segundaCarta.classList.remove('flipped', 'error');
        resetearSeleccion();
    }, 800);
}

function resetearSeleccion() {
    [primeraCarta, segundaCarta] = [null, null];
    bloqueoTablero = false;
}

function usarComodin() {
    if (comodinUsado || bloqueoTablero) return;

    comodinUsado = true;
    bloqueoTablero = true;

    const btnComodin = document.getElementById('btn-comodin');
    if (btnComodin) {
        btnComodin.disabled = true;
        btnComodin.textContent = '👁️ Hechizo Agotado';
    }

    intentos += 3;
    document.getElementById('contador-intentos').textContent = intentos;

    const ocultas = document.querySelectorAll('.card:not(.matched)');
    ocultas.forEach(card => {
        card.textContent = card.dataset.value;
        card.classList.add('flipped');
    });

    setTimeout(() => {
        ocultas.forEach(card => {
            if (card !== primeraCarta) {
                card.textContent = '❓';
                card.classList.remove('flipped');
            }
        });
        bloqueoTablero = false;
    }, 1200);
}

window.onload = iniciarJuego;