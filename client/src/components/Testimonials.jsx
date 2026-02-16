import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    const { t } = useTranslation();

    const reviews = [
        {
            name: t('test_1_name'),
            location: t('test_1_loc'),
            text: t('test_1_text')
        },
        {
            name: t('test_2_name'),
            location: t('test_2_loc'),
            text: t('test_2_text')
        },
        {
            name: t('test_3_name'),
            location: t('test_3_loc'),
            text: t('test_3_text')
        }
    ];

    return (
        <section className="testimonials-section section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="testimonials-header"
                >
                    <h2 className="section-title">{t('test_title')}</h2>
                </motion.div>

                <div className="testimonials-grid">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="testimonial-card"
                        >
                            <div className="quote-icon">
                                <Quote size={32} fill="currentColor" opacity={0.2} />
                            </div>
                            <p className="testimonial-text">"{review.text}"</p>
                            <div className="testimonial-author">
                                <span className="author-name">{review.name}</span>
                                <span className="author-location">{review.location}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
