const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para recibir el formulario
app.post('/enviar-formulario', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).send('Por favor completa todos los campos.');
    }

    // Configura tu cuenta de correo aquí
    const transporter = nodemailer.createTransport({
        service: 'gmail', // o el servicio que uses
        auth: {
            user: 'tuemail@gmail.com',
            pass: 'tucontraseña_app', // usa contraseña de app o similar
        },
    });

    const mailOptions = {
        from: email,
        to: 'tuemail@gmail.com',
        subject: `Nuevo mensaje de contacto de ${nombre}`,
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al enviar el correo.');
        }
        res.send('Mensaje enviado correctamente. ¡Gracias!');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
