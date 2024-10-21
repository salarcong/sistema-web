const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');

// Ruta para insertar datos de cliente manualmente
router.post('/add-client', async (req, res) => {
  const { firstName, lastName, phone, email, age, company } = req.body;

  try {
    const newClient = new Client({ firstName, lastName, phone, email, age, company });
    await newClient.save();
    res.status(201).send('Cliente agregado exitosamente');
  } catch (err) {
    res.status(400).send('Error al agregar cliente: ' + err.message);
  }
});

// Ruta para eliminar un documento por ID
router.delete('/delete-client/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Client.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Cliente no encontrado');
    }
    res.status(200).send('Cliente eliminado exitosamente');
  } catch (err) {
    res.status(500).send('Error al eliminar el cliente: ' + err.message);
  }
});

// Ruta para modificar un documento por ID
router.put('/update-client/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, email, age, company } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { firstName, lastName, phone, email, age, company },
      { new: true, runValidators: true }
    );
    if (!updatedClient) {
      return res.status(404).send('Cliente no encontrado');
    }
    res.status(200).send('Cliente actualizado exitosamente');
  } catch (err) {
    res.status(400).send('Error al actualizar cliente: ' + err.message);
  }
});

module.exports = router;