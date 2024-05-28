const ConexionBd  = require('../database.js');

exports.crear = (req, res) => {
    const {
        id_cliente,
        id_usuario,
        asunto,
        descripcion,
        prioridad
    } = req.body;

    if (!id_cliente || !id_usuario || !asunto || !descripcion || !prioridad) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_CrearAtencionCliente(?,?,?,?,?);
    `;

    ConexionBd.query(consulta, [id_cliente, id_usuario, asunto, descripcion, prioridad], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Registro creado exitosamente" });
    });
};

exports.get = (req, res) => {
    let { id_cliente, id_usuario } = req.body;

    // Asegurarse de que los valores sean null si no están presentes
    if (id_cliente === undefined) {
        id_cliente = null;
    }
    if (id_usuario === undefined) {
        id_usuario = null;
    }

    // Preparar la consulta SQL con los parámetros correspondientes
    const consulta = `CALL sp_VisualizarAtencionCliente(?, ?)`;

    // Ejecutar la consulta
    ConexionBd.query(consulta, [id_cliente, id_usuario], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};


exports.update = (req, res) => {
    const { id } = req.params;
    const { id_cliente,
        id_usuario,
        asunto,
        descripcion,
        prioridad} = req.body;

    if (!id_cliente || !id_usuario || !asunto || !descripcion || !prioridad) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_EditarAtencionCliente(?, ?, ?, ?, ?, ?);
    `;

    ConexionBd.query(consulta, [id, id_cliente, id_usuario, asunto, descripcion, prioridad], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Registro actualizado exitosamente" });
    });
};

exports.activarInactivar = (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error: "ingrese el id"});
    }
    
    const consulta = `
        CALL sp_ActivarInactivarAtencionCliente(?);
    `;

    ConexionBd.query(consulta, [id], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json({success: "Estado Registro Cambiado"})
    })

}

exports.filtrarPorEstado = (req, res) => {
    const {estado_ticket} = req.body;
    
    if (estado_ticket === null || estado_ticket === undefined) {
        return res.status(400).json({ error: "Ingresa el estado" });
    }

    const consulta = `
        CALL sp_FiltrarAtencionClientePorEstado(?);
    `;

    ConexionBd.query(consulta, [estado_ticket], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}
