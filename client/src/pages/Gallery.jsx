import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Gallery.css';

import { useTranslation } from 'react-i18next';

const Gallery = () => {
    const { t } = useTranslation();
    const projects = [
        { id: 1, title: t('gallery_proj_1'), img: '/assets/gallery/kitchen.jpg' },
        { id: 2, title: t('gallery_proj_2'), img: '/assets/gallery/vanity.jpg' },
        { id: 3, title: t('gallery_proj_3'), img: '/assets/gallery/desk-suite.jpg' },
        { id: 4, title: t('gallery_proj_4'), img: '/assets/gallery/media-unit.jpg' },
        { id: 5, title: t('gallery_proj_5'), img: '/assets/gallery/scan-dining.jpg' },
        { id: 6, title: t('gallery_proj_6'), img: '/assets/gallery/headboard.jpg' },
    ];

    return (
        <div className="gallery-page">
            <div className="container">
                <div className="gallery-header">
                    <h1 className="section-title">{t('gallery_title')}</h1>
                    <p>{t('gallery_subtitle')}</p>
                </div>

                <div className="gallery-grid">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="gallery-item"
                        >
                            <div className="gallery-image-wrapper">
                                <img src={project.img} alt={project.title} />
                                <div className="gallery-overlay">
                                    <h3>{project.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
