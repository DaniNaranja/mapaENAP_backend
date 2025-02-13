const express = require('express');
const { 
  getUsosGrifos, 
  createUsoGrifo, 
  updateUsoGrifo, 
  deleteUsoGrifo 
} = require('../controller/usoGrifo.controller');
const authenticate = require('../middlewares/authenticathe');

const router = express.Router();

// Define las rutas
router.get('/', getUsosGrifos);               // Obtener todos los cortes
router.post('/', authenticate, createUsoGrifo);            // Crear un nuevo corte
router.put('/:id', authenticate, updateUsoGrifo);          // Actualizar un corte por ID
router.delete('/:id', authenticate, deleteUsoGrifo);       // Eliminar un corte por ID

module.exports = router;
