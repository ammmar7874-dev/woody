import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { t, i18n } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="product-card"
        >
            <div className="product-image-box">
                <img src={product.image} alt={product.name} />
                <div className="product-hover-overlay">
                    <Link to={`/product/${product.id}`} className="details-btn">{t('btn_details')}</Link>
                </div>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product[`name_${i18n.language}`] || product.name}</h3>
                <p>{product[`description_${i18n.language}`] || product.shortDesc || product.description}</p>
                <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <Link to={`/product/${product.id}`} className="icon-link">
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
