const Categoria = require("../models/categoria");
const Item = require("../models/Item");

exports.obtenerCategorias = async (req, res) => {
    let docs = await Categoria.aggregate([{
        $unwind: {
            path: '$categoria'
        }
    }, {
        $group: {
            _id: '$categoria'
        }
    }]);
    let listaCat = [];
    docs.forEach(docs => {
        listaCat.push(docs._id)
    });
    res.send(listaCat);
}

exports.obtenerSubCategorias = async (req, res) => {
    let docs = await Categoria.aggregate([{
        $unwind: {
            path: '$subcategoria'
        }
    }]);
    let listaSubCat = new Array();
    for (let i = 0; i < docs.length; i++) {
        listaSubCat[i] = '[' + docs[i].categoria + ', ' + docs[i].subcategoria + ']'
    }

    res.send(listaSubCat);
}

exports.crearSubcategoria = async (req, res) => {
    try {
        let subcategoria = req.body.subcategoria;
        let categoria = req.body.categoria;
        let sc;
        let docs = await Categoria.aggregate([{
            $unwind: {
                path: '$subcategoria'
            }
        }, {
            $match: {
                subcategoria: subcategoria
            }
        }]);
        if (docs.length == 0) {
            sc = await Categoria.updateOne({ categoria: categoria },
                { $push: { subcategoria: subcategoria } });
            res.json(sc);
        }
        else {
            res.status(404).json({ msg: 'Ya existe subcategoria' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.modificarSubcategoria = async (req, res) => {
    try {
        let subcategoria = req.body.subcategoria;
        let nuevaSc = req.body.nuevaSubcategoria;
        let sc;
        let docs = await Categoria.aggregate([{
            $unwind: {
                path: '$subcategoria'
            }
        }, {
            $match: {
                subcategoria: subcategoria
            }
        }]);
        if (docs.length == 0) {
            res.status(404).json({ msg: 'No existe subcategoria' })
        }
        else {
            let categoria = docs[0].categoria;
            sc = await Categoria.updateOne({ categoria: categoria },
                { $pull: { subcategoria: subcategoria } });
            sc = await Categoria.updateOne({ categoria: categoria },
                { $push: { subcategoria: nuevaSc } });
            res.json(sc);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}