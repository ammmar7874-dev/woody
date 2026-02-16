import React, { createContext, useState, useContext } from 'react';

const QuoteContext = createContext();

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider = ({ children }) => {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [quoteMode, setQuoteMode] = useState('special'); // 'special' or 'product'
    const [productData, setProductData] = useState(null);

    const openQuoteModal = (mode = 'special', product = null) => {
        setQuoteMode(mode);
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
