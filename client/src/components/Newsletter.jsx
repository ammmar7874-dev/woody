import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Newsletter.css';

const Newsletter = () => {
    const { t } = useTranslation();

    return (
        <section className="newsletter-section section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="newsletter-card glass-panel"
                >
                    <div className="newsletter-content">
                        <h2 className="section-title">{t('news_title')}</h2>
                        <p className="newsletter-sub">{t('news_sub')}</p>

                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={t('news_ph')}
                                className="newsletter-input"
                                required
                            />
                            <button type="submit" className="newsletter-btn">
                                {t('news_btn')}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
