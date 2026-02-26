
import { useState, useEffect, useCallback } from 'react';
import { fetchKittens, fetchColors } from '../utils/api';

export const useFilters = () => {
    const [kittens, setKittens] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [filters, setFilters] = useState({
        status: 'all',      
        gender: 'all',
        color: 'all',
        ageGroup: 'all'
    });

    useEffect(() => {
        const loadColors = async () => {
            try {
                console.log('Загружаем цвета...');
                const colorsData = await fetchColors();
                console.log('Загруженные цвета:', colorsData);
                setColors(colorsData);
            } catch (error) {
                console.error('Ошибка загрузки цветов:', error);
            }
        };
        loadColors();
    }, []);

    const loadKittens = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            console.log('Загружаем котят с фильтрами:', filters);
            const data = await fetchKittens(filters);
            console.log('Загружено котят:', data.length);
            setKittens(data);
        } catch (error) {
            console.error('Ошибка загрузки котят:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        loadKittens();
    }, [loadKittens]);

    const updateFilter = (key, value) => {
        console.log(`Фильтр изменен: ${key} = ${value}`);
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        console.log('Сброс фильтров');
        setFilters({
            status: 'all',
            gender: 'all',
            color: 'all',
            ageGroup: 'all'
        });
    };

    const hasActiveFilters = filters.status !== 'all' || 
                            filters.gender !== 'all' || 
                            filters.color !== 'all' || 
                            filters.ageGroup !== 'all';

    return {
        kittens,
        colors,
        filters,
        loading,
        error,
        hasActiveFilters,
        updateFilter,
        resetFilters
    };
};