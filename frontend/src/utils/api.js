// utils/api.js
const API_URL = 'http://localhost:3001/api';

export const fetchKittens = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        
        // Добавляем все фильтры в URL
        if (filters.status && filters.status !== 'all') {
            params.append('status', filters.status);
        }
        if (filters.gender && filters.gender !== 'all') {
            params.append('gender', filters.gender);
        }
        if (filters.color && filters.color !== 'all') {
            params.append('color', filters.color);
        }
        if (filters.ageGroup && filters.ageGroup !== 'all') {
            params.append('ageGroup', filters.ageGroup);
        }
        
        const url = `${API_URL}/kittens${params.toString() ? `?${params}` : ''}`;
        console.log('📡 Запрос к API:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Получен ответ:', data);
        
        if (!data.success) {
            throw new Error(data.error || 'Ошибка загрузки');
        }
        
        return data.data;
    } catch (error) {
        console.error('❌ Ошибка fetchKittens:', error);
        throw error;
    }
};

export const fetchColors = async () => {
    try {
        console.log('🎨 Запрос цветов...');
        // ИСПРАВЛЕНО: правильный URL /kittens/colors
        const response = await fetch(`${API_URL}/kittens/colors`);
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('🎨 Получены цвета:', data);
        
        if (!data.success) {
            throw new Error(data.error || 'Ошибка загрузки цветов');
        }
        
        return data.data;
    } catch (error) {
        console.error('❌ Ошибка fetchColors:', error);
        return []; // Возвращаем пустой массив вместо ошибки
    }
};