const categoria = require("../models/categoria");
const Categoria = require("../models/categoria");
const Item = require("../models/Item");

//Permite obtener todos las categorias existentes en los productos
exports.obtenerCategorias = async (req, res) => {
    try {
        let docs = await Item.aggregate([{
            $match: {
                estado: {
                    $in: [
                        'no disponible',
                        'disponible'
                    ]
                }
            }
        }, {
            $group: {
                _id: '$categoria',
                subcategoria: {
                    $addToSet: '$subcategoria'
                }
            }
        }]);
        let doc = [];
        //console.log('docs:', docs);
        docs.forEach(function (d) {
            var c = { categoria: d._id, subcategoria: d.subcategoria }
            doc.push(c);
        });
        doc.sort(function (a, b) {
            if (a.categoria < b.categoria) {
                return 1;
            }
            if (a.categoria > b.categoria) {
                return -1;
            }
            return 0;
        });
        //console.log('doc:', doc);
        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//Obtener todas las categorias existentes en la base de datos
exports.obtenerCategoriasTotal = async (req, res) => {
    try {
        const cats = await Categoria.find();
        console.log('cats:', cats);
        res.json(cats);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//Permite obtener todas las sub-categorias existentes 
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

//Permite crear una nueva sub-categoria 
exports.crearSubcategoria = async (req, res) => {
    try {
        let subcategoria = req.body.subcategoria;
        let categoria = req.body.categoria;
        let flagCategoria = await Categoria.findOne({ categoria: req.body.categoria })
        if (!flagCategoria) {
            res.status(404).json({ msg: 'No existe la categoria' })
        }
        else{
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
                sc = await Categoria.findOne({ subcategoria: subcategoria })
                res.json(sc);
            }
            else {
                res.status(404).json({ msg: 'Ya existe subcategoria' })
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//Permite modificar una sub-categoria ya existente
exports.modificarSubcategoria = async (req, res) => {
    try {
        let subcategoria = req.body.subcategoria;
        let categoria = req.body.categoria;
        let subcategoriaNueva = req.body.nuevaSubcat;

        if (await Categoria.find({subcategoria: subcategoriaNueva}) == []) {
            console.log(await Categoria.find({subcategoria: subcategoriaNueva}));
            res.status(404).json({msg: 'Ya existe la subcategoria'});
        }
        else {
            let query_subcat = await Categoria.find({subcategoria: subcategoria});
            let subcats = ((query_subcat[0].subcategoria).filter(element => element != subcategoria));
            subcats.push(subcategoriaNueva);
            let doc = await Categoria.findOneAndUpdate({subcategoria: subcategoria}, {subcategoria:subcats})
            res.send(doc);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.eliminarSubcategoria = async (req, res) => {
    try {
        let subcategoria = req.params.subcat;
        let items = await Item.find({subcategoria:subcategoria});
            console.log('items: ',items.length);
        if (items == []) {
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}