import React from 'react';
import './Home.css';
import catImage from '../../assets/freepik__expand__40716 1.png';
import snowflakeImage from '../../assets/snowflake.png'; 
import snowflakeImage2 from '../../assets/snowflake2.png';
import catImage1 from '../../assets/cat1.png';
import catImage2 from '../../assets/cat2.png';
import catImage3 from '../../assets/cat3.png';
import flowerImage from '../../assets/flower.png';

const Home = () => {
  return (

    <div className="home-container">
    <div className="top-grid">
        <div className="grid-text-left">
          <h1 className="main-title">
            <span className="title-line">Верные друзья с душой ангела</span>
          </h1>
        </div>

        <div className="grid-text-right">
          <div className="nursery-description">
            <p className="description-text">
              Питомник «Северное Созвездие» –
              профессиональное разведение
              в лучших традициях
            </p>
          </div>
        </div>

        <div className="grid-button">
          <button className="select-cat-button">
            Выбрать кота
          </button>
        </div>
      </div>

      <div className="bottom-photo">
        <div className="photo-overlay"></div>
        <img 
          src={catImage} 
          alt="Красивый кот из питомника" 
          className="cat-photo"
        />
      </div>

      <section className="breed-uniqueness-section4">
        <div className="breed-background4">
        <img 
          src={snowflakeImage} 
          alt="Снежинка" 
          className="snowflakeImage-photo"
        />
        </div>
        <div className="breed-container4">
          <h2 className="breed-title4">Уникальность породы</h2>
          
          <div className="breed-grid4">
            <div className="breed-card4">
              <div className="card-title4">Характер</div>
              <div className="card-content4">
               <p> Умные, ласковые, терпеливые,
                отлично ладят с детьми и животными</p>
              </div>
            </div>

            <div className="breed-card4">
              <div className="card-title4">Внешность</div>
              <div className="card-content4">
                <p>Ярко-голубые глаза,
                мощное телосложение,
                роскошная шерсть без колтунов</p>
              </div>
            </div>

            <div className="breed-card4">
              <div className="card-title4">Гипоаллергенность</div>
              <div className="card-content4">
                <p>Считаются одной из самых гипоаллергенных пород</p>
              </div>
            </div>

            <div className="breed-card4">
              <div className="card-title4">Здоровье</div>
              <div className="card-content4">
                <p>Природная выносливость и крепкое здоровье</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-goal-section">
        <div className="main-goal-container">
            <h2 className="main-goal-title">Основная наша цель</h2>
            
            <div className="main-goal-text">
            <p className="goal-paragraph">
                В стенах нашего питомника живут не просто кошки. Здесь живут надежды. Каждое пушистое создание, от крошечного игривого котенка до степенного умудренного опытом кота, смотрит на мир большими, доверчивыми глазами в ожидании чего-то самого главного. Они ждут своего Человека.
            </p>
            
            <p className="goal-paragraph">
                Они верят – и мы верим вместе с ними – что однажды дверь откроется, и на пороге появится Тот Самый. Тот, чьё сердце отзовётся на их тихое мурлыканье. Тот, в чьих глазах они увидят не мимолётный интерес, а искреннее желание обрести верного друга.
            </p>

            </div>
        </div>
       </section>
      <section className="our-cats-section">
        <div className="cat-background">
        <img 
          src={snowflakeImage2} 
          alt="Снежинка" 
          className="snowflakeImage2-photo"
        />
        </div>
            <div className="cat-container">
            <h2 className="cat-title">Наши кошки</h2>
            
            <div className="cat-grid">
                <div className="cat-card">
                <div className="card-content2">
                <img 
                    src={catImage1} 
                    alt="Кошка" 
                    className="catImage-photo"
                    />
                </div>
                </div>

                <div className="cat-card">
                <div className="card-content2">
                    <img 
                    src={catImage2} 
                    alt="Кошка" 
                    className="catImage-photo"
                    />
                </div>
                </div>

                <div className="cat-card">
                  <div className="card-content2">
                      <img 
                      src={catImage3} 
                      alt="Кошка" 
                      className="catImage-photo"
                      />
                  </div>
                </div>

                    
            </div>
        </div>
      </section>
      <section className="buttons-section-container">
        <div className="buttons-section-grid">
            <div className="buttons-block">
               <button className="learn-more-button">
                  Узнать больше
                </button>
                <button className="favorites-button">
                  Избранное 
                </button>
            </div>

            <div className="buttons-block">
              <button className="learn-more-button">
                Узнать больше
              </button>
              <button className="favorites-button">
                Избранное 
              </button>
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
      </section>
        <section className="main-goal-section">
        <div className="main-goal-container">
                <div className="flower">
                <img 
                src={flowerImage} 
                alt="Цветок" 
                className="flowerImage-photo"
                />
                </div>

            <h2 className="main-goal-title">Как взять животное?</h2>
            <div className="main-goal-text">
            <p className="goal-paragraph">
                Выберите животное или нескольких в каталоге и свяжитесь с куратором. 
                Знакомство — обязательный и очень важный этап пристройства, ведь мы хотим быть уверены, 
                что вы и наш пушистый подопечный идеально подходите друг другу.
                Во время личной встречи или онлайн-звонка вы сможете не только расспросить обо всём,
                что волнует, но и по-настоящему пообщаться с будущим питомцем, почувствовать его характер, 
                а мы — дать все необходимые рекомендации для комфортной адаптации в вашем доме.
            </p>

            </div>
        </div>
       </section>
    </div>
  );
};

export default Home;