import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Truck, Shield, ArrowRight, Check } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import './ProductDetail.css';
import { useTranslation } from 'react-i18next';

import QuoteModal from '../components/QuoteModal';

const ProductDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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

    if (loading) return <div className="loading" style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading product details...</div>;
    if (!product) return <div className="loading" style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Product not found.</div>;

    // Mock multiple images
    const images = [
        product.image,
        'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80',
    ];

    return (
        <div className="product-detail-page">
            <div className="container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} /> Back to Collection
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
                    </div>

                    <div className="product-info-panel">
                        <span className="product-category-badge">{product.category}</span>
                        <h1>{product.name}</h1>
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
                            {product.description} Handcrafted from sustainable sources, this piece embodies the true spirit of artisanal woodworking. Custom dimensions available upon request.
                        </p>

                        <div className="specs-box">
                            <h3>{t('pd_desc')}</h3>
                            <ul>
                                <li><strong>{t('pd_material')}:</strong> Premium {product.name.includes('Walnut') ? 'Walnut' : 'Oak'}</li>
                                <li><strong>{t('pd_finish')}:</strong> Matte Oil Wax</li>
                                <li><strong>{t('pd_dimensions')}:</strong> Custom to fit your space</li>
                                <li><strong>Production Time:</strong> 4-6 Weeks</li>
                            </ul>
                        </div>

                        <div className="action-area">
                            <button
                                className="primary-btn request-offer-btn"
                                onClick={() => setIsQuoteModalOpen(true)}
                            >
                                {t('cta_quote')}
                            </button>
                            <p className="secure-note">
                                <Shield size={16} /> Secure Artisanal Guarantee
                            </p>
                        </div>

                        <div className="delivery-info">
                            <Truck size={24} />
                            <div>
                                <h4>White Glove Delivery</h4>
                                <p>We deliver and assemble right in your room of choice.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
            />
        </div>
    );
};

export default ProductDetail;
