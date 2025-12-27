document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    var formData = new FormData(this);
    var statusMessage = document.getElementById('statusMessage');

    fetch('php/contacto.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // --- MOSTRAR EL MENSAJE ---
        statusMessage.textContent = "¡Mensaje enviado correctamente!";
        
        // Importante: Quitamos fade-out por si el usuario dio click muy rápido dos veces
        statusMessage.classList.remove('hidden', 'fade-out'); 
        statusMessage.classList.add('status-message');
        
        statusMessage.style.color = "var(--cobalt-blue-color)"; 

        this.reset(); 

        // --- INICIAR SECUENCIA DE DESAPARICIÓN ---
        
        // 1. Esperamos 5 segundos leyendo el mensaje
        setTimeout(() => {
            // Añadimos la clase que baja la opacidad a 0
            statusMessage.classList.add('fade-out');

            // 2. Esperamos lo que dura la transición CSS (500ms = 0.5s)
            setTimeout(() => {
                statusMessage.textContent = "";
                statusMessage.classList.remove('status-message', 'fade-out');
                statusMessage.classList.add('hidden'); // Ahora sí, display: none
            }, 500); // Este tiempo debe coincidir con tu CSS (0.5s)

        }, 5000);
    })
    .catch(error => {
        // --- ERROR (Misma lógica) ---
        statusMessage.textContent = "Error al enviar.";
        statusMessage.classList.remove('hidden', 'fade-out');
        statusMessage.classList.add('status-message');
        statusMessage.style.color = "red"; 
        
        setTimeout(() => {
            statusMessage.classList.add('fade-out');
            setTimeout(() => {
                statusMessage.textContent = "";
                statusMessage.classList.remove('status-message', 'fade-out');
                statusMessage.classList.add('hidden');
            }, 500);
        }, 5000);
    });
});