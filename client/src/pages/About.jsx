import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './About.css';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-title white"
                    >
                        {t('about_title')}
                    </motion.h1>
                </div>
            </div>

            <div className="container section-padding">
                <div className="story-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="story-content"
                    >
                        <h2 className="section-title">{t('about_philosophy')}</h2>
                        <p>{t('about_text_1')}</p>
                        <p>{t('about_text_2')}</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="story-image"
                    >
                        <img src="/assets/workshop.jpg" alt="Carpenter workshop" />
                    </motion.div>
                </div>
            </div>

            <section className="contact-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="contact-card"
                    >
                        <div className="contact-info">
                            <h3>{t('contact_visit')}</h3>
                            <div className="info-item">
                                <MapPin className="icon" />
                                <span>Via Ticino, 15, 20823 Lentate sul Seveso MB, Italy</span>
                            </div>
                            <div className="info-item">
                                <Phone className="icon" />
                                <span>+39 036 2542037</span>
                            </div>
                            <div className="info-item">
                                <Mail className="icon" />
                                <span>careteam@biosofa.com</span>
                            </div>
                            <div className="info-item">
                                <Clock className="icon" />
                                <span>Mon - Fri: 09:00 - 18:00</span>
                            </div>
                        </div>

                        <div className="contact-map">
                            {/* Simple visual placeholder for map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2790.6662497746413!2d9.1171829!3d45.673898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478696bd10e972f7%3A0xe6775677579486c!2sVia%20Ticino%2C%2015%2C%2020823%20Lentate%20sul%20Seveso%20MB%2C%20Italy!5e0!3m2!1sen!2str!4v1707425827361!5m2!1sen!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
