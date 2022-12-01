const express = require('express');
const conectarDB = require('./config/db');
//const { use } = require('./routes/item');
const cors = require("cors");

//create server
const app = express();

//db connect
conectarDB();
app.use(cors());

app.use(express.json());

//
app.use('/api/item', require('./routes/item'));
app.use('/api/carro', require('./routes/carro'));
app.use('/api/categoria', require('./routes/categoria'));
app.use('/api/administracion', require('./routes/administracion'));
app.use('/api/pedido', require('./routes/pedido'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server corriendo en puerto ' + PORT );
})