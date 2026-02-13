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
            icon: <Coffee size={40} />,
            title: t('step_1'),
            desc: "We start with a conversation over coffee, understanding your needs and space."
        },
        {
            id: 2,
            icon: <Pencil size={40} />,
            title: t('step_2'),
            desc: "Collaborative sketching and 3D modeling to visualize your custom piece."
        },
        {
            id: 3,
            icon: <Hammer size={40} />,
            title: t('step_3'),
            desc: "Our master artisans bring the design to life using traditional techniques."
        },
        {
            id: 4,
            icon: <Truck size={40} />,
            title: t('step_4'),
            desc: "Careful delivery and white-glove integration into your beautiful home."
        }
    ];

    return (
        <section className="journey-section section-padding">
            <div className="container">
                <div className="journey-header">
                    <h2 className="section-title">{t('steps_title')}</h2>
                    <p className="journey-subtitle-text">From raw timber to your heirloom piece.</p>
                </div>

                <div className="journey-timeline">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`journey-step ${idx % 2 === 0 ? 'left' : 'right'}`}
                        >
                            <div className="step-content">
                                <div className="step-icon-wrapper">
                                    {step.icon}
                                    <span className="step-number">0{step.id}</span>
                                </div>
                                <div className="step-text">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                            <div className="step-connector"></div>
                        </motion.div>
                    ))}
                    <div className="timeline-line"></div>
                </div>
            </div>
        </section>
    );
};

export default DesignJourney;
