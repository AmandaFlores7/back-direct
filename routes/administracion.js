const express = require('express');
const router = express.Router();
const administracionController = require('../controllers/administracionController');

// api/categoria
router.get('/', administracionController.ObtenerCredencial);
router.post('/signup', administracionController.crearUsuario);
router.post('/login', administracionController.logear);
module.exports = router;