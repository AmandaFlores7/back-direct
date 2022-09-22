//rutas para items
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// api item
router.post('/', itemController.crearItem);
router.get('/', itemController.obtenerItems);
router.put('/:id', itemController.actualizarItem);
router.get('/:id', itemController.obtenerItem);
router.delete('/:id', itemController.eliminarItem);

module.exports = router;