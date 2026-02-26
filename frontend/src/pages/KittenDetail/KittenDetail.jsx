
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoriteContext';
import './KittenDetail.css';

const KittenDetail = () => {
    const { id } = useParams();
    const [kitten, setKitten] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState(null);
    const [showAuthMessage, setShowAuthMessage] = useState(false);
    
    const { isAuthenticated } = useAuth();
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();

    const getBaseUrl = () => {
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:3001';
        }
        return `http://${hostname}:3001`;
    };

    useEffect(() => {
        const fetchKitten = async () => {
            try {
                setLoading(true);
                setError(null);
                const baseUrl = getBaseUrl();
                const url = `${baseUrl}/api/kittens/${id}`;
                console.log('Запрос к API:', url);
                
                const response = await fetch(url);
                const data = await response.json();
                console.log('Получен ответ:', data);
                
                if (data.success) {
                    setKitten(data.data);
                } else {
                    setError(data.error || 'Котенок не найден');
                }
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                setError('Ошибка соединения с сервером');
            } finally {
                setLoading(false);
            }
        };
        
        fetchKitten();
    }, [id]);

    useEffect(() => {
        if (isAuthenticated && kitten) {
            setIsFavorite(checkIsFavorite(kitten.kitten_id));
        }
    }, [kitten, isAuthenticated, checkIsFavorite]);

    const handleFavoriteClick = async () => {
        if (!isAuthenticated) {
            setShowAuthMessage(true);
            setTimeout(() => setShowAuthMessage(false), 3000);
            return;
        }

        try {
            if (isFavorite) {
                const result = await removeFromFavorites(kitten.kitten_id);
                if (result.success) {
                    setIsFavorite(false);
                }
            } else {
                const result = await addToFavorites(kitten.kitten_id);
                if (result.success) {
                    setIsFavorite(true);
                }
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const getImageUrl = () => {
        const baseUrl = getBaseUrl();
        
        if (imageError || !kitten?.main_photo) {
            return `${baseUrl}/assets/kittens/placeholder.png`;
        }
        
        if (kitten.main_photo.startsWith('http')) {
            return kitten.main_photo;
        }
        let photoPath = kitten.main_photo;
        if (photoPath.startsWith('/')) {
            photoPath = photoPath.substring(1);
        }
        
        return `${baseUrl}/${photoPath}`;
    };

    if (loading) {
        return (
            <div className="kitten-detail-page">
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Загрузка информации о котенке...</p>
                </div>
            </div>
        );
    }

    if (error || !kitten) {
        return (
            <div className="kitten-detail-page">
                <div className="error-container">
                    <h2>{error || 'Котенок не найден'}</h2>
                    <Link to="/cats" className="back-link">Вернуться в каталог</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="kitten-detail-page">
            <h1 className="kitten-name-title">{kitten.name}</h1>
            
            <div className="kitten-detail-content">
                <div className="kitten-photo">
                    {!imageError ? (
                        <img 
                            src={getImageUrl()}
                            alt={kitten.name}
                            onError={() => {
                                console.log('Ошибка загрузки фото для:', kitten.name);
                                setImageError(true);
                            }}
                        />
                    ) : (
                        <div className="photo-placeholder">
                            <span>🐱</span>
                            <span>{kitten.name}</span>
                        </div>
                    )}
                </div>

                <div className="kitten-info">
                    <p className="kitten-description">
                        {kitten.description}
                    </p>

                    <div className="action-buttons">
                        <button 
                            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                            onClick={handleFavoriteClick}
                        >
                            {isFavorite ? ' В избранном' : 'Избранное'}
                        </button>
                        <button className="write-btn">
                            Написать
                        </button>
                    </div>

                    <Link to="/cats" className="back-button">
                        ← Назад к каталогу
                    </Link>
                </div>
            </div>

            {showAuthMessage && (
                <div className="auth-notification">
                    <div className="notification-content">
                        <span className="notification-text">Войдите, чтобы добавить в избранное</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KittenDetail;