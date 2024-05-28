const ConexionBd  = require('../database.js');

exports.crearCliente = (req, res) => {
    const {
        nombre,
        telefono_contacto,
        estado_cliente,
        correo_electronico,
        tipo_cliente,
        identificador,
        nombre_contacto_apellido,
        direccion
    } = req.body;

    if (!nombre || !telefono_contacto || estado_cliente === undefined || !correo_electronico || !tipo_cliente || !identificador || !nombre_contacto_apellido || !direccion) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_CrearCliente(?,?,?,?,?,?,?,?);
    `;

    ConexionBd.query(consulta, [nombre, telefono_contacto, estado_cliente, correo_electronico, tipo_cliente, identificador, nombre_contacto_apellido, direccion], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Cliente creado exitosamente" });
    });
};

exports.getClientes = (req, res) => {
    const consulta = `CALL sp_ObtenerClientes()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};

exports.updateCliente = (req, res) => {
    const { id_cliente } = req.params;
    const { nombre, telefono_contacto, correo_electronico, identificador, nombre_contacto_apellido, direccion } = req.body;

    if (!nombre || !telefono_contacto || !correo_electronico || !identificador || !nombre_contacto_apellido || !direccion || !id_cliente) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_ActualizarCliente(?, ?, ?, ?, ?, ?, ?);
    `;

    ConexionBd.query(consulta, [id_cliente, nombre, telefono_contacto, correo_electronico, identificador, nombre_contacto_apellido, direccion], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Cliente actualizado exitosamente" });
    });
};

exports.activarInactivarCliente = (req, res) => {
    const {id_cliente} = req.params;

    if(!id_cliente){
        return res.status(400).json({error: "ingrese el id cliente"});
    }
    
    const consulta = `
        CALL sp_ActivarInactivarCliente(?);
    `;

    ConexionBd.query(consulta, [id_cliente], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json({success: "Estado Cliente Cambiado"})
    })

}

exports.filtrarClientesPorEstado = (req, res) => {
    const {estado_cliente} = req.body;
    
    if (estado_cliente === null || estado_cliente === undefined) {
        return res.status(400).json({ error: "Ingresa el estado cliente" });
    }

    const consulta = `
        CALL sp_FiltrarClientePorEstado(?);
    `;

    ConexionBd.query(consulta, [estado_cliente], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}

exports.buscarClientePorId = (req, res) => {
    const {id_cliente} = req.params;

    if(!id_cliente){
        return res.status(400).json({error: "ingrese el id cliente"});
    }

    const consulta = `
        CALL sp_BuscarClientePorId(?);
    `;

    ConexionBd.query(consulta, [id_cliente], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}

exports.buscarClientePorNombre = (req, res) => {
    const {nombre} = req.body;

    if(!nombre){
        return res.status(400).json({error: "ingrese el nombre"});
    }

    const consulta = `
        CALL sp_BuscarClientePorNombre(?);
    `;

    ConexionBd.query(consulta, [nombre], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}

