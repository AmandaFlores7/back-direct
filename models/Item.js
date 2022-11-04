const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    detalle: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    subcategoria: {
        type: String,
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    foto: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Item', ItemSchema);