const mongoose = require('mongoose');

// Definir el esquema de cliente con el parámetro extra 'format'
const format1Schema = new mongoose.Schema({
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
  },
  format: { 
    type: String, 
    default: 'format1' 
  }
});

// Crear el modelo de cliente
const Format1 = mongoose.model('Format1', format1Schema);

module.exports = Format1;