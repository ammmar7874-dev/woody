import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Coffee, Pencil, Hammer, Truck } from 'lucide-react';
import './DesignJourney.css';

const DesignJourney = () => {
    const { t } = useTranslation();

    const steps = [
        {
            id: 1,
            icon: <Coffee size={32} />,
            title: t('step_1'),
            desc: "We start with a conversation over coffee, understanding your needs and space."
        },
        {
            id: 2,
            icon: <Pencil size={32} />,
            title: t('step_2'),
            desc: "Collaborative sketching and 3D modeling to visualize your custom piece."
        },
        {
            id: 3,
            icon: <Hammer size={32} />,
            title: t('step_3'),
            desc: "Our master artisans bring the design to life using traditional techniques."
        },
        {
            id: 4,
            icon: <Truck size={32} />,
            title: t('step_4'),
            desc: "Careful delivery and white-glove integration into your beautiful home."
        }
    ];

    return (
        <section className="journey-section section-padding">
            <div className="container">
                <div className="journey-header">
                    <h2 className="section-title">{t('steps_title')}</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="steps-grid">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="step-card"
                        >
                            <div className="step-icon-wrapper">
                                {step.icon}
                                <span className="step-number">{step.id}</span>
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DesignJourney;
