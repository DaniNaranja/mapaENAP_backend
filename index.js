require('dotenv').config(); // Carga las variables de entorno

const express = require('express');
const pool = require('./postgres'); // Importar la configuración de la base de datos

const app = express();

// Middleware para parsear JSON
app.use(express.json());


// Puerto
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
