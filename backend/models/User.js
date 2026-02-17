// backend/models/User.js
const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    // Создание нового пользователя
    static async create(userData) {
        const { full_name, email, password, phone } = userData;
        
        // Хешируем пароль
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        
        const query = `
            INSERT INTO Users (full_name, email, password_hash, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, full_name, email, phone, registration_date
        `;
        
        try {
            const result = await pool.query(query, [
                full_name, 
                email, 
                password_hash, 
                phone || null
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('Ошибка создания пользователя:', error);
            if (error.code === '23505') { // Уникальное нарушение (email уже существует)
                throw new Error('Пользователь с таким email уже существует');
            }
            throw error;
        }
    }

    // Поиск пользователя по email
    static async findByEmail(email) {
        const query = 'SELECT * FROM Users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    // Поиск пользователя по ID
    static async findById(user_id) {
        const query = `
            SELECT user_id, full_name, email, phone, registration_date 
            FROM Users 
            WHERE user_id = $1
        `;
        const result = await pool.query(query, [user_id]);
        return result.rows[0];
    }

    // Проверка пароля
    static async checkPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;