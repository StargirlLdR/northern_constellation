
const getBaseUrl = () => {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3001/api';
    }
    return `http://${hostname}:3001/api`;
};

const API_URL = getBaseUrl();
console.log('API Base URL:', API_URL); 

export const fetchKittens = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        
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
        console.log('Запрос к API:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Получен ответ:', data);
        
        if (!data.success) {
            throw new Error(data.error || 'Ошибка загрузки');
        }
        
        return data.data;
    } catch (error) {
        console.error('Ошибка fetchKittens:', error);
        throw error;
    }
};

export const fetchColors = async () => {
    try {
        console.log('🎨 Запрос цветов...');
        const url = `${API_URL}/kittens/colors`;
        console.log('URL запроса:', url);
        
        const response = await fetch(url);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Получены цвета:', data);
        
        if (!data.success) {
            throw new Error(data.error || 'Ошибка загрузки цветов');
        }
        
        return data.data;
    } catch (error) {
        console.error(' Ошибка fetchColors:', error);
        return []; 
    }
};

export const fetchKittenById = async (id) => {
    try {
        console.log(`Запрос котенка с ID: ${id}`);
        const url = `${API_URL}/kittens/${id}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Ошибка загрузки');
        }
        
        return data.data;
    } catch (error) {
        console.error('Ошибка fetchKittenById:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        console.log('Попытка входа:', email);
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        console.log('Ответ сервера:', data);
        
        return data;
    } catch (error) {
        console.error('Ошибка входа:', error);
        return { success: false, error: 'Ошибка соединения с сервером' };
    }
};

export const register = async (userData) => {
    try {
        console.log('Попытка регистрации:', userData.email);
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        console.log('Ответ сервера:', data);
        
        return data;
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return { success: false, error: 'Ошибка соединения с сервером' };
    }
};

export const addToFavorites = async (kittenId, token) => {
    try {
        console.log('Добавление в избранное:', kittenId);
        const response = await fetch(`${API_URL}/favorites/${kittenId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка добавления в избранное:', error);
        return { success: false, error: 'Ошибка соединения с сервером' };
    }
};

export const removeFromFavorites = async (kittenId, token) => {
    try {
        console.log('Удаление из избранного:', kittenId);
        const response = await fetch(`${API_URL}/favorites/${kittenId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка удаления из избранного:', error);
        return { success: false, error: 'Ошибка соединения с сервером' };
    }
};

export const getFavorites = async (token) => {
    try {
        console.log('Запрос списка избранного');
        const response = await fetch(`${API_URL}/favorites`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка получения избранного:', error);
        return { success: false, error: 'Ошибка соединения с сервером' };
    }
};

export const checkIsFavorite = async (kittenId, token) => {
    try {
        console.log('Проверка статуса избранного:', kittenId);
        const response = await fetch(`${API_URL}/favorites/${kittenId}/check`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка проверки избранного:', error);
        return { success: false, isFavorite: false };
    }
};