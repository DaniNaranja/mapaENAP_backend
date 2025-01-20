const express = require('express');

const router = express.Router();

router.get('/', getPermisos);
router.post('/', createPermiso);
router.put('/:id', updatePermiso);
router.delete('/:id', deletePermiso);

module.exports = router;