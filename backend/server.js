// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const kittenRoutes = require('./routes/kittens');
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Функция для получения локального IP
function getLocalIp() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Пропускаем не IPv4 и внутренние адреса (127.0.0.1)
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

// Middleware
app.use(cors({
    origin: '*', // Разрешаем запросы с любых источников для разработки
    credentials: true
}));
app.use(express.json());

// Статические файлы
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Маршруты API
app.use('/api/kittens', kittenRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

// Корневой маршрут
app.get('/', (req, res) => {
    res.json({ 
        message: '🐱 API питомника кошек работает!',
        endpoints: {
            kittens: '/api/kittens',
            colors: '/api/kittens/colors',
            kitten_by_id: '/api/kittens/1',
            auth: {
                register: '/api/auth/register (POST)',
                login: '/api/auth/login (POST)',
                profile: '/api/auth/profile (GET - требует токен)'
            },
            favorites: {
                get: '/api/favorites (GET)',
                add: '/api/favorites/:kittenId (POST)',
                remove: '/api/favorites/:kittenId (DELETE)',
                check: '/api/favorites/:kittenId/check (GET)'
            }
        }
    });
});

// Запуск сервера на всех интерфейсах
app.listen(PORT, '0.0.0.0', () => {
    const localIp = getLocalIp();
    console.log(`🚀 Сервер запущен на:`);
    console.log(`   ➜ Local:   http://localhost:${PORT}`);
    console.log(`   ➜ Network: http://${localIp}:${PORT}`);
    console.log(`📝 Тестируй: http://${localIp}:${PORT}/api/kittens`);
    console.log(`🔐 Auth: http://${localIp}:${PORT}/api/auth`);
    console.log(`❤️ Favorites: http://${localIp}:${PORT}/api/favorites`);
    console.log(`✅ Успешно подключено к PostgreSQL`);
});