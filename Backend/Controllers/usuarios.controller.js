const ConexionBd  = require('../database.js');

exports.crearUsuario = (req, res) => {
    const {
        nombre,
        email,
        password,
        tipo_usuario
    } = req.body;

    if (!nombre || !email || !password || !tipo_usuario) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_CrearUsuario(?,?,?,?);
    `;

    ConexionBd.query(consulta, [nombre, email, password, tipo_usuario], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Usuario creado exitosamente" });
    });
};

exports.getUsuarios = (req, res) => {
    const consulta = `CALL sp_VisualizarUsuarios()`;

    ConexionBd.query(consulta, (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json(result[0]);
    });
};

exports.updateUsuario = (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, email, password} = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta = `
        CALL sp_EditarUsuario(?, ?, ?, ?);
    `;

    ConexionBd.query(consulta, [id_usuario, nombre, email, password], (err, result, fields) => {
        if (err) {
            return res.status(500).json({ error: "Error ejecutando la consulta: " + err });
        }
        res.status(200).json({ success: "Usuario actualizado exitosamente" });
    });
};

exports.activarInactivarUsuario = (req, res) => {
    const {id_usuario} = req.params;

    if(!id_usuario){
        return res.status(400).json({error: "ingrese el id usuario"});
    }
    
    const consulta = `
        CALL sp_ActivarInactivarUsuario(?);
    `;

    ConexionBd.query(consulta, [id_usuario], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json({success: "Estado Usuario Cambiado"})
    })

}

exports.filtrarUsuariosPorEstado = (req, res) => {
    const {estado} = req.body;
    
    if (estado === null || estado === undefined) {
        return res.status(400).json({ error: "Ingresa el estado" });
    }

    const consulta = `
        CALL sp_FiltrarUsuariosPorEstado(?);
    `;

    ConexionBd.query(consulta, [estado], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}

/*
exports.buscarUsuarioPorId = (req, res) => {
    const {id_usuario} = req.params;

    if(!id_usuario){
        return res.status(400).json({error: "ingrese el id"});
    }

    const consulta = `
        CALL sp_BuscarClientePorId(?);
    `;

    ConexionBd.query(consulta, [id_usuario], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}
*/

exports.buscarUsuarioPorNombre = (req, res) => {
    const {nombre} = req.body;

    if(!nombre){
        return res.status(400).json({error: "ingrese el nombre"});
    }

    const consulta = `
        CALL sp_BuscarUsuarioPorNombre(?);
    `;

    ConexionBd.query(consulta, [nombre], (err, result, fields) => {
        if(err){
            return res.status(500).json({error: "Error ejecutando la consulta: " + err});
        }
        res.status(200).json(result[0]);
    })
}

