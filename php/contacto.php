<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Saneamos lo que llega por POST
    $name = strip_tags(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST['message'] ?? ''));

    // Validamos que no falte nada
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Error: Todos los campos son obligatorios.";
        exit;
    }

    // Comprobamos que el email sea válido de verdad
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Error: El email no tiene un formato correcto.";
        exit;
    }

    // Quién recibe el correo y el asunto
    $to = "contacto@sfraca.dev";
    $subject = "Web Portfolio - Mensaje de " . $name;
    
    // Montamos el cuerpo del correo
    $body = "Mensaje recibido desde el formulario de contacto:\n\n";
    $body .= "Nombre: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Mensaje:\n$message\n";

    // Limpieza extra para evitar inyecciones en headers
    $name = str_replace(["\r", "\n"], '', $name);
    $email = str_replace(["\r", "\n"], '', $email);

    // Cabeceras para que llegue bien y no como SPAM
    $headers = [
        "From: no-reply@sfraca.dev",
        "Reply-To: $email",
        "X-Mailer: PHP/" . phpversion(),
        "Content-Type: text/plain; charset=UTF-8"
    ];

    // Intentamos mandarlo (usamos @ para que no salten warnings si no hay server de correo local)
    if (@mail($to, $subject, $body, implode("\r\n", $headers))) {
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        http_response_code(500);
        echo "Error: No se pudo enviar el correo. Problema del servidor.";
    }
} else {
    http_response_code(405);
    echo "Acceso no permitido.";
}