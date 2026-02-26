// models/Kitten.js
const pool = require('../config/database');

class Kitten {
    static async getAllForCatalog(filters = {}) {
        let query = `
            SELECT 
                k.kitten_id,
                k.name,
                k.main_photo,
                k.status
            FROM Kittens k
            LEFT JOIN Colors c ON k.color_id = c.color_id
            WHERE 1=1
        `;
        
        const values = [];
        let paramCount = 1;
        //Статус
        if (filters.status && filters.status !== 'all') {
            query += ` AND k.status = $${paramCount}`;
            values.push(filters.status);
            paramCount++;
        }
        
        //Пол
        if (filters.gender && filters.gender !== 'all') {
            query += ` AND k.gender = $${paramCount}`;
            values.push(filters.gender === 'male' ? 'м' : 'ж');
            paramCount++;
        }
        
        //Окрас
        if (filters.color && filters.color !== 'all') {
            query += ` AND c.color_name ILIKE $${paramCount}`; 
            values.push(filters.color);
            paramCount++;
        }
        
        //Возраст
        if (filters.ageGroup && filters.ageGroup !== 'all') {
            switch(filters.ageGroup) {
                case 'kittens':
                    query += ` AND age(k.birth_date) < INTERVAL '4 months'`;
                    break;
                case 'teenagers':
                    query += ` AND age(k.birth_date) >= INTERVAL '4 months' 
                              AND age(k.birth_date) < INTERVAL '8 months'`;
                    break;
                case 'young':
                    query += ` AND age(k.birth_date) >= INTERVAL '8 months' 
                              AND age(k.birth_date) < INTERVAL '2 years'`;
                    break;
                case 'adult':
                    query += ` AND age(k.birth_date) >= INTERVAL '2 years'`;
                    break;
            }
        }
        
        // 
        query += ` ORDER BY 
            CASE k.status
                WHEN 'доступен' THEN 1
                WHEN 'забронирован' THEN 2
                WHEN 'нашел свой дом' THEN 3
                ELSE 4
            END,
            k.created_date DESC`;
        
        try {
            console.log('📝 SQL запрос:', query);
            console.log('📝 Значения:', values);
            
            const result = await pool.query(query, values);
            console.log(`✅ Найдено котят: ${result.rows.length}`);
            
            return result.rows;
        } catch (error) {
            console.error('❌ Ошибка в модели Kitten:', error);
            throw error;
        }
    }
    
    static async getAllColors() {
        try {
            console.log('🎨 Запрос цветов из БД...');
            const result = await pool.query(`
                SELECT color_name 
                FROM Colors 
                ORDER BY color_id
            `);
            console.log('🎨 Найденные цвета:', result.rows);
            return result.rows.map(row => row.color_name);
        } catch (error) {
            console.error('❌ Ошибка при получении цветов:', error);
            throw error;
        }
    }
    
    static async getById(id) {
        const query = `
            SELECT 
                k.kitten_id,
                k.name,
                c.color_name,
                CASE WHEN k.gender = 'м' THEN 'Мальчик' ELSE 'Девочка' END as gender,
                TO_CHAR(k.birth_date, 'DD.MM.YYYY') as birth_date_formatted,
                EXTRACT(MONTH FROM age(k.birth_date)) as age_months,
                EXTRACT(YEAR FROM age(k.birth_date)) as age_years,
                k.status,
                k.description,
                k.main_photo,
                CASE 
                    WHEN age(k.birth_date) < INTERVAL '4 months' THEN 'Котята (до 4 мес.)'
                    WHEN age(k.birth_date) >= INTERVAL '4 months' AND age(k.birth_date) < INTERVAL '8 months' THEN 'Подростки (4-8 мес.)'
                    WHEN age(k.birth_date) >= INTERVAL '8 months' AND age(k.birth_date) < INTERVAL '2 years' THEN 'Молодые (8 мес. - 2 года)'
                    WHEN age(k.birth_date) >= INTERVAL '2 years' THEN 'Взрослые (от 2 лет)'
                END as age_group
            FROM Kittens k
            LEFT JOIN Colors c ON k.color_id = c.color_id
            WHERE k.kitten_id = $1
        `;
        
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = Kitten;