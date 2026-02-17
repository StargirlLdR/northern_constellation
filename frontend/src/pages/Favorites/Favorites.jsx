// src/pages/Favorites/Favorites.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoriteContext';
import CatCard from '../../components/CatCard/CatCard';
import './Favorites.css';

const Favorites = () => {
    const { isAuthenticated } = useAuth();
    const { favorites, loading, refreshFavorites } = useFavorites();

    useEffect(() => {
        if (isAuthenticated) {
            refreshFavorites();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="favorites-page">
                <h1>Избранное</h1>
                <div className="favorites-empty">
                    <p>Войдите, чтобы увидеть избранное</p>
                    <Link to="/" className="back-home">На главную</Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="favorites-page">
                <h1>Избранное</h1>
                <div className="favorites-loading">
                    <div className="loader"></div>
                    <p>Загрузка...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <h1>Избранное</h1>
            
            {favorites.length === 0 ? (
                <div className="favorites-empty">
                    <p>У вас пока нет избранных котят</p>
                    <p>Добавьте котят из каталога</p>
                    <Link to="/cats" className="to-catalog-btn">Перейти в каталог</Link>
                </div>
            ) : (
                <>
                    <p className="favorites-count">
                        В избранном: {favorites.length} котят
                    </p>
                    <div className="favorites-grid">
                        {favorites.map(kitten => (
                            <CatCard key={kitten.kitten_id} kitten={kitten} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;