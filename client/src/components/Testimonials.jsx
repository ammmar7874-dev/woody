import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    const { t } = useTranslation();

    const reviews = [
        {
            name: "Alessandro Rossi",
            location: "Milan, Italy",
            text: "The walnut desk I ordered is not just furniture; it's a piece of art that has transformed my office. The attention to detail is staggering."
        },
        {
            name: "Sarah Jenkins",
            location: "London, UK",
            text: "Bespoke service at its finest. They kept me updated throughout the crafting process. Highly recommended for anyone seeking quality."
        },
        {
            name: "Marcus Weber",
            location: "Berlin, Germany",
            text: "Incredible craftsmanship. The natural finish on the oak table highlights the wood's beauty perfectly. It will be in our family for ages."
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
