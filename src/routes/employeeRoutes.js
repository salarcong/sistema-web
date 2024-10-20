const express = require('express');
const router = express.Router();
const Employee = require('../models/employeesModel');

// Ruta para insertar datos de empleado manualmente
router.post('/add-employee', async (req, res) => {
  const { firstName, lastName, phone, email, age, company } = req.body;

  try {
    const newEmployee = new Employee({ firstName, lastName, phone, email, age, company });
    await newEmployee.save();
    res.status(201).send('Empleado agregado exitosamente');
  } catch (err) {
    res.status(400).send('Error al agregar empleado: ' + err.message);
  }
});

module.exports = router;