// src/components/CatCard/CatCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CatCard.css';

const CatCard = ({ kitten }) => {
    const [imageError, setImageError] = useState(false);

    // Функция для получения правильного URL фото из бэкенда
    const getImageUrl = () => {
        if (imageError) {
            return 'http://localhost:3001/assets/kittens/placeholder.png';
        }
        
        if (!kitten.main_photo) {
            return 'http://localhost:3001/assets/kittens/placeholder.png';
        }
        
        // Если путь уже начинается с http, оставляем как есть
        if (kitten.main_photo.startsWith('http')) {
            return kitten.main_photo;
        }
        
        // Если путь начинается со слеша, добавляем к базовому URL бэкенда
        if (kitten.main_photo.startsWith('/')) {
            return `http://localhost:3001${kitten.main_photo}`;
        }
        
        // Если просто имя файла, формируем полный путь
        return `http://localhost:3001/assets/kittens/${kitten.main_photo}`;
    };

    return (
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
                <button className="favorites-button">
                  Избранное 
                </button>
            </div>
            </div>
        </Link>
    );
};

export default CatCard;