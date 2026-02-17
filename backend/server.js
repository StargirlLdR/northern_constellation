// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const kittenRoutes = require('./routes/kittens');
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes'); // ДОБАВЛЯЕМ

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Статические файлы
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Маршруты API
app.use('/api/kittens', kittenRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes); // ДОБАВЛЯЕМ

// Корневой маршрут
app.get('/', (req, res) => {
    res.json({ 
        message: '🐱 API питомника кошек работает!',
        endpoints: {
            // Основные
            kittens: '/api/kittens',
            colors: '/api/kittens/colors',
            kitten_by_id: '/api/kittens/1',
            // Авторизация
            auth: {
                register: '/api/auth/register (POST)',
                login: '/api/auth/login (POST)',
                profile: '/api/auth/profile (GET - требует токен)'
            },
            // Избранное (требуют токен)
            favorites: {
                get: '/api/favorites (GET)',
                add: '/api/favorites/:kittenId (POST)',
                remove: '/api/favorites/:kittenId (DELETE)',
                check: '/api/favorites/:kittenId/check (GET)'
            }
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📝 Тестируй: http://localhost:${PORT}/api/kittens`);
    console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`❤️ Favorites: http://localhost:${PORT}/api/favorites`);
});