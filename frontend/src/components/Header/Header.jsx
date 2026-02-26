// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '/src/context/AuthContext.jsx';
import AuthModal from '../Auth/AuthModal';
import './Header.css';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        console.log('Нажата кнопка выхода');
        console.log('Текущий пользователь:', user);
        
        try {
            logout();
            console.log('Выход выполнен успешно');
            setShowUserMenu(false);
            
            window.location.href = '/';
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (
        <>
            <header className="header">
                <div className="header__grid">
                    <nav className="header__nav">
                        <Link to="/" className="header__link">Главная</Link>
                        <Link to="/cats" className="header__link">Наши кошки</Link>
                        <Link to="/about" className="header__link">О питомнике</Link>
                        <Link to="/breed" className="header__link">О породе</Link>
                        <Link to="/contacts" className="header__link">Контакты</Link>
                    </nav>
                    
                    <div className="header__actions">

                        <Link to="/favorites" className="favorite-icon-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor"/>
                            </svg>
                        </Link>
                        
                        {isAuthenticated ? (
                            <div className="user-menu-container">
                                <button 
                                    className="user-icon-button"
                                    onClick={() => {
                                        console.log('👤 Открытие меню пользователя');
                                        setShowUserMenu(!showUserMenu);
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                                    </svg>
                                    <span className="user-name">{user?.name}</span>
                                </button>
                                
                                {showUserMenu && (
                                    <div className="user-menu">
                                        <div className="user-menu-info">
                                            <strong>{user?.name}</strong>
                                            <span>{user?.email}</span>
                                        </div>
                                        <Link 
                                            to="/favorites" 
                                            className="user-menu-item"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Моё избранное
                                        </Link>
                                        <button 
                                            className="user-menu-item logout"
                                            onClick={handleLogout}
                                        >
                                            Выйти
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button 
                                className="auth-icon-button"
                                onClick={() => {
                                    console.log('🔐 Открытие модального окна входа');
                                    setIsAuthModalOpen(true);
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                                </svg>
                                <span className="auth-text">Войти</span>
                            </button>
                        )}
                        <button className="header__button">Написать</button>
                    </div>
                </div>
            </header>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </>
    );
};

export default Header;