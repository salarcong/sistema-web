const mongoose = require('mongoose');

// Definir el esquema de format1
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
  position: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  format: { 
    type: String, 
    default: 'format1' 
  }
});

// Crear el modelo de format1
const Format1 = mongoose.model('Format1', format1Schema);

module.exports = Format1;