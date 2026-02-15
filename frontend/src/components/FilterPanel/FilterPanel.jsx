import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, colors, onFilterChange, onReset, hasActiveFilters }) => {
    const ageGroups = [
        { value: 'kittens', label: 'Котята (до 4 мес.)' },
        { value: 'teenagers', label: 'Подростки (4-8 мес.)' },
        { value: 'young', label: 'Молодые (8 мес. - 2 года)' },
        { value: 'adult', label: 'Взрослые (от 2 лет)' }
    ];

    const statuses = [
        { value: 'all', label: 'Все' },
        { value: 'доступен', label: 'Доступен' },
        { value: 'забронирован', label: 'Забронирован' },
        { value: 'нашел свой дом', label: 'Нашел дом' }
    ];

    return (
        <div className="filter-panel">

            <div className="filter-content">
                {/* НОВЫЙ ФИЛЬТР ПО СТАТУСУ 
                <div className="filter-group">
                    <select 
                        value={filters.status} 
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="filter-select"
                    >
                        {statuses.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>*/}

                {/* Пол */}
                <div className="filter-group">
                    <select 
                        value={filters.gender} 
                        onChange={(e) => onFilterChange('gender', e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Пол</option>
                        <option value="male">Мальчик</option>
                        <option value="female">Девочка</option>
                    </select>
                </div>

                {/* Возраст */}
                <div className="filter-group">
                    <select 
                        value={filters.ageGroup} 
                        onChange={(e) => onFilterChange('ageGroup', e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Возрастная группа</option>
                        {ageGroups.map(group => (
                            <option key={group.value} value={group.value}>
                                {group.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Окрас */}
                <div className="filter-group">
                    <select 
                        value={filters.color} 
                        onChange={(e) => onFilterChange('color', e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Окрас</option>
                        {colors && colors.length > 0 ? (
                            colors.map(color => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))
                        ) : (
                            <option disabled>Загрузка цветов...</option>
                        )}
                    </select>
                </div>

                

                {/* Кнопка сброса */}
               <button className="reset-btn" onClick={onReset}>
                    Сбросить фильтры
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;