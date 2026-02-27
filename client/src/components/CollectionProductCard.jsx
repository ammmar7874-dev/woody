import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CollectionProductCard.css';

const CollectionProductCard = ({ product }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const displayName = product[`name_${i18n.language}`] || product.name;
    const displayDesc = product[`description_${i18n.language}`] || product.shortDesc || product.description;

    return (
        <div className="collection-card">
            <div className="collection-card-image" onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.image || null} alt={displayName} loading="lazy" />
                <div className="collection-badge">{t(product.category) || product.category}</div>
            </div>

            <div className="collection-card-content">
                <div className="collection-card-main">
                    <h3 className="collection-card-title">{displayName}</h3>
                    <p className="collection-card-desc">{displayDesc}</p>
                </div>

                <div className="collection-card-footer">
                    <div className="collection-price-wrapper">
                        <span className="collection-currency">{t('currency')}</span>
                        <span className="collection-price-value">
                            {i18n.language === 'tr' && product.price_tr
                                ? Number(product.price_tr).toLocaleString()
                                : Number(product.price).toLocaleString()}
                        </span>
                    </div>
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
