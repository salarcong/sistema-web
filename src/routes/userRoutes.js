const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    res.status(400).send('Error al registrar usuario: ' + err.message);
  }
});

module.exports = router;