const pool = require("../config/postgres");
const enviarCorreo = require('../config/mailer'); // Importamos la función para enviar correos


const getPermisosGrifos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM permisos_grifos");
        
        // Verificar si no hay permisos
        if (result.rows.length === 0) {
          return res.status(200).json({ message: "No hay permisos de uso de grifos registrados en este momento." });
        }
    
        // Si hay permisos, devolver los datos
        res.status(200).json(result.rows);
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
        res.status(500).json({ error: "Error al obtener los datos desde DB" });
      }
};

const createPermisoGrifo = async (req, res) => {
    const { tipo, fecha, solicitante, numero_grifo, inicio, termino, latitud, longitud, motivo, email, estado } =
      req.body;
    try {
      const result = await pool.query(
        "INSERT INTO permisos_grifos (tipo, fecha, solicitante, numero_grifo, inicio, termino, latitud, longitud, motivo, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [tipo, fecha, solicitante, numero_grifo, inicio, termino, latitud, longitud, motivo, email]
      );

      await enviarCorreo(
        'naranjafuneke@gmail.com', //Buscar correo area distribucion emergencias
        'Nueva solicitud de uso de grifo registrada',
        `<img src="https://iili.io/2tXgM7V.png" style="width: 200px;"/>
        <p>Se ha creado una nueva solicitud de uso de grifo por ${solicitante}.</p>
        <p><strong>Nro Grifo:</strong> ${numero_grifo}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>`
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error al registrar el permiso:", error);
      res.status(500).json({ error: "Error al registrar permiso en DB" });
    }
  };

  const updatePermisoGrifo = async (req, res) => {
    const { id } = req.params;
    const {
      tipo, 
      fecha, 
      solicitante, 
      numero_grifo, 
      inicio, 
      termino, 
      latitud, 
      longitud, 
      motivo, 
      email, 
      estado
    } = req.body;

    try {
        // Obtener el permiso actual antes de actualizar
        const permisoActual = await pool.query("SELECT email, estado FROM permisos_grifos WHERE id = $1", [id]);

        if (permisoActual.rows.length === 0) {
            return res.status(404).json({ error: "Permiso de uso de grifo no encontrado" });
        }

        const { email: correoUsuario, estado: estadoActual } = permisoActual.rows[0];

        // Actualizar el permiso en la base de datos
        const result = await pool.query(
            "UPDATE permisos_grifos SET tipo = $1, fecha = $2, solicitante = $3, numero_grifo = $4, inicio = $5, termino = $6, latitud = $7, longitud = $8, motivo = $9, email = $10, estado = $11 WHERE id = $12",
            [tipo, fecha, solicitante, numero_grifo, inicio, termino, latitud, longitud, motivo, email, estado, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Solicitud de uso de grifo no encontrado" });
        }

        // Enviar correo solo si el estado cambió
        if (estado && estado !== estadoActual) {
            await enviarCorreo(
                correoUsuario,
                "Permiso uso de grifo actualizado",
                `<img src="https://iili.io/2tXgM7V.png" style="width: 200px;"/>
                <p>Hola ${solicitante},</p>
                <p>Su permiso de uso de grifo ha sido <strong>${estado}</strong>.</p>
                <p><strong>Numero grifo:</strong> ${numero_grifo}</p>
                <p><strong>Motivo:</strong> ${motivo}</p>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p>Saludos,</p>
                <p>Brigada respuesta a emergencias ENAP.</p>`
            );
        }

        res.status(200).json({ message: "Solicitud de uso de grifo actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la información del permiso de uso de grifos:", error);
        res.status(500).json({ error: "Error al actualizar el permiso" });
    }
};

  

const deletePermisoGrifo = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM permisos_grifos WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Permiso de uso de grifo no encontrado' });
      }
      res.status(200).json({ message: 'Permiso de uso de grifo eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el permiso:', error);
      res.status(500).json({ error: 'Error al eliminar el permiso' });
    }
  };

  module.exports = { getPermisosGrifos, createPermisoGrifo, updatePermisoGrifo, deletePermisoGrifo };