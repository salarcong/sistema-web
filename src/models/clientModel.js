const mongoose = require('mongoose');

// Definir el esquema de cliente
const clientSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
},
  lastName: { 
    type: String, 
    required: true 
},
  phone: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  age: { 
    type: Number, 
    required: true 
},
  company: { 
    type: String, 
    required: true 
} 
});

// Crear el modelo de cliente
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;