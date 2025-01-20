require('dotenv').config(); // Carga las variables de entorno

const express = require('express');
const pool = require('./src/config/postgres'); // Importar la configuración de la base de datos
const cors = require('cors');
const cortesRoutes = require('./src/routes/corte.router')
const permisosRoutes = require('./src/routes/permiso.router')

const app = express();

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());

//Rutas
app.use('/cortes', cortesRoutes);
app.use('/permisos', permisosRoutes);


// Puerto
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
