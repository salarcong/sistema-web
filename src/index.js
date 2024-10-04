const connectToDatabase = require('./database');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'client/dist'
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api', (req, res) => {
  res.send('Hello World');
});

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error al iniciar la aplicación', err);
});