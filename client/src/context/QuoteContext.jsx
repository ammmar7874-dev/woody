import React, { createContext, useState, useContext } from 'react';

const QuoteContext = createContext();

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider = ({ children }) => {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const openQuoteModal = () => setIsQuoteOpen(true);
    const closeQuoteModal = () => setIsQuoteOpen(false);

    return (
        <QuoteContext.Provider value={{ isQuoteOpen, openQuoteModal, closeQuoteModal }}>
            {children}
        </QuoteContext.Provider>
    );
};
