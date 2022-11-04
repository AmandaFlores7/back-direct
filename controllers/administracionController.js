const Administracion = require("../models/administracion");

const jwt = require('jsonwebtoken');
const { restart } = require("nodemon");

exports.ObtenerCredencial = async (req, res) => {
    try {
        console.log('req:', req.query.email);
        const usuario = await Administracion.findOne({ email: req.query.email });
        if (usuario) {
            if (usuario.password != req.query.password) {
                res.status(404).json({ msg: 'Clave incorrecta' })
            }
            else {
                res.json(usuario);
            }
        }
        res.status(404).json({ msg: 'Usuario incorrecto' })

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.crearUsuario = async (req, res) => {
    const { apellidos, email, nombres, password, rol, rut, telefono } = req.body;
    const nuevoUsuario = new Administracion({ apellidos, email, nombres, password, rol, rut, telefono });
    await nuevoUsuario.save();

    const token = jwt.sign({_id: nuevoUsuario._id}, 'llavesita');;
    res.status(200).json({token});
}

exports.logear = async (req, res) => {
    console.log(req.body);
    const email = req.body[0];
    const password = req.body[1];
    const usuario = await Administracion.findOne({email});

    if(!usuario){
        return res.status(401).send("Este email no existe");
    }

    if (usuario.password !== password){
        return res.status(401).send("Contraseña incorrecta");
    }

    const token = jwt.sign({_id: usuario._id}, 'llavesita');
    return res.status(200).json({token})
}

exports.verificarToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Solicitud no aceptada");
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send("Solicitud no aceptada");
    }

    const payload = jwt.verify(token, 'llavesita');
    req.idUsuario = payload._id;
    next();
}
