const Pedido = require("../models/pedido");
const Carro = require("../models/carro")
const carroController = require('../controllers/carroController');

//Se crea un nuevo pedido, en donde cambia el estado del pedido
exports.crearPedido = async (req, res) => {
    console.log('req:', req.body);
    try {
        let elemento = req.body;
        let carro = new Carro(req.body);
        console.log('carro:', carro);
        let pedido = new Pedido();
        pedido.carro = carro;
        pedido.estado = 'preparacion';
        pedido.mesa = carro.mesa;
        console.log('pedido: ', pedido);
        await pedido.save();
        res.send(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//Permite obtener todos los pedidos de la base de datos
exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        if (pedidos) {
            res.json(pedidos);
        }
        else{
            res.status(500).send("No existen pedidos");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//Permite cambiar los estados de los pedidos
exports.cerrarPedido = async (req, res) => {
    try {
        let pedido = req.body;
        let doc = await Pedido.findById(pedido._id);
        if (!doc) {
            res.status(404).json({ msg: 'No existe el pedido' })
        }
        if (doc.estado == 'listo') {
            res.status(404).json({ msg: 'No existe el pedido' })
        }
        doc.estado = 'listo';
        doc = await Pedido.findByIdAndUpdate({_id: pedido._id}, doc, {new: doc});
        res.json({ msg: "Pedido listo" });
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}