const ConexionBd = require('../database.js');

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

exports.crearCliente_secondVer = (req, res) =>{
    const nuevoCliente = {
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

    ConexionBd.create('usuarios', nuevoCliente).then((err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Cliente creado exitosamente" });
      });
}

exports.getClientes = (req, res) => {
    const consulta = `CALL sp_ObtenerClientes()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]); // Suponiendo que el resultado es un array de objetos, se envía el primer elemento
    });
};

exports.updateCliente = (req, res) => {
    const { id_cliente } = req.params;
    const { nombre, telefono_contacto, estado_cliente, correo_electronico, identificador, nombre_contacto_apellido, direccion } = req.body;

    if (!nombre || !telefono_contacto || !estado_cliente || !correo_electronico || !identificador || !nombre_contacto_apellido || !direccion || !id_cliente) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_ActualizarCliente(?, ?, ?, ?, ?, ?, ?, ?);
    `;

    ConexionBd.query(consulta, [id_cliente, nombre, telefono_contacto, estado_cliente, correo_electronico, identificador, nombre_contacto_apellido, direccion], (err, result, fields) => {
        if (err) {
            return req.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Cliente actualizado exitosamente" });
    });
};

/*
exports.getAlumnoByDni = (req,res)=>{
    const {dni} =req.params
    if ( !dni) {
        return res.status(400).json({ error: "Ingresa el dato a listar" });
    }
    const consulta =
    `
    CALL sp_listarClientesIndividual(?);
    `
    ConexionBd.query(consulta,[dni],(err,result,field)=>{
        if(err){
            return req.status(500).json({error: "Error executing query" + err})
        }else{
            res.json(result)
        }
    })
}

    exports.updateCliente=(req,res)=>{
        const { dni } =req.params
        const { nombre, apellido, curso, codigoqr } = req.body
        if ( !nombre || !apellido || !curso || !codigoqr || !dni) {
            return res.status(400).json({ error: "Ingresa todos los datos" });
        }
        const consulta =
            `
            CALL sp_actualizarCliente(?,?,?,?,?);
            `;
        ConexionBd.query(consulta,[nombre,apellido,curso,codigoqr,dni],(err,result,field)=>{
            if(err){
                return req.status(500).json({error: "Error executing query" + err})
            }            
            res.status(200).json({ success: "Alumno actualizado exitosamente" });

        })    
    }
*/