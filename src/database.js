//Importar el paquete mongoose
const mongoose = require('mongoose');

//Configurar la URL de conexión a MongoDB
const url = 'mongodb+srv://salarcong:Perrovolador123@cluster0.xikvt4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//Conectar a la base de datos usando mongoose
mongoose.connect(url)
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos', err);
  });

//Exportar la conexión para usarla en otros archivos
module.exports = mongoose;