const mysql = require('mysql2');
const knex = require('knex');

// Configuración de conexión a la base de datos
const connectionBd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdconstrured'
});

// Crear una instancia de Knex
const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bdconstrured'
    }
});

// Verificar conexión
connectionBd.connect(function(err) {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        process.exit(1);
    }
    console.log('Conexión exitosa a la base de datos con el ID:', connectionBd.threadId);
});

// Manejo de errores de conexión
connectionBd.on('error', function(err) {
    console.error('Error de base de datos:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('La conexión a la base de datos fue cerrada inesperadamente');
    } else {
        throw err;
    }
});

// Función para obtener todos los registros de una tabla
async function get(tableName) {
    return await db(tableName);
}

// Función para obtener un registro de una tabla que cumpla ciertas condiciones
async function where(tableName, conditions) {
    return await db(tableName).where(conditions);
}

// Función para obtener el primer registro de una tabla que cumpla ciertas condiciones
async function first(tableName, conditions) {
    return await db(tableName).where(conditions).first();
}

// Función para insertar un nuevo registro en una tabla
async function create(tableName, data) {
    return await db(tableName).insert(data);
}

// Exporta las funciones para usarlas en otros módulos
module.exports = {
    get,
    where,
    first,
    create
};
