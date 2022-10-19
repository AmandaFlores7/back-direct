const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CarroSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    mesa:{
        type:Number,
        required:true,
    },
    carroItems:{
        type:[],
        required:false,
    },
    metodo_pago:{
        type:String,
        required:true,
    },
    f_creacion:{
        type: Date,
        default: Date.now()
    },
    estado:{
        type:String,
        required:true,
    },
    total:{
        type:Number,
        required:false
    }
});

//Export the model
module.exports = mongoose.model('Carro', CarroSchema);