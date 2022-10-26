const express = require('express');
const router = express.Router();
const administracionController = require('../controllers/administracionController');

// api/categoria
router.get('/', administracionController.ObtenerAdministrador);

module.exports = router;