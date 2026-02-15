const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const kittenRoutes = require('./routes/kittens');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/kittens', kittenRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: ' API питомника кошек работает!',
        endpoints: {
            kittens: '/api/kittens',
            colors: '/api/kittens/colors',
            kitten_by_id: '/api/kittens/1'
        }
    });
});

app.listen(PORT, () => {
    console.log(` Сервер запущен на http://localhost:${PORT}`);
    console.log(`Тестируй: http://localhost:${PORT}/api/kittens`);
});
