<?php

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "contacto@sfraca.dev";
    $subject = "Nuevo mensaje de $name";
    $body = "Nombre: $name\nCorreo: $email\nMensaje: $message";
    $headers = "From: $email";

    if(mail($to, $subject, $body, $headers)) {
        echo "Gracias por tu mensaje";
    } else {
        echo "Hubo un error al enviar el mensaje";
    }
}