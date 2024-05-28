const { Router } = require("express")
const router = Router()
//const alumnosController = require('../Controllers/alumnos.controller');
const clientesController = require('../Controllers/clientes.controller');
module.exports = () =>{
    /*
    router.post('/alumnos/crear', alumnosController.crearCliente)
    router.get('/alumnos/buscar/:dni', alumnosController.getAlumnoByDni)
    router.put('/alumnos/update/:dni', alumnosController.updateCliente)
    */
    //CLIENTES
    router.post('/clientes/crear', clientesController.crearCliente );
    router.get('/clientes/get', clientesController.getClientes );
    router.put('/clientes/update/:id_cliente', clientesController.updateCliente );
    return router
}