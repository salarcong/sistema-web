const mongoose = require('mongoose');

// Definir el esquema de contacto
const contactSchema = new mongoose.Schema({
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
}
});

// Crear el modelo de contacto
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;