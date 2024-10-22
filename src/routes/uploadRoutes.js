const express = require('express');
const router = express.Router();
const Format1 = require('../models/format1Model');
const upload = require('../middleware/upload');
const xlsx = require('xlsx');

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
      const { firstName, lastName, phone, email, age, position, department } = row;
      const newFormat1 = new Format1({ firstName, lastName, phone, email, age, position, department });
      await newFormat1.save();
    }

    res.status(200).send('Archivo subido y datos guardados exitosamente');
  } catch (err) {
    res.status(500).send('Error al procesar el archivo: ' + err.message);
  }
});

// Ruta para eliminar un documento por ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Format1.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Cliente no encontrado');
    }
    res.status(200).send('Cliente eliminado exitosamente');
  } catch (err) {
    res.status(500).send('Error al eliminar el cliente: ' + err.message);
  }
});

// Ruta para eliminar todos los documentos con format: 'format1'
router.delete('/deleteAllFormat1', async (req, res) => {
  try {
    await Format1.deleteMany({ format: 'format1' });
    res.status(200).send('Todos los clientes con formato "format1" han sido eliminados exitosamente');
  } catch (err) {
    res.status(500).send('Error al eliminar los clientes: ' + err.message);
  }
});

module.exports = router;