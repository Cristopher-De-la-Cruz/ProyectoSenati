const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
// Ejemplo de ruta
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: '¡Hola desde el backend!' });
});


// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
