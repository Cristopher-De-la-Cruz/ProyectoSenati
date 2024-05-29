const ConexionBd  = require('../database.js');

exports.crear = (req, res) => {
    const {
        id_proyecto,
        titulo_actividad,
        descripcion_actividad,
        presupuesto
    } = req.body;

    if (!id_proyecto || !titulo_actividad || !descripcion_actividad || !presupuesto) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_CrearActividad(?,?,?,?);
    `;

    ConexionBd.query(consulta, [id_proyecto, titulo_actividad, descripcion_actividad, presupuesto], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Actividad creado exitosamente" });
    });
};

exports.get = (req, res) => {

    const consulta = `CALL sp_VisualizarActividades()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};


exports.update = (req, res) => {
    const { id } = req.params;
    const { id_proyecto,
        titulo_actividad,
        descripcion_actividad,
        presupuesto} = req.body;

        if (!id_proyecto || !titulo_actividad || !descripcion_actividad || !presupuesto) {
            return res.status(400).json({ error: "Ingresa todos los datos" });
        }

    const consulta = `
        CALL sp_EditarActividad(?, ?, ?, ?, ?);
    `;

    ConexionBd.query(consulta, [id, id_proyecto, titulo_actividad, descripcion_actividad, presupuesto], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Actividad actualizado exitosamente" });
    });
};

exports.activarInactivar = (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error: "ingrese el id"});
    }
    
    const consulta = `
        CALL sp_ActivarInactivarActividad(?);
    `;

    ConexionBd.query(consulta, [id], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json({success: "Estado de la Actividad Cambiado"})
    })

}

exports.filtrarPorEstado = (req, res) => {
    const {estado_actividad} = req.body;
    
    if (estado_actividad === null || estado_actividad === undefined) {
        return res.status(400).json({ error: "Ingresa el estado" });
    }

    const consulta = `
        CALL sp_FiltrarActividadesPorEstado(?);
    `;

    ConexionBd.query(consulta, [estado_actividad], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}

exports.filtratPorProyecto = (req, res) => {
    const {id_proyecto} = req.body;

    const consulta = `CALL sp_FiltrarActividadesPorProyecto(?);`;

    ConexionBd.query(consulta, [id_proyecto], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}
