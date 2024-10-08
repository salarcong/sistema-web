const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const { authenticateToken } = require('../middleware/auth');

// Usar las rutas de usuario
router.use('/', userRoutes);

// Ruta de ejemplo
router.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

// Ruta para la página de admin (protegida)
router.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  res.send('Bienvenido, Admin!');
});

// Ruta para la página de usuario (protegida)
router.get('/user', authenticateToken, (req, res) => {
  if (req.user.role !== 'user') return res.sendStatus(403);
  res.send('Bienvenido, Usuario!');
});

module.exports = router;