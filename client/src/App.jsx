import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// Import other pages as we create them
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import './App.css';
import { QuoteProvider } from './context/QuoteContext.jsx';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/login';

    return (
        <AuthProvider>
            <QuoteProvider>
                <div className="app">
                    {!isAdmin && <Navbar />}
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/admin/*"
                                element={
                                    <PrivateRoute>
                                        <AdminDashboard />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </main>

                    {!isAdmin && <Footer />}
                </div>
            </QuoteProvider>
        </AuthProvider>
    );
}

export default App;
