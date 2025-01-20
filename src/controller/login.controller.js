const jwt = require('jsonwebtoken');
const pool = require('../config/postgres'); // Conexión a la base de datos
const bcrypt = require('bcrypt');
require('dotenv').config(); // Cargar variables de entorno

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT usando la clave secreta del .env
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET, // Usar la clave secreta definida en el .env
      { expiresIn: '1h' } // Establecer un tiempo de expiración para el token
    );

    res.status(200).json({ token });  // Retornar el token generado
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { login };
