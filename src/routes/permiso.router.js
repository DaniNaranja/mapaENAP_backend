const express = require('express');
const { 
    getPermisos, 
    createPermiso, 
    updatePermiso, 
    deletePermiso 
  } = require('../controller/permiso.controller');
const authenticate = require('../middlewares/authenticathe');

const router = express.Router();

router.get('/', authenticate, getPermisos);
router.post('/', createPermiso);
router.put('/:id', authenticate, updatePermiso);
router.delete('/:id', authenticate, deletePermiso);

module.exports = router;