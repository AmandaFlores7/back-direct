const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var administracionSchema = new mongoose.Schema({
    nombres:{
        type:String,
        required:true,
        unique:false
    },
    apellidos: {
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    telefono:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    rol: {
        type:String,
        required:true
    },
    rut: {
        type:String,
        required:true,
        unique:true
    }
});

//Export the model
module.exports = mongoose.model('Administracion', administracionSchema);