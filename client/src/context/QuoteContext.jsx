import React, { createContext, useState, useContext } from 'react';

const QuoteContext = createContext();

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider = ({ children }) => {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [quoteMode, setQuoteMode] = useState('special'); // 'special' or 'product'
    const [productData, setProductData] = useState(null);

    const openQuoteModal = (mode = 'special', product = null) => {
        // Ensure mode is a string (prevents issues if used directly as event handler)
        const validMode = typeof mode === 'string' ? mode : 'special';
        setQuoteMode(validMode);
        setProductData(product);
        setIsQuoteOpen(true);
    };

    const closeQuoteModal = () => {
        setIsQuoteOpen(false);
        // Reset after modal animation ends (optional but cleaner)
        setTimeout(() => {
            setQuoteMode('special');
            setProductData(null);
        }, 500);
    };

    return (
        <QuoteContext.Provider value={{ isQuoteOpen, quoteMode, productData, openQuoteModal, closeQuoteModal }}>
            {children}
        </QuoteContext.Provider>
    );
};
