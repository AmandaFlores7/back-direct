//rutas para items
const express = require('express');
const router = express.Router();

// api item
router.post('/', () => {
    console.log('creando producto');
})

module.exports = router;