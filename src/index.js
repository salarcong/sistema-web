//Importar la conexión a la base de datos desde database.js
const mongoose = require('./database');

//Importar Express y crear una aplicación básica
const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

//Iniciar el servidor y verificar la conexión a la base de datos
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});