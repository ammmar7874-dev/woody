import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Truck, Shield, ArrowRight, Check } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import './ProductDetail.css';
import { useTranslation } from 'react-i18next';

import { useQuote } from '../context/QuoteContext.jsx';

const ProductDetail = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const { openQuoteModal } = useQuote();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="loading" style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('loading_product')}</div>;
    if (!product) return <div className="loading" style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('product_not_found')}</div>;

    // Use images from products array if available, otherwise fallback to the single image field
    const images = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <div className="product-detail-page">
            <div className="container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} /> {t('btn_back')}
                </Link>

                <div className="product-layout">
                    <div className="product-gallery">
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="main-image"
                        >
                            <img src={images[selectedImage] || null} alt={product.name} />
                        </motion.div>
                        {images.length > 1 && (
                            <div className="thumbnail-list">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`thumbnail ${selectedImage === idx ? 'active' : ''} `}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <img src={img} alt="" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-info-panel">
                        <div className="product-header-section">
                            <div className="product-meta">
                                <span className="product-category-badge">{t(product.category) || product.category}</span>
                                <span className={`status-badge-detail ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                    {product.stock > 0 ? (i18n.language === 'tr' ? 'Stokta' : 'In Stock') : (i18n.language === 'tr' ? 'Tükendi' : 'Out of Stock')}
                                </span>
                            </div>

                            <h1>{product[`name_${i18n.language}`] || product.name}</h1>

                            <div className="rating">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#c5a059" color="#c5a059" />
                                    ))}
                                </div>
                                <span className="review-count">(12 {t('reviews')})</span>
                            </div>
                        </div>

                        <div className="price-tag">
                            <span className="currency">{t('currency')}</span>
                            <span className="amount">
                                {i18n.language === 'tr' && product.price_tr
                                    ? Number(product.price_tr).toLocaleString()
                                    : Number(product.price).toLocaleString()}
                            </span>
                        </div>

                        <p className="product-description">
                            {product[`description_${i18n.language}`] || product.description}
                        </p>

                        <div className="specs-grid">
                            <div className="spec-item">
                                <span className="spec-label">{t('pd_material')}</span>
                                <span className="spec-value">{product[`material_${i18n.language}`] || product.material_en || (i18n.language === 'tr' ? 'Masif Masif' : 'Solid Wood')}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">{t('pd_finish')}</span>
                                <span className="spec-value">{product[`finishing_${i18n.language}`] || product.finishing_en || (i18n.language === 'tr' ? 'Doğal Yağ' : 'Natural Oil')}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">{t('pd_dimensions')}</span>
                                <span className="spec-value">{product[`dimensions_${i18n.language}`] || (i18n.language === 'tr' ? 'Özel Ölçü' : 'Custom Size')}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">{t('pd_production_time')}</span>
                                <span className="spec-value">4-6 {t('pd_weeks')}</span>
                            </div>
                        </div>

                        <div className="action-area">
                            <button
                                className="primary-btn request-offer-btn"
                                onClick={() => openQuoteModal('product', product)}
                                disabled={product.stock <= 0 && !product.isCustomOrder}
                            >
                                {t('cta_quote')}
                            </button>
                            <div className="trust-badges">
                                <div className="trust-item">
                                    <Shield size={16} /> <span>{t('pd_guarantee') || 'Secure Guarantee'}</span>
                                </div>
                                <div className="trust-item">
                                    <Truck size={16} /> <span>{t('pd_white_glove') || 'White Glove Delivery'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal is handled globally by Navbar */}
        </div>
    );
};

export default ProductDetail;
