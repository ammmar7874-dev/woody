import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <div className="hero-content container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="hero-badge">{t('nav_gallery')}</span>
                    <h1 className="hero-title">
                        {t('hero_title').split(',').map((part, i) => (
                            <span key={i}>{part}{i === 0 ? ',' : ''}<br /></span>
                        ))}
                    </h1>
                    <p className="hero-subtitle">{t('hero_subtitle')}</p>

                    <div className="hero-actions">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="primary-btn"
                        >
                            {t('cta_quote')}
                        </motion.button>
                        <button className="secondary-btn">{t('nav_products')}</button>
                    </div>
                </motion.div>
            </div>

            <div className="hero-visual">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="hero-image-container"
                >
                    {/* Using Unsplash fallback due to generation limit */}
                    <div className="hero-overlay"></div>
                    <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" alt="Premium Wood" className="hero-bg-img" />
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
