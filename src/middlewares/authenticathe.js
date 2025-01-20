const jwt = require('jsonwebtoken');

// Middleware para proteger las rutas que requieren autenticación
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Obtener el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'No autorizado. Token requerido' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;  // Guardar la información del usuario en la solicitud
    next();  // Continuar con la solicitud
  });
};

module.exports = authenticate;
