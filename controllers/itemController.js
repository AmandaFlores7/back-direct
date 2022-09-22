const Item = require("../models/Item");

exports.crearItem = async (req, res) => {
    try {
        let item;
        item = new Item(req.body);
        await item.save();
        res.send(item);

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.obtenerItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
        

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.actualizarItem = async (req, res) => {
    try {
        const {nombre, descripcion, precio, tipo, foto, disponibilidad} = req.body;
        let item = await Item.findById(req.params.id);

        if (!item) {
            res.status(404).json({msg: 'No existe el producto'})
        }
        item.nombre = nombre;
        item.descripcion = descripcion;
        item.precio = precio;
        item.tipo = tipo;
        item.disponibilidad = disponibilidad;
        item.foto = foto;

        item = await Item.findByIdAndUpdate({_id: req.params.id}, item, {new: item});
        res.json(item);

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.obtenerItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) {
            res.status(404).json({msg: 'No existe el producto'})
        }

        res.json(item);
        

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.eliminarItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) {
            res.status(404).json({msg: 'No existe el producto'})
        }

        await Item.findByIdAndRemove({_id: req.params.id});
        res.json({msg: "item eliimnado"});
        

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}