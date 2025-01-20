const express = require('express');
const { 
  getCortes, 
  createCorte, 
  updateCorte, 
  deleteCorte 
} = require('../controller/corte.controller');

const router = express.Router();

// Define las rutas
router.get('/', getCortes);               // Obtener todos los cortes
router.post('/', createCorte);            // Crear un nuevo corte
router.put('/:id', updateCorte);          // Actualizar un corte por ID
router.delete('/:id', deleteCorte);       // Eliminar un corte por ID

module.exports = router;
