const ConexionBd  = require('../database.js');

exports.crear = (req, res) => {
    const {
        id_cliente,
        fecha,
        condiciones,
        descripcion,
        precio,
        ruta
    } = req.body;

    if (!id_cliente || !fecha || !condiciones || !descripcion || !precio || !ruta) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_CrearContrato(?,?,?,?,?,?);
    `;

    ConexionBd.query(consulta, [id_cliente, fecha, condiciones, descripcion, precio, ruta], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Contrato creado exitosamente" });
    });
};

exports.get = (req, res) => {

    const consulta = `CALL sp_VisualizarContratos()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};


exports.update = (req, res) => {
    const { id } = req.params;
    const { id_cliente,
        fecha,
        condiciones,
        descripcion,
        precio,
        ruta} = req.body;

        if (!id_cliente || !fecha || !condiciones || !descripcion || !precio || !ruta) {
            return res.status(400).json({ error: "Ingresa todos los datos" });
        }

    const consulta = `CALL sp_EditarContrato(?, ?, ?, ?, ?, ?,?);`;

    ConexionBd.query(consulta, [id, id_cliente, fecha, condiciones, descripcion, precio, ruta], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Contrato actualizado exitosamente" });
    });
};


exports.filtrarPorFecha = (req, res) => {
    const {fecha} = req.body;
    
    if (!fecha) {
        return res.status(400).json({ error: "Ingresa la fecha" });
    }

    const consulta = `
        CALL sp_FiltrarContratosPorFecha(?);
    `;

    ConexionBd.query(consulta, [fecha], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}
