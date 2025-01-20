const express = require('express');
const { 
  getCortes, 
  createCorte, 
  updateCorte, 
  deleteCorte 
} = require('../controller/corte.controller');
const authenticate = require('../middlewares/authenticathe');

const router = express.Router();

// Define las rutas
router.get('/', getCortes);               // Obtener todos los cortes
router.post('/', authenticate, createCorte);            // Crear un nuevo corte
router.put('/:id', authenticate, updateCorte);          // Actualizar un corte por ID
router.delete('/:id', authenticate, deleteCorte);       // Eliminar un corte por ID

module.exports = router;
