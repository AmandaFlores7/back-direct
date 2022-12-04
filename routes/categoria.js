//rutas para categoria
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// api/categoria
router.post('/', categoriaController.crearSubcategoria);
router.put('/', categoriaController.modificarSubcategoria);
router.get('/', categoriaController.obtenerCategorias);
router.delete('/:subcat', categoriaController.eliminarSubcategoria);
router.get('/categorias', categoriaController.obtenerCategoriasTotal);
router.get('/subcategoria', categoriaController.obtenerSubCategorias);

module.exports = router;