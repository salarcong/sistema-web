// src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const Format1 = require('../models/format1Model');
const upload = require('../middleware/upload');
const xlsx = require('xlsx');
const fs = require('fs');

// Ruta para subir múltiples archivos Excel y guardar su contenido en la base de datos
router.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;
    const { clientId } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).send('No se han subido archivos');
    }

    if (!clientId) {
      return res.status(400).send('No se ha proporcionado el clientId');
    }

    for (const file of files) {
      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      // Procesar los datos y guardarlos en la base de datos
      for (const row of data) {
        const { firstName, lastName, phone, email, age, position, department } = row;
        const newFormat1 = new Format1({ 
          firstName, 
          lastName, 
          phone, 
          email, 
          age, 
          position, 
          department,
          clientId // Asegúrate de que el clientId se guarde en el documento
        });
        await newFormat1.save();
      }

      // Eliminar el archivo después de procesarlo
      fs.unlinkSync(file.path);
    }

    res.status(200).send('Archivos subidos y datos guardados exitosamente');
  } catch (err) {
    res.status(500).send('Error al procesar los archivos: ' + err.message);
  }
});

// Ruta para obtener todos los datos subidos por un cliente específico
router.get('/dataXLSX/:clientId', async (req, res) => {
  const { clientId } = req.params;
  try {
    const data = await Format1.find({ clientId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Error al obtener los datos: ' + err.message);
  }
});

// Ruta para obtener un dato por ID
router.get('/dataXLSX/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Format1.findById(id);
    if (!data) {
      return res.status(404).send('Dato no encontrado');
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Error al obtener el dato: ' + err.message);
  }
});

// Ruta para eliminar un documento por ID
router.delete('/deleteXLSX/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Format1.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Documento no encontrado');
    }
    res.status(200).send('Documento eliminado exitosamente');
  } catch (err) {
    res.status(500).send('Error al eliminar el documento: ' + err.message);
  }
});

// Ruta para modificar un documento por ID
router.put('/updateXLSX/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, email, age, position, department } = req.body;

  try {
    const updatedFormat1 = await Format1.findByIdAndUpdate(
      id,
      { firstName, lastName, phone, email, age, position, department },
      { new: true, runValidators: true }
    );
    if (!updatedFormat1) {
      return res.status(404).send('Dato no encontrado');
    }
    res.status(200).send('Dato actualizado exitosamente');
  } catch (err) {
    res.status(400).send('Error al actualizar el dato: ' + err.message);
  }
});

module.exports = router;