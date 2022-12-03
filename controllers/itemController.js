const Item = require("../models/Item");

//Permite crear un nuevo item 
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

//Permite obtener todos los items del inventario
exports.obtenerItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//Permite verifica que el item existe, si existe permitirá actualizar un item existente
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

//Permite obtener un item 
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

//Verifica que el item existe, si existe permite eliminarlo
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

//Permite obtener todas las sub-categorias existentes
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

exports.modificarSubcategoriaItem = async (req, res) => {
    try {
        subcategoriaActual = req.body.subcategoriaActual;
        subcategoriaNueva = req.body.subcategoriaNueva;
        let subcategorias = await Item.distinct('subcategoria');
        
        if (subcategorias.includes(subcategoriaActual)) {
            console.log('si');
        }

        // let subcatActual = await Item.find(item => item.subcategoria == subcategoriaActual);
        // let subcatNueva = await Item.find(item => item.subcategoria == subcategoriaNueva);

        // console.log('subcatActual:', subcatActual);
        // console.log('subcatNueva:', subcatNueva);
        

    } catch (error) {
        
    }
}