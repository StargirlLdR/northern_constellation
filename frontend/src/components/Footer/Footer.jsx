
import React from 'react';
import './Footer.css';
import snowflakeImage3 from '../../assets/snowflake3.png';
import flowerImage2 from '../../assets/flower2.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="breed-background3">
        <img 
          src={snowflakeImage3} 
          alt="Снежинка" 
          className="snowflakeImage-photo3"
        />
      </div>
        <div className="flower2">
            <img 
            src={flowerImage2} 
            alt="Цветок" 
            className="flowerImage-photo2"
        />
        </div>
      <div className="footer-container">
        <h2 className="footer-title">Северное Созвездие</h2>
        <div className="footer-content">
          <div className="footer-left">
            <nav className="footer-nav">
            <a href="/" className="header__link">Главная</a>
            <a href="cats" className="header__link">Наши кошки</a>
            <a href="/about" className="header__link">О питомнике</a>
            <a href="/breed" className="header__link">О породе</a>
            <a href="#" className="header__link">Контакты</a>
            </nav>
          </div>

          <div className="footer-right">
            <div className="footer-social">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Telegram</a>
            </div>
            <a href="#" className="privacy-link">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;