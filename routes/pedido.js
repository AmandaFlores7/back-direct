//rutas para pedido
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.crearPedido);
router.put('/', pedidoController.cerrarPedido);
router.get('/', pedidoController.obtenerPedidos);
//router.get('/categorias', categoriaController.obtenerCategoriasTotal);
//router.get('/subcategoria', categoriaController.obtenerSubCategorias);

module.exports = router;
// api/categoria