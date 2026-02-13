import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext.jsx';
import './Hero.css';

const Hero = () => {
    const { t } = useTranslation();
    const { openQuoteModal } = useQuote();
    const navigate = useNavigate();
    const titleWords = t('hero_title').split(' ');

    const handleProductsClick = () => {
        const element = document.getElementById('products');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#products');
        }
    };

    return (
        <section className="hero">
            <div className="hero-content container">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="hero-inner-wrapper"
                >
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        className="hero-badge"
                    >
                        {t('nav_gallery')}
                    </motion.span>

                    <h1 className="hero-title">
                        {titleWords.map((word, i) => (
                            <span key={i} className="word-wrapper">
                                <motion.span
                                    variants={{
                                        hidden: { y: '100%' },
                                        visible: { y: 0 }
                                    }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ display: 'inline-block' }}
                                >
                                    {word}&nbsp;
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hero-subtitle"
                    >
                        {t('hero_subtitle')}
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="hero-actions"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-light)' }}
                            whileTap={{ scale: 0.95 }}
                            className="primary-btn"
                            onClick={openQuoteModal}
                        >
                            {t('cta_quote')}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, x: 10 }}
                            className="secondary-btn"
                            onClick={handleProductsClick}
                        >
                            {t('nav_products')}
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            <div className="hero-visual">
                <motion.div
                    initial={{ scale: 1.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-image-container"
                >
                    <div className="hero-overlay"></div>
                    <motion.img
                        animate={{
                            y: [0, -20, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                        alt="Premium Wood"
                        className="hero-bg-img"
                    />
                </motion.div>
            </div>

            <div className="scroll-indicator">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="scroll-dot"
                />
            </div>
        </section>
    );
};

export default Hero;
