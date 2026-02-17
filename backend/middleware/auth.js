// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-northern-constellation-2026';

const authMiddleware = (req, res, next) => {
    // Получаем токен из заголовка
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            error: 'Требуется авторизация' 
        });
    }

    try {
        // Проверяем токен
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            error: 'Недействительный токен' 
        });
    }
};

module.exports = authMiddleware;