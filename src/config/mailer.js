const nodemailer = require('nodemailer');

// Configurar el transporte SMTP (Ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mapa.enap@gmail.com',  // Cambia esto por tu email
    pass: 'mrou ntkj twnu qbdi',       // Usa una contraseña de aplicación si usas Gmail
  },
});

// Función para enviar correos
const enviarCorreo = async (destinatario, asunto, mensaje) => {
  try {
    await transporter.sendMail({
      from: '"Sistema de Permisos" <mapa.enap@gmail.com>',
      to: destinatario,
      subject: asunto,
      html: mensaje,
    });
    console.log('Correo enviado a:', destinatario);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
};

module.exports = enviarCorreo;
