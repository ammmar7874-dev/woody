import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import QuoteModal from './QuoteModal';
import LanguageSelector from './LanguageSelector';
import './Navbar.css';
import { useQuote } from '../context/QuoteContext.jsx';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isQuoteOpen, setIsQuoteOpen] = useState(false); // Removed local state
    const { isQuoteOpen, openQuoteModal, closeQuoteModal } = useQuote();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hash scrolling when location changes or on initial load
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);



    const handleNavigation = (path) => {
        setIsMenuOpen(false);
        if (path.startsWith('/#')) {
            const id = path.split('#')[1];
            if (location.pathname === '/') {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navigate(path);
            }
        } else {
            navigate(path);
        }
    };

    const navLinks = [
        { name: t('nav_home'), path: '/' },
        { name: t('nav_products'), path: '/collection' },
        { name: t('nav_gallery'), path: '/gallery' },
        { name: t('nav_about'), path: '/about' },
    ];

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="logo"
                        onClick={() => navigate('/')}
                    >
                        WOODIFY
                    </motion.div>

                    <div className="desktop-nav">
                        <ul className="nav-list">
                            {navLinks.map((link, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <span
                                        onClick={() => handleNavigation(link.path)}
                                        className="nav-link-item"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {link.name}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>


                        <div className="nav-actions">
                            <LanguageSelector />
                            <button
                                className="quote-btn-nav"
                                onClick={() => openQuoteModal('special')}
                            >
                                {t('cta_quote')}
                            </button>
                        </div>
                    </div>

                    <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mobile-menu"
                        >
                            <ul className="mobile-nav-list">
                                {navLinks.map((link, idx) => (
                                    <li key={idx} onClick={() => handleNavigation(link.path)}>
                                        <span>{link.name}</span>
                                    </li>
                                ))}
                                <li className="mobile-lang-container">
                                    <LanguageSelector mobile={true} />
                                </li>
                                <li>
                                    <button
                                        className="quote-btn-mobile"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            openQuoteModal('special');
                                        }}
                                    >
                                        {t('cta_quote')}
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <QuoteModal isOpen={isQuoteOpen} onClose={closeQuoteModal} />
        </>
    );
};

export default Navbar;
