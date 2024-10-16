const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Contact = require('../models/contactModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const xlsx = require('xlsx');

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

// Ruta para subir archivos Excel y guardar su contenido en la base de datos
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No se ha subido ningún archivo');
    }

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Procesar los datos y guardarlos en la base de datos
    for (const row of data) {
      const { firstName, lastName, phone, email, age } = row;
      const newContact = new Contact({ firstName, lastName, phone, email, age });
      await newContact.save();
    }

    res.status(200).send('Archivo subido y datos guardados exitosamente');
  } catch (err) {
    res.status(500).send('Error al procesar el archivo: ' + err.message);
  }
});

module.exports = router;