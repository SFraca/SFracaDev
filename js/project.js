const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.content-button');

function moverIndicador(el) {
    indicator.style.left = el.offsetLeft + 'px';
    indicator.style.width = el.offsetWidth + 'px';
}

// AHORA LA FUNCIÓN RECIBE DOS COSAS: EL EVENTO (e) Y EL ID (nombreTab)
function abrirPestana(e, nombreTab) {

    // 1. Ocultar todos los contenidos
    // ERROR CORREGIDO: Tu bucle tenía "i > length", nunca se ejecutaba. Es "i < length"
    var contenidos = document.getElementsByClassName('content-item');
    for (var i = 0; i < contenidos.length; i++) {
        contenidos[i].classList.remove('active');
    }

    // 2. Quitar la clase active de todos los botones
    items.forEach(item => item.classList.remove('active'));

    // 3. Activar el contenido seleccionado (Usamos el nombreTab que viene del HTML)
    document.getElementById(nombreTab).classList.add('active'); // ERROR CORREGIDO: Es add, no remove

    // 4. Activar el botón clicado y mover la línea
    e.currentTarget.classList.add('active');
    moverIndicador(e.currentTarget);
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const activeBtn = document.querySelector('.content-button.active');
    if (activeBtn) moverIndicador(activeBtn);
});

// Recalcular si se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.content-button.active');
    if (activeBtn) moverIndicador(activeBtn);
});

document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todos los items de la galería
    const galleryItems = document.querySelectorAll('.project-gallery-item');
    const body = document.body;

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            // 'this' se refiere al elemento .project-gallery-item al que se hizo click

            // Alternamos (ponemos o quitamos) la clase 'expanded'
            this.classList.toggle('expanded');

            // Alternamos el bloqueo de scroll en el body
            // Si el item acaba de expandirse, bloqueamos el scroll
            if (this.classList.contains('expanded')) {
                body.classList.add('no-scroll');
            } else {
                // Si se acaba de cerrar, desbloqueamos
                body.classList.remove('no-scroll');
            }
        });
    });
});
