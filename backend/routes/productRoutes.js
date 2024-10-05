const express = require('express');
const { getProducts, getCategories } = require('../controllers/productController');
const router = express.Router();

router.get('/categories', getCategories);
router.get('/', getProducts);

module.exports = router;
