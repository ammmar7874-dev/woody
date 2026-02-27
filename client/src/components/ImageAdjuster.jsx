import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RotateCw, Maximize, Minus, Plus } from 'lucide-react';
import './ImageAdjuster.css';

/**
 * Professional Image Adjuster Component
 * Uses react-easy-crop for a premium experience
 */
const ImageAdjuster = ({ isOpen, imageSrc, onCancel, onConfirm, aspect = 1 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.putImageData(
            data,
            0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
            0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
        );

        return canvas.toDataURL('image/jpeg', 0.9);
    };

    const handleConfirm = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            onConfirm(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="pro-adjuster-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="pro-adjuster-modal"
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                >
                    <div className="pro-adjuster-header">
                        <div className="header-title">
                            <Maximize size={20} className="accent-icon" />
                            <h3>Perfect Your Image</h3>
                        </div>
                        <button className="close-icon-btn" onClick={onCancel}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="pro-crop-viewport">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            classes={{
                                containerClassName: 'cropper-container',
                                mediaClassName: 'cropper-media',
                                cropAreaClassName: 'cropper-area',
                            }}
                        />
                    </div>

                    <div className="pro-adjuster-footer">
                        <div className="control-row">
                            <div className="control-group">
                                <label>Zoom</label>
                                <div className="slider-container">
                                    <Minus size={14} />
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => setZoom(e.target.value)}
                                        className="pro-slider"
                                    />
                                    <Plus size={14} />
                                </div>
                            </div>
                            <div className="control-group">
                                <label>Rotation</label>
                                <div className="rotation-controls">
                                    <button
                                        className="tool-btn"
                                        onClick={() => setRotation((prev) => (prev + 90) % 360)}
                                    >
                                        <RotateCw size={18} />
                                        <span>Rotate 90°</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pro-action-row">
                            <button className="pro-btn-secondary" onClick={onCancel}>
                                Discard
                            </button>
                            <button className="pro-btn-primary" onClick={handleConfirm}>
                                <Check size={20} />
                                Apply & Save
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageAdjuster;
