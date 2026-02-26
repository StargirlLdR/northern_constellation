// controllers/kittenController.js
const Kitten = require('../models/Kitten');

exports.getAllKittens = async (req, res) => {
    try {
        const filters = {
            status: req.query.status,    
            gender: req.query.gender,
            color: req.query.color,
            ageGroup: req.query.ageGroup
        };
        
        console.log('📊 Получены фильтры:', filters);
        
        const kittens = await Kitten.getAllForCatalog(filters);
        
        res.json({
            success: true,
            count: kittens.length,
            data: kittens
        });
    } catch (error) {
        console.error('❌ Ошибка в контроллере:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера при получении котят'
        });
    }
};

exports.getAllColors = async (req, res) => {
    try {
        console.log('🎨 Запрос на получение цветов');
        const colors = await Kitten.getAllColors();
        console.log('✅ Отправляем цвета:', colors);
        res.json({
            success: true,
            data: colors
        });
    } catch (error) {
        console.error('❌ Ошибка при получении окрасов:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера при получении окрасов'
        });
    }
};

exports.getKittenById = async (req, res) => {
    try {
        const kitten = await Kitten.getById(req.params.id);
        
        if (!kitten) {
            return res.status(404).json({
                success: false,
                error: 'Котенок не найден'
            });
        }
        
        res.json({
            success: true,
            data: kitten
        });
    } catch (error) {
        console.error('❌ Ошибка при получении котенка:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера при получении котенка'
        });
    }
};