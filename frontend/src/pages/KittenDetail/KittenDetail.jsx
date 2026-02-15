// pages/KittenDetail/KittenDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
                    console.log('Данные котенка:', data.data);
                    console.log('Путь к фото:', data.data.main_photo);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchKitten();
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!kitten) return <div>Котенок не найден</div>;

    // Формируем правильный URL для фото
    const imageUrl = `http://localhost:3001${kitten.main_photo}`;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/cats">← Назад к каталогу</Link>
            
            <h1>{kitten.name}</h1>
            
            {/* Фото */}
            {!imageError ? (
                <div>
                    <img 
                        src={imageUrl}
                        alt={kitten.name}
                        style={{ 
                            maxWidth: '300px', 
                            border: '1px solid #ddd', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                        onError={() => {
                            console.log('Ошибка загрузки фото:', imageUrl);
                            setImageError(true);
                        }}
                    />
                </div>
            ) : (
                <div style={{ 
                    width: '300px', 
                    height: '300px', 
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    flexDirection: 'column'
                }}>
                    <span style={{ fontSize: '48px' }}></span>
                    <span>{kitten.name}</span>
                </div>
            )}
            
            <p><strong>Окрас:</strong> {kitten.color_name || 'Не указан'}</p>
            <p><strong>Пол:</strong> {kitten.gender || 'Не указан'}</p>
            <p><strong>Статус:</strong> {kitten.status || 'Не указан'}</p>
            <p><strong>Описание:</strong> {kitten.description || 'Описание отсутствует'}</p>
            <div className="buttons-block">
                <button className="learn-more-button">
                    Узнать больше
                </button>
                <button className="favorites-button">
                    Избранное 
                </button>
            </div>
        </div>
    );
};

export default KittenDetail;