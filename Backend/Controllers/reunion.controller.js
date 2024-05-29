const ConexionBd = require("../database")

exports.getReuniones =(req,res)=>{
    const consulta=
    `
    CALL getReuniones()
    `

    ConexionBd.query(consulta,(err,resultado)=>{
        if(err){
            return res.status(500).json({error:"Error al consultar las reuniones" + err})
        }
        res.status(200).json(resultado)
    })
}

exports.createReunion=(req,res)=>{
    const {
        id_organizador_reunion,
        titulo,
        motivo,
        hora_fecha,
        medio_reunion,
        prioridad,
        invitados} = req.body;

    if (!id_organizador_reunion || !titulo || !motivo || !hora_fecha || !medio_reunion || !prioridad || !invitados) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }

    const consulta=
    `
    CALL createReunion(?,?,?,?,?,?,?)
    `

    ConexionBd.query(consulta, [id_organizador_reunion,titulo,motivo,hora_fecha,medio_reunion,prioridad,invitados],(err, resultado)=>{
        if(err){
            return res.status(500).json({error:"Error al crear la reunion" + err})
        }
        res.status(200).json({success:"Creacion de la reunion exitosa"})
    })
}

exports.updateReunion=(req,res)=>{
    const{idReunion} = req.params;

    const {id_organizador_reunion,
            titulo,
            motivo,
            hora_fecha,
            medio_reunion,
            prioridad,
            invitados} = req.body;
    
    if (!idReunion||!id_organizador_reunion || !titulo || !motivo || !hora_fecha || !medio_reunion || !prioridad ) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }
    
    const consulta=
    `
    CALL updateReunion(?,?,?,?,?,?,?)
    `
    ConexionBd.query(consulta,[id_organizador_reunion,titulo,motivo,hora_fecha,medio_reunion,prioridad,idReunion],(err,resultado)=>{
        if(err){
            return res.status(500).json({error: "No se ha logrado actualizar la reunión, intentelo nuevamente " + err})
        }
        res.status(200).json({res: "Se logro actualizar la reunión satisfactoriamente"})
    })
}