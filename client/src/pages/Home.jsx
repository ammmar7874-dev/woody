import React from 'react';
import Hero from '../components/Hero';
import DesignJourney from '../components/DesignJourney';
import ProductCard from '../components/ProductCard';
import QuoteForm from '../components/QuoteForm';
import { useTranslation } from 'react-i18next';

// Mock data moved here or imported
const MOCK_PRODUCTS = [
    { id: 1, name: 'The Walnut Desk', category: 'OFFICE', shortDesc: 'Solid walnut with brass inlay.', image: '/assets/products/walnut-desk.jpg', price: '$2,400' },
    { id: 2, name: 'Minimalist Oak Chair', category: 'DINING', shortDesc: 'Light oak with natural finish.', image: '/assets/products/oak-chair.jpg', price: '$850' },
    { id: 3, name: 'Reclaimed Root Table', category: 'LIVING', shortDesc: 'A unique centerpiece for any home.', image: '/assets/products/root-table.jpg', price: '$3,200' },
    { id: 4, name: 'Mid-Century Console', category: 'LIVING', shortDesc: 'Teak wood with sliding doors.', image: '/assets/products/console.jpg', price: '$1,800' },
    { id: 5, name: 'Artisan Bookshelf', category: 'OFFICE', shortDesc: 'Floor to ceiling custom joinery.', image: '/assets/products/bookshelf.jpg', price: '$4,500' },
    { id: 6, name: 'Live Edge Dining', category: 'DINING', shortDesc: 'Single slab walnut with epoxy.', image: '/assets/products/dining.jpg', price: '$5,200' },
];

const Home = () => {
    const { t } = useTranslation();
    return (
        <>
            <Hero />
            <DesignJourney />
            <section className="section-padding" id="products">
                <div className="container">
                    <div className="collection-header">
                        <h2 className="section-title">{t('section_collection')}</h2>
                        <p>{t('section_collection_sub')}</p>
                    </div>
                    <div className="products-grid">
                        {MOCK_PRODUCTS.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="section-padding quote-section" id="quote">
                <div className="container">
                    <div className="quote-grid">
                        <div className="quote-text">
                            <h2 className="section-title">{t('section_bring_vision')}</h2>
                            <p>{t('section_bring_vision_text')}</p>
                            <ul className="craft-list">
                                <li>{t('craft_1')}</li>
                                <li>{t('craft_2')}</li>
                                <li>{t('craft_3')}</li>
                            </ul>
                        </div>
                        <QuoteForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
export { MOCK_PRODUCTS };
