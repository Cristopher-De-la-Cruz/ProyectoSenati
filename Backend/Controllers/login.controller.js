const ConexionBd = require("../database")

exports.loginValidate=(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:"ingresa todos los datos"})
    }
    consulta=
    `
    CALL CheckLogin(?, ?, @result)
    `
    ConexionBd(consulta,[email,password],(err,result)=>{
        if(err){
            return res.status(500).json({error:"Error en la consulta: "+err})
        }
        ConexionBd.query('Select @results AS result',(err,result)=>{
            if (err) {
                return res.status(500).json({ error: "Error en la consulta: " + err });
            }
            const userId = result[0].result;

            if (userId > 0) {
                req.session.loggedin = true;
                req.session.userId = userId;
                req.session.email = email;

                res.redirect('/dashboard');
            } else {
                res.status(401).json({ error: "Correo electrónico o contraseña incorrectos" });
            }
        })
       
    })
}