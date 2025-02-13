const pool = require("../config/postgres");

const getUsosGrifos = async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM usos_grifos");

      
      
      // Verificar si no hay cortes
      if (result.rows.length === 0) {
        return res.status(200).json({ message: "No hay usos de grifos registrados en este momento." });
      }
  
      // Si hay cortes, devolver los datos
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error al obtener los grifos en uso:", error);
      res.status(500).json({ error: "Error al obtener los grifos en uso" });
    }
  };

const createUsoGrifo = async (req, res) => {
  const { numero_grifo, tipo, latitud, longitud, inicio, termino, motivo } =
    req.body;
  try {
    const result = await pool.query(
      "INSERT INTO usos_grifos (numero_grifo, tipo, latitud, longitud, inicio, termino, motivo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [numero_grifo, tipo, latitud, longitud, inicio, termino, motivo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al registrar el uso de grifo:", error);
    res.status(500).json({ error: "Error al registrar uso de grifo en DB" });
  }
};

const updateUsoGrifo = async (req, res) => {
    const { id } = req.params;
    const { numero_grifo, tipo, latitud, longitud, inicio, termino, motivo }= req.body;
    try {
        const result = await pool.query(
            'UPDATE usos_grifos SET numero_grifo = $1, tipo = $2, latitud = $3, longitud = $4, inicio = $5, termino = $6, motivo = $7 WHERE id= $8',
            [numero_grifo, tipo, latitud, longitud, inicio, termino, motivo, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({error: 'Uso de grifo no encontrado'});
        }
        res.status(200).json({ message: 'Uso de grifo actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar la informacion del uso de grifo:', error);
        res.status(500).json({error: 'Error al actualizar el uso de grifo'});
    }
}

const deleteUsoGrifo = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM usos_grifos WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Uso de grifo no encontrado' });
      }
      res.status(200).json({ message: 'Uso de grifo eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el uso de grifo:', error);
      res.status(500).json({ error: 'Error al eliminar el uso de grifo' });
    }
  };

  module.exports = { getUsosGrifos, createUsoGrifo, updateUsoGrifo, deleteUsoGrifo };
