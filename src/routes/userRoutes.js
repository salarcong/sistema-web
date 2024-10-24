const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../middleware/auth');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    res.status(400).send('Error al registrar usuario: ' + err.message);
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Credenciales incorrectas');
    }

    const token = generateToken(user);
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).send('Error al iniciar sesión: ' + err.message);
  }
});

// Ruta para eliminar un usuario
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).send('Usuario eliminado exitosamente');
  } catch (err) {
    res.status(500).send('Error al eliminar usuario: ' + err.message);
  }
});

// Ruta para modificar un usuario por ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        username, 
        email, 
        ...(hashedPassword && { password: hashedPassword }), 
        role 
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).send('Usuario actualizado exitosamente');
  } catch (err) {
    res.status(400).send('Error al actualizar usuario: ' + err.message);
  }
});

module.exports = router;