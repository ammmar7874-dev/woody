import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CollectionProductCard.css';

const CollectionProductCard = ({ product }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="collection-card">
            <div className="collection-card-image">
                <img src={product.image} alt={product.name} onClick={() => navigate(`/product/${product.id}`)} />
            </div>

            <div className="collection-card-content">
                <span className="collection-card-category">{product.category}</span>
                <h3 className="collection-card-title">{product[`name_${i18n.language}`] || product.name}</h3>
                <p className="collection-card-desc">{product[`description_${i18n.language}`] || product.description}</p>

                <div className="collection-card-footer">
                    <span className="collection-card-price">{product.price}</span>
                    <button
                        className="collection-explore-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        {t('btn_explore') || 'EXPLORE'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollectionProductCard;
