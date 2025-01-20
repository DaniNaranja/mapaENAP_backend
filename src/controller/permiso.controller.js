const pool = require("../config/postgres");

const getPermisos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM permisos");
        
        // Verificar si no hay cortes
        if (result.rows.length === 0) {
          return res.status(200).json({ message: "No hay permisos registrados en este momento." });
        }
    
        // Si hay cortes, devolver los datos
        res.status(200).json(result.rows);
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
      }
};

const createPermiso = async (req, res) => {
    const { tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion, estado } =
      req.body;
    try {
      const result = await pool.query(
        "INSERT INTO permisos (tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error al registrar el permiso:", error);
      res.status(500).json({ error: "Error al registrar permiso en DB" });
    }
  };

  const updatePermiso = async (req, res) => {
    const { id } = req.params;
    const { tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion, estado } =
      req.body;
    try {
      const result = await pool.query(
        "UPDATE permisos SET tipo = $1, fecha = $2, solicitante = $3, motivo = $4, inicio = $5, termino = $6, calle = $7, latitud = $8, longitud = $9, observacion = $10, estado = $11 WHERE id = $12",
        [tipo, fecha, solicitante, motivo, inicio, termino, calle, latitud, longitud, observacion, estado, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Permiso no encontrado" });
      }
      res.status(200).json({ message: "Permiso actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar la información del permiso:", error);
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