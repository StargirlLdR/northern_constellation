// backend/routes/kittens.js
const express = require('express');
const router = express.Router();
const kittenController = require('../controllers/kittenController');

// Порядок ВАЖЕН! Сначала специфичные маршруты
router.get('/colors', kittenController.getAllColors);  // /api/kittens/colors
router.get('/:id', kittenController.getKittenById);    // /api/kittens/1
router.get('/', kittenController.getAllKittens);       // /api/kittens

module.exports = router;