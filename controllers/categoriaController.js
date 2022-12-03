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
        //console.log('cats:', cats);
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
    console.log('req: ', req);
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
exports.modificarSubcategoria2 = async (req, res) => {
    try {
        nuevaSc = req.body.nuevaSubcategoria;
        let categoria = await Categoria.findById(req.body.categoria_id)
        console.log(categoria);
        actualSubcategoria = req.body.actualSubcategoria
        console.log('sub: ',categoria.subcategoria);
        console.log('actual: ', actualSubcategoria)
        console.log('nueva: ', nuevaSc);
        arregloActual = categoria.subcategoria
        if (!categoria){
            res.status(404).json({ msg: 'No existe la categoria' })
        }
        else {
            let nuevoArreglo = categoria.subcategoria.map((valor, indice, valores) => {
                return valor == actualSubcategoria ? nuevaSc : valor;
            })
            console.log('nuevo array: ', nuevoArreglo);
            console.log('hola: ',categoria.subcategoria);// en el reemplazo poner categoria: variable de la categoria
            categoria = await Categoria.replaceOne({subcategoria: arregloActual}, {subcategoria: nuevoArreglo})
            res.json(categoria)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.modificarSubcategoria = async (req, res) => {
    // console.log('req: ', req);
    try {
        let subcategoria = req.body.subcategoria;
        let categoria = req.body.categoria;
        let flagCategoria = await Categoria.findOne({ categoria: req.body.categoria })
        // if (!flagCategoria) {
        //     res.status(404).json({ msg: 'No existe la categoria' })
        // }
        // else{
        //     let sc;
        //     let docs = await Categoria.aggregate([{
        //         $unwind: {
        //             path: '$subcategoria'
        //         }
        //     }, {
        //         $match: {
        //             subcategoria: subcategoria
        //         }
        //     }]);
        //     if (docs.length == 0) {
        //         sc = await Categoria.updateOne({ categoria: categoria },
        //             { $push: { subcategoria: subcategoria } });
        //         res.json(sc);
        //     }
        //     else {
        //         res.status(404).json({ msg: 'Ya existe subcategoria' })
        //     }
        // }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}