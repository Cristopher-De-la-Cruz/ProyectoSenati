const ConexionBd  = require('../database.js');

exports.crearTipoUsuario = (req, res) => {
    const {
        nombre
    } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "Ingresa nombre" });
    }

    const consulta = `
        CALL sp_CrearTipoUsuario(?);
    `;

    ConexionBd.query(consulta, [nombre], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Tipo usuario creado exitosamente" });
    });
};

exports.getTipoUsuarios = (req, res) => {
    const consulta = `CALL sp_VisualizarTiposUsuarios()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};

exports.updateTipoUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "Ingresa nombre" });
    }

    const consulta = `
        CALL sp_EditarTipoUsuario(?, ?);
    `;

    ConexionBd.query(consulta, [id, nombre], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Tipo usuario actualizado exitosamente" });
    });
};
