const { Router } = require("express")
const router = Router()
//const alumnosController = require('../Controllers/alumnos.controller');
const clientesController = require('../Controllers/clientes.controller');
const tipoUsuariosController = require('../Controllers/tipousuario.controller');
const usuariosController = require('../Controllers/usuarios.controller');
const atencionClienteController = require('../Controllers/atencionCliente.controller');
const contratoController = require('../Controllers/contrato.controller');
const proyectoController = require('../Controllers/proyecto.controller');

module.exports = () =>{
    //TIPO USUARIOS
    router.post('/tipo_usuarios/crear', tipoUsuariosController.crearTipoUsuario );
    router.get('/tipo_usuarios/get', tipoUsuariosController.getTipoUsuarios );
    router.put('/tipo_usuarios/update/:id', tipoUsuariosController.updateTipoUsuario );

    //USUARIOS
    router.post('/usuarios/crear', usuariosController.crearUsuario );
    router.get('/usuarios/get', usuariosController.getUsuarios );
    router.put('/usuarios/update/:id_usuario', usuariosController.updateUsuario );
    router.put('/usuarios/activar_inactivar/:id_usuario', usuariosController.activarInactivarUsuario );
    router.post('/usuarios/getUsuariosPorEstado', usuariosController.filtrarUsuariosPorEstado );
    //router.get('/usuarios/show/:id_usuario', usuariosController.buscarUsuarioPorId );
    router.get('/usuarios/buscarPorNombre', usuariosController.buscarUsuarioPorNombre );

    //CLIENTES
    router.post('/clientes/crear', clientesController.crearCliente );
    router.get('/clientes/get', clientesController.getClientes );
    router.put('/clientes/update/:id_cliente', clientesController.updateCliente );
    router.put('/clientes/activar_inactivar/:id_cliente', clientesController.activarInactivarCliente );
    router.post('/clientes/getClientePorEstado', clientesController.filtrarClientesPorEstado );
    router.get('/clientes/show/:id_cliente', clientesController.buscarClientePorId );
    router.get('/clientes/buscarPorNombre', clientesController.buscarClientePorNombre );

    //ATENCION AL CLIENTE
    router.post('/atencion_cliente/crear', atencionClienteController.crear );
    router.get('/atencion_cliente/get', atencionClienteController.get );
    router.put('/atencion_cliente/update/:id', atencionClienteController.update );
    router.put('/atencion_cliente/activar_inactivar/:id', atencionClienteController.activarInactivar );
    router.post('/atencion_cliente/getPorEstado', atencionClienteController.filtrarPorEstado );

    //CONTRATOS
    router.post('/contratos/crear', contratoController.crear );
    router.get('/contratos/get', contratoController.get );
    router.put('/contratos/update/:id', contratoController.update );
    router.get('/contratos/filtrarPorFecha', contratoController.filtrarPorFecha );

    //PROYECTOS
    router.post('/proyecto/crear', proyectoController.crear );
    router.get('/proyecto/get', proyectoController.get );
    router.put('/proyecto/update/:id', proyectoController.update );
    router.put('/proyecto/activar_inactivar/:id', proyectoController.activarInactivar );
    router.post('/proyecto/getPorEstado', proyectoController.filtrarPorEstado );

    //ACTIVIDADES
    

    return router
}