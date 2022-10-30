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
    console.log('put:', req.body);
    console.log('put:', req.params);
    try {
        editItem = new Item(req.body);
        idItem = req.params.id;
        
        let item = await Item.findById(idItem);
        if (!item) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        item.nombre = editItem.nombre;
        item.detalle = editItem.detalle;
        item.precio = editItem.precio;
        item.categoria = editItem.categoria;
        item.subcategoria = editItem.subcategoria;
        item.estado = editItem.estado;
        item.foto = editItem.foto;

        item = await Item.findByIdAndUpdate({ _id: req.params.id }, item, { new: item });
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
            res.status(404).json({ msg: 'No existe el producto' })
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
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await Item.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: "item eliimnado" });

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.obtenerSubCategorias = async (req, res) => {
    try {
        let docs = await Item.distinct("subcategoria");
        console.log('docs:', docs);
        res.json(docs);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}