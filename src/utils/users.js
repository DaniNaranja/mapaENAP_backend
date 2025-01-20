// utils/users.js

const bcrypt = require('bcrypt');
const pool = require('../config/postgres'); // Conexión a la base de datos

const crearUsuarioAdmin = async () => {
  const password = 'enap.2025';  // La contraseña que quieres asignar al administrador
  const hashedPassword = await bcrypt.hash(password, 10);  // Cifrado con bcrypt

  try {
    await pool.query(
      `INSERT INTO usuarios (username, password, role)
       VALUES ($1, $2, $3)`,
      ['admin', hashedPassword, 'admin']
    );
    console.log('Usuario administrador creado');
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  }
};

// Exportar la función para que pueda ser utilizada en otros archivos
module.exports = { crearUsuarioAdmin };
