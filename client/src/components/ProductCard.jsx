import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { t, i18n } = useTranslation();
    const displayName = product[`name_${i18n.language}`] || product.name;
    const displayDesc = product[`description_${i18n.language}`] || product.shortDesc || product.description;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="product-card"
        >
            <Link to={`/product/${product.id}`} className="product-image-link">
                <div className="product-image-box">
                    <img src={product.image || null} alt={displayName} loading="lazy" />
                    <div className="product-badge">{product.category}</div>
                    <div className="product-hover-overlay">
                        <span className="view-details-txt">{t('btn_details')}</span>
                    </div>
                </div>
            </Link>

            <div className="product-info">
                <div className="product-main-info">
                    <h3 className="product-title">{displayName}</h3>
                    <p className="product-description">{displayDesc}</p>
                </div>

                <div className="product-footer">
                    <div className="price-wrapper">
                        <span className="currency">$</span>
                        <span className="price-value">{product.price}</span>
                    </div>
                    <Link to={`/product/${product.id}`} className="explore-link">
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
