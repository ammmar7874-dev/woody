import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Upload, Send, CheckCircle } from 'lucide-react';
import './QuoteForm.css';

import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const QuoteForm = ({ onClose, isModal }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        file: null,
        timeline: '1-2 Weeks'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, "quotes"), {
                ...formData,
                file: formData.file || null,
                fileName: formData.fileName || null,
                createdAt: new Date().toISOString(),
                status: 'pending'
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting quote. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
            >
                <CheckCircle size={64} color="var(--secondary)" />
                <h2>{t('q_success_title')}</h2>
                <p>{t('q_success_text')}</p>
                <div className="success-actions">
                    <button className="primary-btn" onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                        setFormData({ ...formData, description: '', file: null });
                    }}>{t('q_new')}</button>
                    {isModal && (
                        <button className="secondary-btn" onClick={onClose} style={{ marginTop: '1rem' }}>
                            Close
                        </button>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <div className={`quote-form-container ${isModal ? 'modal-mode' : ''}`}>
            <div className="form-header">
                <h3>{t('quote_title')}</h3>
                <div className="step-indicator">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`step-dot ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`} />
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="form-step"
                        >
                            <div className="input-group">
                                <label>{t('q_name')}</label>
                                <input
                                    type="text"
                                    placeholder={t('q_name')}
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>{t('q_email')}</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>{t('q_phone')}</label>
                                <input
                                    type="tel"
                                    placeholder="+90 ..."
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-nav single-btn">
                                <button type="button" className="primary-btn next-btn" onClick={handleNext}>{t('q_next')}</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="form-step"
                        >
                            <div className="input-group">
                                <label>{t('q_desc_label')}</label>
                                <textarea
                                    rows="4"
                                    placeholder={t('q_desc_ph')}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="input-group file-upload-group">
                                <label>{t('q_upload')}</label>
                                <div className="upload-box">
                                    <Upload size={24} />
                                    <span>{t('q_upload_sub')}</span>
                                    <input
                                        type="file"
                                        className="file-input"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, file: reader.result, fileName: file.name });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    {formData.fileName && <p className="file-name" style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#4a5568' }}>{formData.fileName}</p>}
                                </div>
                            </div>
                            <div className="form-nav">
                                <button type="button" className="secondary-btn" onClick={handleBack}>{t('q_back')}</button>
                                <button type="button" className="primary-btn" onClick={handleNext}>{t('q_next')}</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="form-step"
                        >
                            <div className="input-group">
                                <label>{t('q_timeline')}</label>
                                <select
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                >
                                    <option>{t('q_t_1')}</option>
                                    <option>{t('q_t_2')}</option>
                                    <option>{t('q_t_3')}</option>
                                </select>
                            </div>
                            <p className="form-note">By submitting, you agree to our privacy policy and artisanal terms.</p>
                            <div className="form-nav">
                                <button type="button" className="secondary-btn" onClick={handleBack}>{t('q_back')}</button>
                                <button type="submit" className="primary-btn submit-btn">
                                    <Send size={18} />
                                    {t('q_submit')}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default QuoteForm;
