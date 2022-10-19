//rutas para items
const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carroController');

// api/item
router.post('/', carroController.crearCarro);
router.get('/', carroController.obtenerCarros);
router.put('/:idCarro/item/:idItem',carroController.agregarItem);
router.get('/:id', carroController.obtenerCarro);
router.delete('/:idCarro/item/:idItem/carroItem/:idCarroItem', carroController.eliminarItem);

module.exports = router;