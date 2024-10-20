const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const xlsx = require('xlsx');
const Employee = require('../models/employeesModel');

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
      const { firstName, lastName, phone, email, age, company } = row;
      const newEmployee = new Employee({ firstName, lastName, phone, email, age, company });
      await newEmployee.save();
    }

    res.status(200).send('Archivo subido y datos guardados exitosamente');
  } catch (err) {
    res.status(500).send('Error al procesar el archivo: ' + err.message);
  }
});

module.exports = router;