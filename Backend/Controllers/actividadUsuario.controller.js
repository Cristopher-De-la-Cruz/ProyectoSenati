const ConexionBd  = require('../database.js');

exports.crear = (req, res) => {
    const {
        id_actividad,
        id_usuario
    } = req.body;

    if (!id_actividad || !id_usuario) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_CrearActividadUsuario(?,?);
    `;

    ConexionBd.query(consulta, [id_actividad, id_usuario], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Registro creado exitosamente" });
    });
};

exports.get = (req, res) => {

    const consulta = `CALL sp_VisualizarActividadUsuarios()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};


exports.update = (req, res) => {
    const { id } = req.params;
    const { id_actividad,
        id_usuario} = req.body;

        if (!id_actividad || !id_usuario) {
            return res.status(400).json({ error: "Ingresa todos los datos" });
        }

    const consulta = `
        CALL sp_EditarActividadUsuario(?, ?, ?);
    `;

    ConexionBd.query(consulta, [id, id_actividad, id_usuario], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Registro actualizado exitosamente" });
    });
};
