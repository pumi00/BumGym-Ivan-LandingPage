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
const nodemailer = require('nodemailer');

app.post('/enviar-formulario', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).send('Faltan campos');
    }

    // Configura aquí tu correo Gmail (usa contraseña de aplicación)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ivanperezgonzalez123@gmail.com',          // Tu correo
            pass: 'TU_CONTRASENA_DE_APP',         // No tu contraseña normal
        },
    });

    const mailOptions = {
        from: email,
        to: 'TU_CORREO@gmail.com',             // Donde lo recibes
        subject: `Nuevo mensaje de ${nombre}`,
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Correo enviado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
