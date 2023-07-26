const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/:videoId/products', productController.getProductList);


module.exports = router;