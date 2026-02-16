import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import './LanguageSelector.css';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
];

const LanguageSelector = ({ mobile = false }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    if (mobile) {
        return (
            <div className="mobile-language-selector">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        className={`mobile-lang-item ${i18n.language === lang.code ? 'active' : ''}`}
                        onClick={() => handleLanguageChange(lang.code)}
                    >
                        <span className="lang-flag">{lang.flag}</span>
                        <span className="lang-name">{lang.name}</span>
                        {i18n.language === lang.code && <Check size={14} />}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="language-selector-container" ref={dropdownRef}>
            <button
                className={`lang-selector-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="lang-flag">{currentLanguage.flag}</span>
                <span className="lang-code">{currentLanguage.code.toUpperCase()}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={14} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="lang-dropdown-menu"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`lang-dropdown-item ${i18n.language === lang.code ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <span className="lang-flag">{lang.flag}</span>
                                <span className="lang-name">{lang.name}</span>
                                {i18n.language === lang.code && (
                                    <motion.div layoutId="check">
                                        <Check size={14} className="check-icon" />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
