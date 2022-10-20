//rutas para categoria
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// api/categoria
router.post('/', categoriaController.crearSubcategoria);
router.put('/', categoriaController.modificarSubcategoria);
router.get('/categoria', categoriaController.obtenerCategorias);
router.get('/subcategoria', categoriaController.obtenerSubCategorias);

module.exports = router;