// src/components/CatCard/CatCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoriteContext';
import './CatCard.css';

const CatCard = ({ kitten }) => {
    const [imageError, setImageError] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAuthMessage, setShowAuthMessage] = useState(false);
    
    const { isAuthenticated } = useAuth();
    const { addToFavorites, removeFromFavorites, checkIsFavorite } = useFavorites();

    useEffect(() => {
        if (isAuthenticated) {
            setIsFavorite(checkIsFavorite(kitten.kitten_id));
        }
    }, [kitten.kitten_id, isAuthenticated, checkIsFavorite]);

    const getImageUrl = () => {
        if (imageError) {
            return 'http://localhost:3001/assets/kittens/placeholder.png';
        }
        
        if (!kitten.main_photo) {
            return 'http://localhost:3001/assets/kittens/placeholder.png';
        }
        
        if (kitten.main_photo.startsWith('http')) {
            return kitten.main_photo;
        }
        
        if (kitten.main_photo.startsWith('/')) {
            return `http://localhost:3001${kitten.main_photo}`;
        }
        
        return `http://localhost:3001/assets/kittens/${kitten.main_photo}`;
    };

    const handleFavoriteClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

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

    return (
        <>
            <Link to={`/kitten/${kitten.kitten_id}`} className="cat-card-link">
                <div className="cats-card">
                    <div className='square'>
                        <div className="card-content3">
                            <div className="cat-card-image">
                                <img 
                                    src={getImageUrl()}
                                    alt={kitten.name}
                                    loading="lazy"
                                    onError={() => {
                                        console.log('Ошибка загрузки фото для:', kitten.name);
                                        setImageError(true);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cat-card-info">
                        <h3 className="cat-card-name">{kitten.name}</h3>
                    </div>
                    <div className="buttons-block">
                        <button className="learn-more-button">
                            Узнать больше
                        </button>
                        <button 
                            className={`favorites-button ${isFavorite ? 'active' : ''}`}
                            onClick={handleFavoriteClick}
                        >
                            {isFavorite ? '❤️ В избранном' : '🤍 Избранное'}
                        </button>
                    </div>
                </div>
            </Link>

            {/* Кастомное уведомление для неавторизованных */}
            {showAuthMessage && (
                <div className="auth-notification">
                    <div className="notification-content">
                        <span className="notification-icon"></span>
                        <span className="notification-text">Войдите, чтобы добавить в избранное</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default CatCard;