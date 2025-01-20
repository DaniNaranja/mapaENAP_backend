const express = require('express');
const { 
  login
} = require('../controller/login.controller');

const router = express.Router();

// Ruta autentificacion           
router.post('/', login);            


module.exports = router;
