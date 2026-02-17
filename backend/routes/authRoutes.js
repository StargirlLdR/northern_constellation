// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Тестовый маршрут (оставляем для проверки)
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes working!' });
});

// Валидация для регистрации
const registerValidation = [
    body('full_name').notEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов'),
    body('phone').optional()
];

// Валидация для входа
const loginValidation = [
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').notEmpty().withMessage('Пароль обязателен')
];

// Маршруты
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;