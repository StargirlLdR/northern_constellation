
import React from 'react';
import CatCard from '../../components/CatCard/CatCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { useFilters } from '../../hooks/useFilters';
import './Cats.css';

const Cats = () => {
    const {
        kittens,
        colors,
        filters,
        loading,
        error,
        updateFilter,
        resetFilters
    } = useFilters();

    if (error) {
        return (
            <div className="cats-error">
                <p>😿 {error}</p>
                <button onClick={() => window.location.reload()}>
                    Попробовать снова
                </button>
            </div>
        );
    }

    return (
        <div className="cats-page">
            <div className="cats-header">
                <h1>Наши кошки</h1>
            </div>

            <FilterPanel
                filters={filters}
                colors={colors}
                onFilterChange={updateFilter}
                onReset={resetFilters}
            />

            {loading ? (
                <div className="cats-loading">
                    <div className="loader"></div>
                    <p>Ищем подходящих котят...</p>
                </div>
            ) : kittens.length === 0 ? (
                <div className="cats-empty">
                    <h3>Котят нет</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                </div>
            ) : (
                <div className="cats-grid">
                    {kittens.map(kitten => (
                        <CatCard key={kitten.kitten_id} kitten={kitten} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cats;