const pool = require("../config/postgres");
const enviarCorreo = require('../config/mailer'); // Importamos la función para enviar correos


const getPermisos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM permisos");
        
        // Verificar si no hay permisos
        if (result.rows.length === 0) {
          return res.status(200).json({ message: "No hay permisos registrados en este momento." });
        }
    
        // Si hay permisos, devolver los datos
        res.status(200).json(result.rows);
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
      }
};

const createPermiso = async (req, res) => {
    const { tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion, estado, email } =
      req.body;
    try {
      const result = await pool.query(
        "INSERT INTO permisos (tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
        [tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion, email]
      );

      await enviarCorreo(
        'naranjafuneke@gmail.com', //Buscar correo area distribucion emergencias
        'Nuevo permiso registrado',
        `<p>Se ha creado un nuevo permiso por ${solicitante}.</p>
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>`
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error al registrar el permiso:", error);
      res.status(500).json({ error: "Error al registrar permiso en DB" });
    }
  };

  const updatePermiso = async (req, res) => {
    const { id } = req.params;
    const {
      tipo,
      fecha,
      solicitante,
      email,
      motivo,
      inicio,
      termino,
      calle,
      latitud,
      longitud,
      observacion,
      estado,
    } = req.body;
  
    try {
      // Obtener el correo del usuario antes de actualizar
      const permisoActual = await pool.query("SELECT email FROM permisos WHERE id = $1", [id]);
  
      if (permisoActual.rows.length === 0) {
        return res.status(404).json({ error: "Permiso no encontrado" });
      }
  
      const correoUsuario = permisoActual.rows[0].email;
  
      // Actualizar el permiso en la base de datos
      const result = await pool.query(
        "UPDATE permisos SET tipo = $1, fecha = $2, solicitante = $3, motivo = $4, inicio = $5, termino = $6, calle = $7, latitud = $8, longitud = $9, observacion = $10, estado = $11, email = $12 WHERE id = $13",
        [tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion, estado, email, id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Permiso no encontrado" });
      }
  
      // Enviar correo solo si el estado cambió
      if (estado) {
        await enviarCorreo(
          correoUsuario,
          "Permiso actualizado",
          `<p>Hola ${solicitante},</p>
          <p>Su permiso ha sido <strong>${estado}</strong>.</p>
          <p>Motivo: ${motivo}</p>
          <p>Fecha: ${fecha}</p>
          <p>Saludos,</p>
          <p>Brigada respuesta a emergencias ENAP.</p>`
        );
      }
  
      res.status(200).json({ message: "Permiso actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar la información del permiso:", error);
      res.status(500).json({ error: "Error al actualizar el permiso" });
    }
  };
  

const deletePermiso = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM permisos WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Permiso no encontrado' });
      }
      res.status(200).json({ message: 'Permiso eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el permiso:', error);
      res.status(500).json({ error: 'Error al eliminar el permiso' });
    }
  };

  module.exports = { getPermisos, createPermiso, updatePermiso, deletePermiso };