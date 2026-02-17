// backend/controllers/favoriteController.js
const Favorite = require('../models/Favorite');

// Добавить в избранное
exports.addFavorite = async (req, res) => {
    try {
        const userId = req.user.userId; // из JWT токена
        const { kittenId } = req.params;

        await Favorite.add(userId, kittenId);

        res.json({
            success: true,
            message: 'Добавлено в избранное'
        });
    } catch (error) {
        console.error('Ошибка добавления:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
};

// Удалить из избранного
exports.removeFavorite = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { kittenId } = req.params;

        await Favorite.remove(userId, kittenId);

        res.json({
            success: true,
            message: 'Удалено из избранного'
        });
    } catch (error) {
        console.error('Ошибка удаления:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
};

// Получить все избранное пользователя
exports.getFavorites = async (req, res) => {
    try {
        const userId = req.user.userId;
        const favorites = await Favorite.getUserFavorites(userId);

        res.json({
            success: true,
            data: favorites
        });
    } catch (error) {
        console.error('Ошибка получения избранного:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
};

// Проверить, в избранном ли котенок
exports.checkFavorite = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { kittenId } = req.params;

        const isFavorite = await Favorite.isFavorite(userId, kittenId);

        res.json({
            success: true,
            isFavorite
        });
    } catch (error) {
        console.error('Ошибка проверки:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
};