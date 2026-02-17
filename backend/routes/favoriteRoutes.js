// backend/routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const favoriteController = require('../controllers/favoriteController');

// Все маршруты требуют авторизации
router.use(authMiddleware);

// Получить все избранное пользователя
router.get('/', favoriteController.getFavorites);

// Добавить в избранное
router.post('/:kittenId', favoriteController.addFavorite);

// Удалить из избранного
router.delete('/:kittenId', favoriteController.removeFavorite);

// Проверить статус
router.get('/:kittenId/check', favoriteController.checkFavorite);

module.exports = router;