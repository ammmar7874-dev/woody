import React from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2 className="footer-logo">WOODIFY</h2>
                        <p className="footer-about">
                            {t('footer_about')}
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <h4 className="footer-heading">{t('footer_links')}</h4>
                        <ul>
                            <li><a href="/">{t('nav_home')}</a></li>
                            <li><a href="/gallery">{t('nav_gallery')}</a></li>
                            <li><a href="/about">{t('nav_about')}</a></li>
                            <li><a href="#products">{t('nav_products')}</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4 className="footer-heading">{t('footer_contact')}</h4>
                        <ul className="contact-list">
                            <li>
                                <MapPin size={18} className="contact-icon" />
                                <span>Via Ticino, 15, Italy</span>
                            </li>
                            <li>
                                <Phone size={18} className="contact-icon" />
                                <span>+39 036 2542037</span>
                            </li>
                            <li>
                                <Mail size={18} className="contact-icon" />
                                <span>artisan@woodify.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} WOODIFY. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
