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
    descripcion: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    foto: {
        type: String,
        require: true
    },
    disponibilidad: {
        type: Boolean,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Item', ItemSchema);