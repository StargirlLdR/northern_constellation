import React from 'react';
import './About.css';
import catImage4 from '../../assets/cat4.png';
import catImage5 from '../../assets/cat5.png';
import flowerImage3 from '../../assets/flower3.png';
import snowflakeImage4 from '../../assets/snowflake4.png';

const About = () => {
  return (
    <div className="about-container">
        <section className="about-nursery-section">
            <div className="about-nursery-container">
                <div className="catImage4">
                    <img 
                    src={catImage4} 
                    alt="Котёнок" 
                    className="catImage-photo4"
                    />
                </div>
                <h2 className="about-nursery-title">О питомнике</h2>
                
                <div className="about-nursery-text">
                    <p className="nursery-paragraph">
                        <b>Мы</b> — семья профессиональных фелинологов, которых судьба подарила удивительную возможность превратить любимое дело в жизненное призвание. Для нас разведение кошек — это не бизнес и не хобби; это глубокое, осознанное искусство, наполненное смыслом и ответственностью.
                    </p>
                    
                    <p className="nursery-paragraph">
                        <b>Наш питомник</b> — это живой организм, pulsating ритмом маленьких сердец, место, где царит любовь и где каждый обитатель — уникальная личность. Мы не просто следим за чистотой породы и здоровьем животных, мы вкладываем в каждого котенка частичку своей души. <br/>
                        Наша работа — это ежедневный труд, основанный на трех китах: профессиональных знаниях, безграничной заботе и глубоком уважении к этим удивительным созданиям.
                    </p>
                </div>
            </div>
       </section>
            <section className="breed-uniqueness-section1">
                <div className="flower3">
                    <img 
                    src={flowerImage3} 
                    alt="Цветок" 
                    className="flowerImage-photo3"
                    />
                </div>
               <h2 className="breed-title1">Уникальность породы</h2>
                <div className="two-grids-container">
                    <div className="grids-wrapper">
                        <div className="image-grid">
                                <div className="catImage5">
                                    <img 
                                    src={catImage5} 
                                    alt="Невская маскарадная кошка" 
                                    className="catImage-photo5"
                                    />
                                </div>
                        </div>
                    
                        <div className="content-grid">
                            
                                <div className="feature-item">
                                    <div className="feature-content">
                                        <p className="feature-description">
                                        <b>Разводим</b> невских маскарадных кошек с безупречной родословной, крепким здоровьем и устойчивой психикой.
                                        </p>
                                    </div>
                                </div>
                            
                                <div className="feature-item">
                                <div className="feature-content">
                                    <p className="feature-description">
                                    <b>Гарантируем</b>, что каждый котенок соответствует стандарту породы, имеет полный пакет документов и все необходимые прививки.
                                    </p>
                                </div>
                                </div>
                                
                                <div className="feature-item">
                                    <div className="feature-content">
                                        <p className="feature-description">
                                        <b>Поддерживаем</b> новых владельцев на всех этапах: от выбора котенка до консультаций по уходу, воспитанию и здоровью.
                                        </p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

            </section>
        <section className="acquaintance-section">
            <div className="acquaintance-container">
                <h2 className="acquaintance-title">Давайте познакомимся ближе!</h2>
                <div className="snowflake4">
                    <img 
                    src={snowflakeImage4} 
                    alt="Цветок" 
                    className="snowflakeImage-photo4"
                    />
                </div>
                <div className="acquaintance-text">
                <p className="acquaintance-paragraph">
                    <b>Наши коты и кошки</b> — это наша гордость. Они — не просто производители, а полноправные члены нашей семьи, окруженные заботой и вниманием. Мы тщательно следим за их здоровьем, обеспечиваем сбалансированное питание и регулярные обследования у ветеринара.
                </p>
                
                <p className="acquaintance-paragraph">
                    Читайте наши посты, смотрите сторис и делитесь эмоциями — мы всегда рады новым друзьям и единомышленникам!
                </p>
                
                </div>
            </div>
        </section> 
    </div>
  );
};

export default About;
