const mongoose = require('mongoose');

// Definir el esquema de empleado
const employeeSchema = new mongoose.Schema({
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

// Crear el modelo de empleado
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;