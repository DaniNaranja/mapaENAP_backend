// index.js

require('dotenv').config(); // Carga las variables de entorno

const express = require('express');
const pool = require('./src/config/postgres'); // Importar la configuración de la base de datos
const cors = require('cors');
const cortesRoutes = require('./src/routes/corte.router');
const permisosRoutes = require('./src/routes/permiso.router');
const loginRoutes = require('./src/routes/login.router');
const { crearUsuarioAdmin } = require('./src/utils/users');  // Importar la función

const app = express();

// Middleware para parsear JSON
app.use(cors({
  origin: 'http://localhost:8080', // Permitir solo solicitudes de esta URL
  methods: ['GET', 'POST'],       // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));
app.use(express.json());


//crearUsuarioAdmin(); // Esto ejecutará la creación del usuario admin

// Rutas
app.use('/login', loginRoutes)
app.use('/cortes', cortesRoutes);
app.use('/permisos', permisosRoutes);

// Puerto
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
