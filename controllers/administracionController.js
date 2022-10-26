const Administracion = require("../models/administracion");

exports.ObtenerCredencial = async (req, res) => {
    try {
        const usuario = await Administracion.findOne({email: req.body.email});
        //console.log('usuario:', usuario);
        if (usuario.password != req.body.password) {
            res.status(404).json({ msg: 'Clave incorrecta' })
        }
        else {
            res.json(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

