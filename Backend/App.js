const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/Routes')
const router = express.Router();
//import {router} from './routes/Routes'
const cors  = require('cors')
 
 
app.set('port',process.env.PORT || 3000)
app.set('json spaces',2)
 
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(routes());

router.get('/', (req, res) => {
    // Aquí deberías enviar la respuesta adecuada
    res.send('¡Hola, mundo!');
});
 
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
});