const mongoose = require('./database');
const express = require('express');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas desde routes.js
app.use('/', routes);

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

// Iniciar el servidor y verificar la conexión a la base de datos
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});