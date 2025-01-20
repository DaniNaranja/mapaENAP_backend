const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables de entorno

// Crear un pool de conexiones
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Probar la conexión
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err.stack);
  } else {
    console.log('Conexión exitosa a PostgreSQL');
  }
});

module.exports = pool; // Exporta el pool para usarlo en otros archivos
