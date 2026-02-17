// src/context/FavoriteContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoriteContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoriteProvider');
    }
    return context;
};

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token, isAuthenticated } = useAuth();

    // Загружаем избранное при авторизации
    useEffect(() => {
        if (isAuthenticated && token) {
            loadFavorites();
        } else {
            setFavorites([]);
        }
    }, [isAuthenticated, token]);

    const loadFavorites = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/favorites', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setFavorites(data.data);
            }
        } catch (error) {
            console.error('Ошибка загрузки избранного:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (kittenId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/favorites/${kittenId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                await loadFavorites(); // Перезагружаем список
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error('Ошибка добавления:', error);
            return { success: false };
        }
    };

    const removeFromFavorites = async (kittenId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/favorites/${kittenId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                await loadFavorites(); // Перезагружаем список
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error('Ошибка удаления:', error);
            return { success: false };
        }
    };

    const checkIsFavorite = (kittenId) => {
        return favorites.some(fav => fav.kitten_id === parseInt(kittenId));
    };

    return (
        <FavoriteContext.Provider value={{
            favorites,
            loading,
            addToFavorites,
            removeFromFavorites,
            checkIsFavorite,
            refreshFavorites: loadFavorites
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};