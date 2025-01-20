const express = require('express');
const { 
    getPermisos, 
    createPermiso, 
    updatePermiso, 
    deletePermiso 
  } = require('../controller/permiso.controller');

const router = express.Router();

router.get('/', getPermisos);
router.post('/', createPermiso);
router.put('/:id', updatePermiso);
router.delete('/:id', deletePermiso);

module.exports = router;