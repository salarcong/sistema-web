// Importar la función de conexión desde database.js
const connectToDatabase = require('./database');
const express = require('express');

// Crear una instancia de Express
const app = express();
const port = 3000;

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Conectar a la base de datos y luego iniciar el servidor
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error al iniciar la aplicación', err);
});