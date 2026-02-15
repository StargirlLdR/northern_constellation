
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__grid">
        <nav className="header__nav">
            <a href="/" className="header__link">Главная</a>
            <a href="cats" className="header__link">Наши кошки</a>
            <a href="/about" className="header__link">О питомнике</a>
            <a href="/breed" className="header__link">О породе</a>
            <a href="#" className="header__link">Контакты</a>
        </nav>
        
        <div className="header__actions">
          <button className="header__button">Написать</button>
        </div>
      </div>
    </header>
  );
};

export default Header;