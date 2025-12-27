const cajaTerminal = document.getElementById("terminal");
const input = document.getElementById("command");
const history = document.getElementById("history");
const prompt = document.getElementById("prompt").innerText;

history.innerHTML = "<p id='anim'></p>";
const anim = document.getElementById("anim");

// Aniadir año actual
const year = document.getElementById("year");
year.innerHTML = new Date().getFullYear();


// Animacion inicial
const mensaje2 = "Sistema listo.";
const mensaje3 = "Este terminal le permitirá obtener información sobre mí y este sitio web. Para más información, use el comando 'help'";

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function animacionInicial() {

    document.getElementById("input").style.display = "none";
    await esperar(500);
    anim.innerHTML = "Cargando";
    for (let i = 0; i < 3; i++) {
        for (let i = 0; i < 4; i++) {
            await esperar(400);
            anim.innerHTML += ".";
        }
        anim.innerHTML = "Cargando";
    }
    await esperar(1000);
    anim.innerHTML = mensaje2;
    await esperar(3000);
    anim.innerHTML = mensaje3;
    await esperar(1000);
    document.getElementById("input").style.display = "flex";
}

animacionInicial();


// Click en la terminal
document.addEventListener("click", function (event) {
    const clickDentro = cajaTerminal.contains(event.target);

    if (!clickDentro) {
        input.blur();
    }
    else {
        input.focus();
    }
});

let comandosGuardados = {};

// Cargar comandos desde JSON
fetch("js/commands.json")
    .then(response => response.json())
    .then(data => {
        comandosGuardados = data;
        console.log("Comandos cargados:", data)
    })
    .catch(error => {
        console.error("Error cargando JSON:", err);
    });


// Funcionamiento terminal
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (input.value.trim() === "") return;

        const cmd = input.value.trim().toLowerCase();

        if (cmd === "clear") {
            history.innerHTML = "";
            input.value = "";
            return;
        }
        else if (comandosGuardados[cmd]) {
            history.innerHTML += "<p>" + prompt + "&nbsp;&nbsp;&nbsp;" + input.value + "</p>";
            history.innerHTML += "<p>" + comandosGuardados[cmd] + "</p>";
        }
        else {
            // Si no existe en el JSON
            history.innerHTML += `<p style="color: red">Command not found: ${cmd}. Try 'help'.</p>`;
        }

        input.value = "";
    }

    history.scrollTop = history.scrollHeight;
})

document.addEventListener("DOMContentLoaded", function () {

    // 1. Seleccionamos los dos menús y las tarjetas
    const statusSelect = document.getElementById("skill-level");
    const typeSelect = document.getElementById("skill-type");
    const cards = document.querySelectorAll(".skill-card");

    // 2. Función maestra que filtra
    function filtrarTarjetas() {
        const statusValue = statusSelect.value; // ej: 'ready' o 'all'
        const typeValue = typeSelect.value;     // ej: 'backend' o 'all'

        cards.forEach(card => {
            // Leemos los datos de la tarjeta actual
            const cardStatus = card.getAttribute("data-status");
            const cardType = card.getAttribute("data-type");

            // CONDICIÓN 1: ¿Coincide el status? (o está seleccionado 'todos')
            const matchStatus = (statusValue === "all" || statusValue === cardStatus);

            // CONDICIÓN 2: ¿Coincide el tipo? (o está seleccionado 'todos')
            const matchType = (typeValue === "all" || typeValue === cardType);

            // 3. Lógica final: SOLO mostramos si cumple AMBAS condiciones
            if (matchStatus && matchType) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    }

    // 3. Escuchamos cambios en AMBOS menús
    statusSelect.addEventListener("change", filtrarTarjetas);
    typeSelect.addEventListener("change", filtrarTarjetas);
});