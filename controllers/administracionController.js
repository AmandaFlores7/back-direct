const Administracion = require("../models/administracion");

exports.ObtenerAdministrador = async (req, res) => {
    try {
        let admin = await Administracion.findOne({email: req.body.email});
        console.log('admin:', admin);
        if (admin.rol != 'administrador') {
            res.status(404).json({ msg: 'Error de credencial' })
        }
        if (admin.password != req.body.password) {
            res.status(404).json({ msg: 'Clave incorrectas' })
        }
        res.json(admin);

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

