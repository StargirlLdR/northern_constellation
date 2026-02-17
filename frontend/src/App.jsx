import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { FavoriteProvider } from './context/FavoriteContext.jsx'; // ДОБАВЛЯЕМ
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Cats from './pages/Cats/Cats.jsx';   
import KittenDetail from './pages/KittenDetail/KittenDetail.jsx';
import About from './pages/About/About.jsx';
import Breed from './pages/Breed/Breed.jsx';
import Favorites from './pages/Favorites/Favorites.jsx'; // ДОБАВЛЯЕМ
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoriteProvider> {/* ОБОРАЧИВАЕМ В FavoriteProvider */}
          <div className="app">
            <Header />
            <main className="container" style={{ padding: '2rem 1rem' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cats" element={<Cats />} /> 
                <Route path="/kitten/:id" element={<KittenDetail />} /> 
                <Route path="/breed" element={<Breed />} />
                <Route path="/contacts" element={<div>Контакты</div>} />
                <Route path="/favorites" element={<Favorites />} /> {/* НОВЫЙ МАРШРУТ */}
              </Routes>
            </main>
            <Footer />
          </div>
        </FavoriteProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;