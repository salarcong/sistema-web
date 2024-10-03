const mongoose = require('mongoose');

// URL de conexión (reemplaza <username>, <password> y <dbname> con tus datos)
const url = 'mongodb+srv://salarcong:Perrovolador123@cluster0.xikvt4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.error('Error al conectar a la base de datos', err);
  }
}

// Exportar la función
module.exports = connectToDatabase;