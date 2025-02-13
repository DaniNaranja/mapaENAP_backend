const express = require('express');
const { 
    getPermisosGrifos, 
    createPermisoGrifo, 
    updatePermisoGrifo, 
    deletePermisoGrifo 
  } = require('../controller/permisoGrifo.controller');
const authenticate = require('../middlewares/authenticathe');

const router = express.Router();

router.get('/', authenticate, getPermisosGrifos);
router.post('/', createPermisoGrifo);
router.put('/:id', authenticate, updatePermisoGrifo);
router.delete('/:id', authenticate, deletePermisoGrifo);

module.exports = router;