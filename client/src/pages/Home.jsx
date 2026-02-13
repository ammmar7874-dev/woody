import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import DesignJourney from '../components/DesignJourney';
import ProductCard from '../components/ProductCard';
import QuoteForm from '../components/QuoteForm';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import { useTranslation } from 'react-i18next';

import { db } from '../firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Home = () => {
    const { t } = useTranslation();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const q = query(collection(db, "products"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const prods = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProducts(prods);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <Features />
            <DesignJourney />

            <section className="section-padding" id="products">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="collection-header"
                    >
                        <h2 className="section-title">{t('section_collection')}</h2>
                        <p>{t('section_collection_sub')}</p>
                    </motion.div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>
                    ) : (
                        <div className="products-grid">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', width: '100%' }}>No products found.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Testimonials />

            <section className="section-padding quote-section" id="quote">
                <div className="container">
                    <div className="quote-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="quote-text"
                        >
                            <h2 className="section-title">{t('section_bring_vision')}</h2>
                            <p>{t('section_bring_vision_text')}</p>
                            <ul className="craft-list">
                                <li>{t('craft_1')}</li>
                                <li>{t('craft_2')}</li>
                                <li>{t('craft_3')}</li>
                            </ul>
                        </motion.div>
                        <QuoteForm />
                    </div>
                </div>
            </section>

            <FAQ />
            <Newsletter />
        </motion.div>
    );
};

export default Home;

