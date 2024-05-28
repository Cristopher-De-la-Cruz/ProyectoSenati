const ConexionBd = require('../database.js');
exports.crearCliente = (req,res)=>{
    const { nombre, apellido, curso,  dni} = req.body
    if ( !nombre || !apellido || !curso || !dni) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }
    const consulta =
        `
        CALL sp_crearCliente(?,?,?,?);
        `;
        ConexionBd.query(consulta, [ nombre, apellido, curso, dni], (err, result,fields) => {
            if (err) {
                return res.status(500).json({ error: "Error executing query" + err});
            }
            res.status(200).json({ success: "Alumno creado exitosamente" });
        }
    )
}


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