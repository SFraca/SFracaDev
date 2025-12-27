document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    var statusMessage = document.getElementById('statusMessage');

    fetch('php/contacto.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            // Verificamos si la respuesta es correcta (status 200-299)
            if (!response.ok) {
                // Si hay error (400, 500, etc), lanzamos el texto del error
                return response.text().then(text => { throw new Error(text) });
            }
            return response.text();
        })
        .then(data => {
            // --- ÉXITO ---
            statusMessage.textContent = data; // Mostramos el mensaje real del PHP

            statusMessage.classList.remove('hidden', 'fade-out');
            statusMessage.classList.add('status-message');
            statusMessage.style.color = "var(--cobalt-blue-color)";

            this.reset();

            // Secuencia de desaparición
            setTimeout(() => {
                statusMessage.classList.add('fade-out');
                setTimeout(() => {
                    statusMessage.textContent = "";
                    statusMessage.classList.remove('status-message', 'fade-out');
                    statusMessage.classList.add('hidden');
                }, 500);
            }, 5000);
        })
        .catch(error => {
            // --- ERROR ---
            // Mostramos el mensaje de error que viene del PHP (o el de red)
            statusMessage.textContent = error.message.includes("Error:") ? error.message : "Error de conexión con el servidor.";

            statusMessage.classList.remove('hidden', 'fade-out');
            statusMessage.classList.add('status-message');
            statusMessage.style.color = "#ff4d4d"; // Un rojo más visible

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