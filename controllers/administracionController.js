const Administracion = require("../models/administracion");

exports.ObtenerCredencial = async (req, res) => {
    try {
        console.log('req:', req.query.email);
        console.log('req:', req.query.password);
        const usuario = await Administracion.findOne({ email: req.query.email });
        if (usuario) {
            if (usuario.password != req.query.password) {
                res.status(404).json({ msg: 'Clave incorrecta' })
            }
            else {
                res.json(usuario);
            }
        }
        else {
            res.status(404).json({ msg: 'Usuario incorrecto' })
        }


    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

