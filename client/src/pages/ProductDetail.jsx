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
                            <img src={images[selectedImage]} alt={product.name} />
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
                        <span className="product-category-badge">{product.category}</span>
                        <h1>{product[`name_${i18n.language}`] || product.name}</h1>
                        <div className="rating">
                            <Star size={18} fill="#c5a059" color="#c5a059" />
                            <Star size={18} fill="#c5a059" color="#c5a059" />
                            <Star size={18} fill="#c5a059" color="#c5a059" />
                            <Star size={18} fill="#c5a059" color="#c5a059" />
                            <Star size={18} fill="#c5a059" color="#c5a059" />
                            <span>(12 Reviews)</span>
                        </div>

                        <p className="price">{product.price}</p>
                        <p className="description">
                            {product[`description_${i18n.language}`] || product.description}
                        </p>

                        <div className="specs-box">
                            <h3>{t('pd_desc')}</h3>
                            <ul>
                                <li><strong>{t('pd_material')}:</strong> {product[`material_${i18n.language}`] || product.material_en || (product.name.includes('Walnut') || product.name.includes('Ceviz') ? (i18n.language === 'tr' ? 'Ceviz' : 'Walnut') : (i18n.language === 'tr' ? 'Meşe' : 'Oak'))}</li>
                                <li><strong>{t('pd_finish')}:</strong> {product[`finishing_${i18n.language}`] || product.finishing_en || (i18n.language === 'tr' ? 'Mat Yağ Vakslı' : 'Matte Oil Wax')}</li>
                                <li><strong>{t('pd_dimensions')}:</strong> {product[`dimensions_${i18n.language}`] || (i18n.language === 'tr' ? 'Alanınıza göre özel ölçü' : 'Custom to fit your space')}</li>
                                <li><strong>{t('pd_production_time')}:</strong> 4-6 {t('pd_weeks')}</li>
                            </ul>
                        </div>

                        <div className="action-area">
                            <button
                                className="primary-btn request-offer-btn"
                                onClick={() => openQuoteModal('product', product)}
                            >
                                {t('cta_quote')}
                            </button>
                            <p className="secure-note">
                                <Shield size={16} /> {t('pd_guarantee')}
                            </p>
                        </div>

                        <div className="delivery-info">
                            <Truck size={24} />
                            <div>
                                <h4>{t('pd_white_glove')}</h4>
                                <p>{t('pd_delivery_desc')}</p>
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
