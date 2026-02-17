// backend/models/Favorite.js
const pool = require('../config/database');

class Favorite {
    // Добавить в избранное
    static async add(userId, kittenId) {
        const query = `
            INSERT INTO Favorites (user_id, kitten_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, kitten_id) DO NOTHING
            RETURNING favorite_id
        `;
        
        try {
            const result = await pool.query(query, [userId, kittenId]);
            return result.rows[0];
        } catch (error) {
            console.error('Ошибка добавления в избранное:', error);
            throw error;
        }
    }

    // Удалить из избранного
    static async remove(userId, kittenId) {
        const query = `
            DELETE FROM Favorites 
            WHERE user_id = $1 AND kitten_id = $2
        `;
        
        try {
            await pool.query(query, [userId, kittenId]);
            return true;
        } catch (error) {
            console.error('Ошибка удаления из избранного:', error);
            throw error;
        }
    }

    // Получить все избранное пользователя
    static async getUserFavorites(userId) {
        const query = `
            SELECT 
                k.kitten_id,
                k.name,
                k.main_photo,
                c.color_name,
                k.status
            FROM Favorites f
            JOIN Kittens k ON f.kitten_id = k.kitten_id
            LEFT JOIN Colors c ON k.color_id = c.color_id
            WHERE f.user_id = $1
            ORDER BY f.created_date DESC
        `;
        
        try {
            const result = await pool.query(query, [userId]);
            return result.rows;
        } catch (error) {
            console.error('Ошибка получения избранного:', error);
            throw error;
        }
    }

    // Проверить, в избранном ли котенок
    static async isFavorite(userId, kittenId) {
        const query = `
            SELECT EXISTS(
                SELECT 1 FROM Favorites 
                WHERE user_id = $1 AND kitten_id = $2
            )
        `;
        
        try {
            const result = await pool.query(query, [userId, kittenId]);
            return result.rows[0].exists;
        } catch (error) {
            console.error('Ошибка проверки избранного:', error);
            throw error;
        }
    }
}

module.exports = Favorite;