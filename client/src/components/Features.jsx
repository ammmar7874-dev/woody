import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Hammer, Leaf } from 'lucide-react';
import './Features.css';

const Features = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <Leaf size={40} />,
            title: t('feat_1_title'),
            desc: t('feat_1_desc')
        },
        {
            icon: <Hammer size={40} />,
            title: t('feat_2_title'),
            desc: t('feat_2_desc')
        },
        {
            icon: <Shield size={40} />,
            title: t('feat_3_title'),
            desc: t('feat_3_desc')
        }
    ];

    return (
        <section className="features-section section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="features-header"
                >
                    <h2 className="section-title">{t('feat_title')}</h2>
                </motion.div>

                <div className="features-grid">
                    {features.map((feat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="feature-card"
                        >
                            <div className="feature-icon">
                                {feat.icon}
                            </div>
                            <h3 className="feature-card-title">{feat.title}</h3>
                            <p className="feature-card-desc">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
