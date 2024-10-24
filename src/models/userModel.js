const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Definir el esquema de usuario con timestamps
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'admin', 
    required: true 
  }
}, { timestamps: true }); // Agregar timestamps

// Middleware para ajustar las fechas a la zona horaria de Centroamérica
userSchema.pre('save', function (next) {
  const now = moment().tz('America/Guatemala').toDate();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;