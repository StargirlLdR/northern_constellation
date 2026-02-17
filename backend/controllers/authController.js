// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-northern-constellation-2026';

// Регистрация нового пользователя
exports.register = async (req, res) => {
    try {
        // Проверяем валидацию
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const { full_name, email, password, phone } = req.body;

        // Проверяем, не существует ли уже пользователь
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                error: 'Пользователь с таким email уже существует' 
            });
        }

        // Создаем пользователя
        const newUser = await User.create({
            full_name,
            email,
            password,
            phone
        });

        // Создаем JWT токен
        const token = jwt.sign(
            { 
                userId: newUser.user_id, 
                email: newUser.email 
            },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'Регистрация прошла успешно',
            token,
            user: {
                id: newUser.user_id,
                name: newUser.full_name,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Ошибка сервера при регистрации' 
        });
    }
};

// Вход пользователя
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ищем пользователя
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'Неверный email или пароль' 
            });
        }

        // Проверяем пароль
        const isValidPassword = await User.checkPassword(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false, 
                error: 'Неверный email или пароль' 
            });
        }

        // Создаем JWT токен
        const token = jwt.sign(
            { 
                userId: user.user_id, 
                email: user.email 
            },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Вход выполнен успешно',
            token,
            user: {
                id: user.user_id,
                name: user.full_name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Ошибка сервера при входе' 
        });
    }
};

// Получение профиля пользователя
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: 'Пользователь не найден' 
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Ошибка получения профиля:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Ошибка сервера' 
        });
    }
};