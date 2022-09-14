//rutas para items
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// api item
router.post('/', itemController.crearItems);

module.exports = router;