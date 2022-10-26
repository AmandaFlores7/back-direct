const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categoriaSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        required: true,
        unique: true,
    },
    subcategoria: {
        type: [],
        required: false,
        unique: true,
    }
});

//Export the model
module.exports = mongoose.model('Categoria', categoriaSchema);