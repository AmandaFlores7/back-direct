const Carro = require("../models/carro");
const Item = require("../models/Item");
var mongoose = require('mongoose');

exports.crearCarro = async (req, res) => {
    try {
        let carro;
        carro = new Carro(req.body);
        await carro.save();
        res.send(carro);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}
exports.actualizarCarro = async (req, res) => {
    console.log('put:', req.body);
    console.log('put:', req.params);
    try {
        editCarro = new Carro(req.body);
        idCarro = req.params.id;
        
        let carro = await Item.findById(idCarro);
        if (!carro) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        carro.nombre = editCarro.nombre;
        carro.detalle = editCarro.detalle;
        carro.precio = editCarro.precio;
        carro.categoria = editCarro.categoria;
        carro.subcategoria = editCarro.subcategoria;
        carro.estado = editCarro.estado;
        carro.foto = editCarro.foto;

        carro = await carro.findByIdAndUpdate({ _id: req.params.id }, carro, { new: carro });
        res.json(carro);

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.obtenerCarros = async (req, res) => {
    try {
        const carros = await Carro.find();
        res.json(carros);
        //console.log('carros:', carros);

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.obtenerCarro = async (req, res) => {
    try {
        let carro = await Carro.findById(req.params.id);

        if (!carro) {
            res.status(404).json({ msg: 'No existe el carro' })
        }

        res.json(carro);


    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.agregarItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.idItem);
        let carro = await Carro.findById(req.params.idCarro);

        if (!item || !carro) {
            res.status(404).json({ msg: 'No existe el elemento' })
        }
        let carroTotalPrev = carro.total;
        let newPrecio = item.precio;
        let total = carroTotalPrev + newPrecio;

        item = JSON.parse(JSON.stringify(item));

        //creamos un id virtualcito

        item['_id'] = new mongoose.mongo.ObjectId(item._id);
        item['carroItemId'] = mongoose.Types.ObjectId();


        carro = await Carro.updateOne({ _id: req.params.idCarro },
            { $push: { carroItems: item } });

        carro.total = total;
        carro = await Carro.findByIdAndUpdate({ _id: req.params.idCarro }, carro, { new: carro });
        res.json(carro);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.eliminarItem = async (req, res) => { //prbar aun
    try {
        let item = await Item.findById(req.params.idItem);
        let carro = await Carro.findById(req.params.idCarro);

        if (!item || !carro) {
            res.status(404).json({ msg: 'No existe el elemento' })
        }
        let carroTotalPrev = carro.total;
        let precioItem = item.precio;
        let total = carroTotalPrev - precioItem;

        const carroItemObjId = new mongoose.mongo.ObjectId(req.params.idCarroItem);

        carro = await Carro.updateOne(
            { _id: req.params.idCarro },
            {
                $pull:
                {
                    carroItems: { carroItemId: carroItemObjId },
                }
            });

        res.json(carro.modifiedCount);

        if (carro.modifiedCount > 0) {
            console.log('se modifico po');
            carro.total = total;
            carro = await Carro.findByIdAndUpdate({ _id: req.params.idCarro }, carro, { new: carro });
        }
        else {
            console.log('no paso na pu');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.obtenerCantidad = async (req, res) => {
    try {
        console.log(req.params.idCarro);
        const carroObjId = new mongoose.mongo.ObjectId(req.params.idCarro);
        console.log(carroObjId);
        let docs = await Carro.aggregate([
            {
                $match: {
                    _id: carroObjId
                }
            },
            {
                $unwind: {
                    path: '$carroItems'
                }
            }, {
                $group: {
                    _id: '$carroItems._id',
                    count: {
                        $sum: 1
                    }
                }
            }]);

        console.log(docs);

        res.json(docs);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}