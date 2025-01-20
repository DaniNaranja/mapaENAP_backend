const pool = require("../config/postgres");

const getCortes = async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM cortes");
      
      // Verificar si no hay cortes
      if (result.rows.length === 0) {
        return res.status(200).json({ message: "No hay cortes disponibles en este momento." });
      }
  
      // Si hay cortes, devolver los datos
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error al obtener los cortes:", error);
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  };

const createCorte = async (req, res) => {
  const { calle, latitud, longitud, estado, inicio, termino, motivo } =
    req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cortes (calle, latitud, longitud, estado, inicio, termino, motivo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [calle, latitud, longitud, estado, inicio, termino, motivo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al registrar el corte:", error);
    res.status(500).json({ error: "Error al registrar corte en DB" });
  }
};

const updateCorte = async (req, res) => {
    const { id } = req.params;
    const { calle, latitud, longitud, estado, inicio, termino, motivo }= req.body;
    try {
        const result = await pool.query(
            'UPDATE cortes SET calle = $1, latitud = $2, longitud = $3, estado = $4, inicio = $5, termino = $6, motivo = $7 WHERE id= $8',
            [calle, latitud, longitud, estado, inicio, termino, motivo, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({error: 'Corte no encontrado'});
        }
        res.status(200).json({ message: 'Corte actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar la informacion del corte:', error);
        res.status(500).json({error: 'Error al actualizar el corte'});
    }
}

const deleteCorte = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM cortes WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Corte no encontrado' });
      }
      res.status(200).json({ message: 'Corte eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el corte:', error);
      res.status(500).json({ error: 'Error al eliminar el corte' });
    }
  };

  module.exports = { getCortes, createCorte, updateCorte, deleteCorte };
