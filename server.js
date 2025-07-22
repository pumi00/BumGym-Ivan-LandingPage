const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/enviar-formulario', (req, res) => {
  console.log(req.body);
  res.send('Formulario recibido');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

