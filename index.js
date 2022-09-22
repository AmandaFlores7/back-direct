const express = require('express');
const conectarDB = require('./config/db');
const { use } = require('./routes/item');
const cors = require("cors");

//create server
const app = express();

//db connect
conectarDB();
app.use(cors());

app.use(express.json());

//
app.use('/api/items', require('./routes/item'));



app.listen(4000, () => {
    console.log('Server corriendo en puerto 4000');
})