
import React from 'react';
import './Breed.css';
import catImage6 from '../../assets/cat6.png';
import catImage7 from '../../assets/cat7.png';
import flower4 from '../../assets/flower4.png';
import catImage8 from '../../assets/cat8.png';
import snowflakeImage2 from '../../assets/snowflake2.png';

const Breed = () => {
  return (
    <div>
        <div className="breed-container">
            <section className="about-breed-section">
                <div className="about-breed-container">
                    <div className="catImage6">
                        <img 
                        src={catImage6} 
                        alt="Котёнок" 
                        className="catImage-photo6"
                        />
                    </div>
                    <h2 className="about-breed-title">О породе</h2>
                    <div className="about-breed-text">
                        <p className="breed-paragraph">
                            <b>Невская маскарадная кошка</b> — это удивительная гармония. Гармония неукротимого сибирского характера и изысканной «маскарадной» внешности с пронзительными голубыми глазами. Это не просто красивая кошка, а настоящий друг, компаньон и полноправный член семьи, покоряющий сердца своей умной преданностью и невероятным обаянием.
                        </p>
                    </div>
                </div>
            </section>
            <section className="history-section">
                <div className="history-container">
                    <div className="catImage7">
                        <img 
                        src={catImage7} 
                        alt="Котёнок" 
                        className="catImage-photo7"
                        />
                    </div>
                    <div className="flower4">
                        <img 
                        src={flower4} 
                        alt="Котёнок" 
                        className="flowerImage-photo4"
                        />
                    </div>
            
                    <h2 className="history-title">История породы — маскарад <br/>
                        с сибирскими корнями</h2>
                    <div className="history-text">
                        <p className="history-paragraph">
                            Невская маскарадная — это цветная вариация знаменитой сибирской кошки, 
                            которая была выделена в отдельную породную группу в конце 1980-х годов в Санкт-Петербурге, отсюда и первая часть названия — «невская».
                            Слово «маскарадная» она получила за свою характерную «маску» на мордочке — темные отметины, 
                            доставшиеся ей в наследство от скрещиваний с сиамскими и персидскими колор-пойнтами.
                            Это аборигенная русская порода, сформированная суровым климатом, что подарило ей крепчайшее здоровье, 
                            густую водоотталкивающую шерсть и независимый нрав, облагороженный многовековым соседством с человеком.
                        </p>
                    </div>
                 </div>
            </section>
            <section className="appearance-section">
                <h2 className="appearance-title">Внешность, которая восхищает</h2>
                 <div className="appearance-container">
                     <div className="appearance-wrapper">
                        <div className="content-grid2">
                             
                                 <div className="feature-item2">
                                     <div className="feature-content2">
                                         <p className="feature-description2">
                                         <b>Тело</b> крепкое, мускулистое, среднего или крупного размера. Взрослые коты могут достигать 8-10 кг.
                                         </p>
                                     </div>
                                 </div>
                             
                                 <div className="feature-item2">
                                 <div className="feature-content2">
                                     <p className="feature-description2">
                                     <b>Шерсть</b> полудлинная, с роскошным водоотталкивающим покровным волосом и густым подшерстком. Она не сваливается в колтуны и требует менее частого расчесывания, чем другие длинношерстные породы.
                                     </p>
                                 </div>
                                 </div>
                                 
                                 <div className="feature-item2">
                                     <div className="feature-content2">
                                         <p className="feature-description2">
                                         <b>Колор-пойнтовый окрас</b> светлое тело контрастирует с темными отметинами  на мордочке, ушах, лапах и хвосте.
                                         </p>
                                     </div>
                                 </div>
                         </div>
                         <div className="appearance-grid">
                                 <div className="catImage8">
                                     <img 
                                     src={catImage8} 
                                     alt="Невская маскарадная кошка" 
                                     className="catImage-photo8"
                                     />
                                 </div>
                         </div>

                     </div>
                 </div>
 
            </section>
            <section className="breed-uniqueness-section4">
                <div className="cat-background">
                    <img 
                        src={snowflakeImage2} 
                        alt="Снежинка" 
                        className="snowflakeImage2-photo"
                    />
                </div>
                <div className="breed-container4">
                  <h2 className="breed-title4">Характер, который покоряет</h2>
                  
                  <div className="breed-grid4">
                    <div className="breed-card4">
                      <div className="card-title4">Преданность</div>
                      <div className="card-content4">
                       <p> Они избирательны в привязанностях 
                        и часто выбирают себе одного «главного» хозяина</p>
                      </div>
                    </div>
        
                    <div className="breed-card4">
                      <div className="card-title4">Интеллект</div>
                      <div className="card-content4">
                        <p>Они прекрасно понимают слова и интонации, 
                            легко обучаемы, 
                            чувствуют настроение человека</p>
                      </div>
                    </div>
        
                    <div className="breed-card4">
                      <div className="card-title4">Дружелюбие</div>
                      <div className="card-content4">
                        <p>При правильной социализации они хорошо ладят с детьми и другими животными</p>
                      </div>
                    </div>
        
                    <div className="breed-card4">
                      <div className="card-title4">Игривость</div>
                      <div className="card-content4">
                        <p>Даже взрослые коты сохраняют игривость и любопытство</p>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
        </div>
    </div>
  );
};

export default Breed;