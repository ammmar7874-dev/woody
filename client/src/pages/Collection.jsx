import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import CollectionProductCard from '../components/CollectionProductCard';
import './Collection.css';

const Collection = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        'all', 'cat_living', 'cat_dining', 'cat_kitchen', 'cat_bedroom',
        'cat_office', 'cat_kids_teen', 'cat_hallway', 'cat_outdoor',
        'cat_storage', 'cat_decoration', 'cat_new_arrivals', 'cat_sale'
    ];

    useEffect(() => {
        const q = query(collection(db, "products"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const prods = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProducts(prods);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="collection-page">
            <section className="collection-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="collection-header"
                    >
                        <h1 className="collection-title">{t('collection_title')}</h1>
                        <p className="collection-subtitle">
                            {t('collection_subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="filter-section">
                <div className="container">
                    <div className="filter-bar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat === 'all' ? t('cat_all') : t(cat)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="collection-grid-section">
                <div className="container">
                    {loading ? (
                        <div className="collection-loading">{t('loading_product')}</div>
                    ) : (
                        <div className="collection-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <CollectionProductCard product={product} />
                                    </motion.div>
                                ))
                            ) : (
                                <p className="no-products">{t('product_not_found')}</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Collection;
