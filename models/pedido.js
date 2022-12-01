const mongoose = require('mongoose');
const CarroSchema = require("../models/carro");
const Schema = mongoose.Schema;

var PedidoSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    carro: {
        type: [{}],
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: String,
        require: true
    },
    mesa: {
        type: Number,
        require: true
    }
});

//Export the model
module.exports = mongoose.model('Pedido', PedidoSchema);