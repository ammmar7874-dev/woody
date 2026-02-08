import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// Import other pages as we create them
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div className="app">
            {!isAdmin && <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                </Routes>
            </main>

            {!isAdmin && (
                <footer className="footer-placeholder">
                    <div className="container">
                        <div className="footer-grid">
                            <div>
                                <h4>WOODIFY</h4>
                                <p>Artisanal Craftsmanship.</p>
                            </div>
                            <div>
                                <p>Showroom: Via Ticino, 15, Italy</p>
                                <p>Contact: +39 036 2542037</p>
                            </div>
                        </div>
                        <div className="footer-copy">
                            &copy; 2024 WOODIFY. All rights reserved.
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}

export default App;
