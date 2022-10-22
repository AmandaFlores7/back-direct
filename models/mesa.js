const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var mesaSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    numeroMesa: {
        type: Number,
        required: true,
        unique: true,
    }
});

//Export the model
module.exports = mongoose.model('Mesa', mesaSchema);