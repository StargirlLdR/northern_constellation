// pages/KittenDetail/KittenDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './KittenDetail.css';

const KittenDetail = () => {
    const { id } = useParams();
    const [kitten, setKitten] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchKitten = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/kittens/${id}`);
                const data = await response.json();
                if (data.success) {
                    setKitten(data.data);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchKitten();
    }, [id]);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (!kitten) return <div className="error">Котенок не найден</div>;

    const imageUrl = `http://localhost:3001${kitten.main_photo}`;

    return (
        <div className="kitten-detail-page">
            {/* Заголовок страницы - имя питомца */}
            <h1 className="kitten-name-title">{kitten.name}</h1>
            
            <div className="kitten-detail-content">
                {/* Фото слева */}
                <div className="kitten-photo">
                    {!imageError ? (
                        <img 
                            src={imageUrl}
                            alt={kitten.name}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="photo-placeholder">
                            {kitten.name}
                        </div>
                    )}
                </div>

                {/* Текст справа */}
                <div className="kitten-info">
                    <p className="kitten-description">
                        {kitten.description}
                    </p>
                    

                    <div className="action-buttons">
                        <button className="favorite-btn">
                            Избранное
                        </button>
                        <button className="write-btn">
                            Написать
                        </button>
                    </div>

                    {/* Кнопка назад под кнопками */}
                    <Link to="/cats" className="back-button">
                        ← Назад к каталогу
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default KittenDetail;