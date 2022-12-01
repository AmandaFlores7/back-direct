const Pedido = require("../models/pedido");
const Carro = require("../models/carro")
const carroController = require('../controllers/carroController');

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

exports.cambiarEstado = async (req, res) => {
    // try {
    //     console.log('req: ', req.body);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send("hubo un error");
    // }
}