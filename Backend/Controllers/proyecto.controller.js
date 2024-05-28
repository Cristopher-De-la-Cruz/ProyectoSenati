const ConexionBd  = require('../database.js');

exports.crear = (req, res) => {
    const {
        objetivo,
        fecha_inicio,
        fecha_final,
        presupuesto,
        id_contrato,
        descripcion
    } = req.body;

    if (!objetivo || !fecha_inicio || !fecha_final || !presupuesto || !id_contrato || !descripcion) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_CrearProyecto(?,?,?,?,?,?);
    `;

    ConexionBd.query(consulta, [objetivo, fecha_inicio, fecha_final, presupuesto, id_contrato, descripcion], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Proyecto creado exitosamente" });
    });
};

exports.get = (req, res) => {

    const consulta = `CALL sp_VisualizarProyectos()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};


exports.update = (req, res) => {
    const { id } = req.params;
    const { objetivo,
        fecha_inicio,
        fecha_final,
        presupuesto,
        id_contrato,
        descripcion} = req.body;

        if (!objetivo || !fecha_inicio || !fecha_final || !presupuesto || !id_contrato || !descripcion) {
            return res.status(400).json({ error: "Ingresa todos los datos" });
        }

    const consulta = `
        CALL sp_EditarProyecto(?, ?, ?, ?, ?, ?, ?);
    `;

    ConexionBd.query(consulta, [id, objetivo, fecha_inicio, fecha_final, presupuesto, id_contrato, descripcion], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Proyecto actualizado exitosamente" });
    });
};

exports.activarInactivar = (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error: "ingrese el id"});
    }
    
    const consulta = `
        CALL sp_ActivarInactivarProyecto(?);
    `;

    ConexionBd.query(consulta, [id], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json({success: "Estado del Proyecto Cambiado"})
    })

}

exports.filtrarPorEstado = (req, res) => {
    const {estado_proyecto} = req.body;
    
    if (estado_proyecto === null || estado_proyecto === undefined) {
        return res.status(400).json({ error: "Ingresa el estado" });
    }

    const consulta = `
        CALL sp_FiltrarProyectoPorEstado(?);
    `;

    ConexionBd.query(consulta, [estado_proyecto], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}
