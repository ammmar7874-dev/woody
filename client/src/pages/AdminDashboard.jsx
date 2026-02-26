import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, Users, Settings, LogOut,
    TrendingUp, DollarSign, ShoppingBag, Plus, Bell,
    Search, User, Image, ArrowLeft, Mail, Phone,
    Shield, MapPin, Save, Menu, X, Upload, AlertCircle, Check
} from 'lucide-react';
import './AdminDashboard.css';

import { db, auth } from '../firebase/config';
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { fileToBase64 } from '../utils/fileToBase64';
import { compressImage } from '../utils/compressImage';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name_en: '', name_tr: '', price: '', category: 'Living', stock: '',
        description_en: '', description_tr: '',
        dimensions_en: '', dimensions_tr: '',
        finishing_en: '', finishing_tr: '',
        material_en: '', material_tr: '',
        image: '', images: []
    });
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!newProduct.name_en?.trim()) newErrors.name_en = "English name is required";
        if (!newProduct.name_tr?.trim()) newErrors.name_tr = "Turkish name is required";

        // Price check
        if (!newProduct.price || isNaN(newProduct.price) || Number(newProduct.price) <= 0) {
            newErrors.price = "Valid price is required";
        }

        // Stock check - allow 0 but not empty/NaN
        if (newProduct.stock === '' || isNaN(newProduct.stock) || Number(newProduct.stock) < 0) {
            newErrors.stock = "Valid stock is required";
        }

        if (!newProduct.category) newErrors.category = "Category is required";
        if (imageFiles.length === 0 && !newProduct.image && (!newProduct.images || newProduct.images.length === 0)) {
            newErrors.image = "At least one product image is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fetch Products Real-time
    useEffect(() => {
        const q = query(collection(db, "products"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const prods = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProducts(prods);
        });
        return () => unsubscribe();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        console.log("DEBUG: handleAddProduct started");
        if (!validateForm()) {
            console.log("DEBUG: Validation failed", errors);
            return;
        }

        setIsUploading(true);

        try {
            console.log("DEBUG: Starting image conversion to base64. files count:", imageFiles.length);
            let allImages = [...(newProduct.images || [])];

            if (imageFiles.length > 0) {
                for (let i = 0; i < imageFiles.length; i++) {
                    const file = imageFiles[i];
                    console.log(`DEBUG: Compressing image ${i + 1}/${imageFiles.length}:`, file.name);
                    try {
                        const compressedBase64 = await compressImage(file);
                        console.log(`DEBUG: Compression successful for ${file.name}`);
                        allImages.push(compressedBase64);
                    } catch (compError) {
                        console.error(`DEBUG: Compression failed for ${file.name}:`, compError);
                        // Fallback to base64 if compression fails
                        const base64String = await fileToBase64(file);
                        allImages.push(base64String);
                    }
                }
            }
            console.log("DEBUG: Image conversion process finished. All images:", allImages.length);

            const mainImage = allImages.length > 0 ? allImages[0] : (newProduct.image || '');

            // Sanitize product data
            const productData = {
                name_en: newProduct.name_en || '',
                name_tr: newProduct.name_tr || '',
                name: newProduct.name_en || '',
                description_en: newProduct.description_en || '',
                description_tr: newProduct.description_tr || '',
                description: newProduct.description_en || '',
                price: Number(newProduct.price),
                category: newProduct.category || 'Living',
                stock: Number(newProduct.stock),
                dimensions_en: newProduct.dimensions_en || '',
                dimensions_tr: newProduct.dimensions_tr || '',
                finishing_en: newProduct.finishing_en || '',
                finishing_tr: newProduct.finishing_tr || '',
                material_en: newProduct.material_en || '',
                material_tr: newProduct.material_tr || '',
                image: mainImage,
                images: allImages,
                status: Number(newProduct.stock) > 0 ? 'Active' : 'Out of Stock',
                updatedAt: new Date().toISOString()
            };

            // Firestore Size Check (1MB Limit)
            const dataSize = new Blob([JSON.stringify(productData)]).size;
            console.log(`DEBUG: Estimated product data size: ${dataSize} bytes`);
            if (dataSize > 1000000) {
                alert(`Error: Product data is too large (${(dataSize / 1024 / 1024).toFixed(2)}MB). Firestore limit is 1MB. Please use fewer images or smaller file sizes.`);
                setIsUploading(false);
                return;
            }

            console.log("DEBUG: productData prepared:", productData);

            if (editingId) {
                console.log("DEBUG: Updating existing product in Firestore:", editingId);
                await updateDoc(doc(db, "products", editingId), productData);
            } else {
                console.log("DEBUG: Adding new product to Firestore");
                productData.createdAt = new Date().toISOString();
                await addDoc(collection(db, "products"), productData);
            }

            console.log("DEBUG: Operation successful. Resetting UI.");
            setShowAddModal(false);
            setActiveTab('products');
            resetForm();
            alert(editingId ? "Product updated successfully!" : "Product added successfully!");
        } catch (error) {
            console.error("DEBUG: CRITICAL ERROR in handleAddProduct:", error);
            alert(`Error: ${error.message || 'Operation failed. Please check your server and try again.'}`);
        } finally {
            console.log("DEBUG: handleAddProduct finished");
            setIsUploading(false);
        }
    };

    const resetForm = () => {
        setNewProduct({
            name_en: '', name_tr: '', price: '', category: 'Living', stock: '',
            description_en: '', description_tr: '',
            dimensions_en: '', dimensions_tr: '',
            finishing_en: '', finishing_tr: '',
            material_en: '', material_tr: '',
            image: '', images: []
        });
        setImageFiles([]);
        setEditingId(null);
        setErrors({});
    };

    const handleEditClick = (product) => {
        setNewProduct({
            ...product,
            images: product.images || (product.image ? [product.image] : [])
        });
        setEditingId(product.id);
        setActiveTab('addProduct');
        setImageFiles([]);
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const totalImages = (newProduct.images?.length || 0) + imageFiles.length + files.length;

            if (totalImages > 5) {
                alert("Only 5 images allowed per product.");
                // Still add images up to the limit of 5
                const allowedCount = 5 - ((newProduct.images?.length || 0) + imageFiles.length);
                if (allowedCount > 0) {
                    setImageFiles(prev => [...prev, ...files.slice(0, allowedCount)]);
                }
                return;
            }

            setImageFiles(prev => [...prev, ...files]);
        }
    };


    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteDoc(doc(db, "products", id));
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product");
            }
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "quotes", id), {
                status: newStatus,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const removeExistingImage = (index) => {
        const updatedImages = newProduct.images.filter((_, i) => i !== index);
        setNewProduct({
            ...newProduct,
            images: updatedImages,
            image: updatedImages.length > 0 ? updatedImages[0] : ''
        });
    };

    const removeNewFile = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const quotes = [];
            querySnapshot.forEach((doc) => {
                quotes.push({ ...doc.data(), _id: doc.id });
            });
            setRequests(quotes);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        pendingRequests: 0,
        chartData: []
    });

    useEffect(() => {
        if (requests.length === 0) return;

        // 1. Calculate General Stats
        const totalOrders = requests.length;
        const pendingRequests = requests.filter(r => r.status === 'pending').length;

        // 2. Calculate Revenue
        const totalRevenue = requests.reduce((acc, r) => {
            if (r.productDetails?.price) return acc + Number(r.productDetails.price);
            if (r.productDetails?.id) {
                const p = products.find(prod => prod.id === r.productDetails.id);
                return acc + (p ? Number(p.price) : 0);
            }
            return acc;
        }, 0);

        // 3. Generate Chart Data (Last 7 Days)
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return {
                date: d.toLocaleDateString('en-US', { weekday: 'short' }),
                fullDate: d.toDateString(),
                count: 0
            };
        }).reverse();

        requests.forEach(r => {
            if (!r.createdAt) return;
            const dStr = new Date(r.createdAt).toDateString();
            const dayIndex = last7Days.findIndex(d => d.fullDate === dStr);
            if (dayIndex !== -1) {
                last7Days[dayIndex].count += 1;
            }
        });

        const maxCount = Math.max(...last7Days.map(d => d.count), 1);
        const chartData = last7Days.map(d => ({
            ...d,
            percent: (d.count / maxCount) * 100
        }));

        setStats({
            totalRevenue,
            totalOrders,
            pendingRequests,
            chartData
        });
    }, [requests, products]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 }
        },
        exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <motion.div
                        key="overview"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="dashboard-grid"
                    >
                        <motion.div variants={itemVariants} className="stat-card glass-card">
                            <div className="stat-icon-bg purple"><ShoppingBag size={24} /></div>
                            <div className="stat-info">
                                <h3>Total Orders</h3>
                                <p className="stat-value">{stats.totalOrders}</p>
                                <span className="stat-trend positive"><TrendingUp size={14} /> Total Requests</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="stat-card glass-card">
                            <div className="stat-icon-bg green"><DollarSign size={24} /></div>
                            <div className="stat-info">
                                <h3>Estimated Revenue</h3>
                                <p className="stat-value">${stats.totalRevenue.toLocaleString()}</p>
                                <span className="stat-trend positive"><TrendingUp size={14} /> From Quotes</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="stat-card glass-card">
                            <div className="stat-icon-bg orange"><Users size={24} /></div>
                            <div className="stat-info">
                                <h3>Pending Requests</h3>
                                <p className="stat-value">{stats.pendingRequests}</p>
                                <span className="stat-trend warning">Action Required</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="dashboard-chart glass-card full-width">
                            <h3>Request Activity (Last 7 Days)</h3>
                            <div className="fake-chart">
                                {stats.chartData.length > 0 ? stats.chartData.map((d, i) => (
                                    <div
                                        key={i}
                                        className="bar"
                                        style={{ height: `${Math.max(d.percent, 5)}%` }}
                                        title={`${d.count} requests on ${d.date}`}
                                    ></div>
                                )) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                        Loading activity data...
                                    </div>
                                )}
                            </div>
                            <div className="chart-labels">
                                {stats.chartData.map((d, i) => (
                                    <span key={i}>{d.date}</span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            case 'products':
                return (
                    <motion.div
                        key="products"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="table-section glass-card"
                    >
                        <div className="table-header">
                            <div>
                                <h2>Product Management</h2>
                                <p>Manage your catalog and inventory</p>
                            </div>
                            <button className="gold-btn" onClick={() => setActiveTab('addProduct')}><Plus size={18} /> Add Product</button>
                        </div>

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((p, i) => (
                                        <motion.tr key={p.id} variants={itemVariants} custom={i}>
                                            <td className="fw-600">{p.name}</td>
                                            <td>{p.category}</td>
                                            <td>${p.price}</td>
                                            <td>{p.stock} units</td>
                                            <td><span className="status-badge active">{p.status}</span></td>
                                            <td>
                                                <button className="action-btn" onClick={() => handleEditClick(p)} style={{ marginRight: '0.5rem' }}>Edit</button>
                                                <button className="action-btn delete-btn" onClick={() => handleDeleteProduct(p.id)} style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none' }}>Delete</button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                );
            case 'addProduct':
                return (
                    <motion.div
                        key="addProduct"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="form-section"
                    >

                        <div className="section-header" style={{ marginBottom: '2rem' }}>
                            <button className="back-btn" onClick={() => { setActiveTab('products'); resetForm(); }}><ArrowLeft size={18} /> Back to Products</button>
                            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                        </div>

                        <form onSubmit={handleAddProduct} className="add-product-container">
                            {/* Left Column: Form Details */}
                            <div className="product-form-card">
                                <h3 style={{ marginBottom: '1.5rem', color: '#2d3748' }}>Product Details</h3>
                                <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div className={`input-field ${errors.name_en ? 'error' : ''}`}>
                                            <label>Product Name (EN)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Handmade Oak Desk"
                                                value={newProduct.name_en}
                                                onChange={(e) => {
                                                    setNewProduct({ ...newProduct, name_en: e.target.value });
                                                    if (errors.name_en) setErrors({ ...errors, name_en: null });
                                                }}
                                            />
                                            {errors.name_en && <span className="error-message"><AlertCircle size={14} /> {errors.name_en}</span>}
                                        </div>
                                        <div className={`input-field ${errors.name_tr ? 'error' : ''}`}>
                                            <label>Ürün Adı (TR)</label>
                                            <input
                                                type="text"
                                                placeholder="örn. El Yapımı Meşe Masa"
                                                value={newProduct.name_tr}
                                                onChange={(e) => {
                                                    setNewProduct({ ...newProduct, name_tr: e.target.value });
                                                    if (errors.name_tr) setErrors({ ...errors, name_tr: null });
                                                }}
                                            />
                                            {errors.name_tr && <span className="error-message"><AlertCircle size={14} /> {errors.name_tr}</span>}
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div className={`input-field ${errors.price ? 'error' : ''}`}>
                                            <label>Price ($)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={newProduct.price}
                                                onChange={(e) => {
                                                    setNewProduct({ ...newProduct, price: e.target.value });
                                                    if (errors.price) setErrors({ ...errors, price: null });
                                                }}
                                            />
                                            {errors.price && <span className="error-message"><AlertCircle size={14} /> {errors.price}</span>}
                                        </div>
                                        <div className={`input-field ${errors.stock ? 'error' : ''}`}>
                                            <label>Stock</label>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={newProduct.stock}
                                                onChange={(e) => {
                                                    setNewProduct({ ...newProduct, stock: e.target.value });
                                                    if (errors.stock) setErrors({ ...errors, stock: null });
                                                }}
                                            />
                                            {errors.stock && <span className="error-message"><AlertCircle size={14} /> {errors.stock}</span>}
                                        </div>
                                    </div>

                                    <div className={`input-field ${errors.category ? 'error' : ''}`}>
                                        <label>Category</label>
                                        <select
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        >
                                            <option value="Living">Living Room</option>
                                            <option value="Office">Office</option>
                                            <option value="Dining">Dining</option>
                                            <option value="Bedroom">Bedroom</option>
                                        </select>
                                    </div>

                                    <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                                        <div className="input-field">
                                            <label>Description (EN)</label>
                                            <textarea
                                                rows="3"
                                                placeholder="Describe the product in English..."
                                                value={newProduct.description_en || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, description_en: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <div className="input-field">
                                            <label>Açıklama (TR)</label>
                                            <textarea
                                                rows="3"
                                                placeholder="Ürün açıklamasını Türkçe giriniz..."
                                                value={newProduct.description_tr || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, description_tr: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                                        <div className="input-field">
                                            <label>Dimensions (EN)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 120x60x75 cm"
                                                value={newProduct.dimensions_en || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, dimensions_en: e.target.value })}
                                            />
                                        </div>
                                        <div className="input-field">
                                            <label>Ölçüler (TR)</label>
                                            <input
                                                type="text"
                                                placeholder="örn. 120x60x75 cm"
                                                value={newProduct.dimensions_tr || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, dimensions_tr: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                                        <div className="input-field">
                                            <label>Finishing (EN)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Matte Oil"
                                                value={newProduct.finishing_en || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, finishing_en: e.target.value })}
                                            />
                                        </div>
                                        <div className="input-field">
                                            <label>Bitiş / Cila (TR)</label>
                                            <input
                                                type="text"
                                                placeholder="örn. Mat Yağ"
                                                value={newProduct.finishing_tr || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, finishing_tr: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                                        <div className="input-field">
                                            <label>Material (EN)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Solid Walnut"
                                                value={newProduct.material_en || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, material_en: e.target.value })}
                                            />
                                        </div>
                                        <div className="input-field">
                                            <label>Malzeme (TR)</label>
                                            <input
                                                type="text"
                                                placeholder="örn. Masif Ceviz"
                                                value={newProduct.material_tr || ''}
                                                onChange={(e) => setNewProduct({ ...newProduct, material_tr: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Media */}
                            <div className="product-media-card">
                                <h3 style={{ marginBottom: '1.5rem', color: '#2d3748' }}>Product Media</h3>

                                <div className="multi-image-preview-grid">
                                    {/* Existing Images */}
                                    {newProduct.images && newProduct.images.map((img, idx) => (
                                        <div key={`existing-${idx}`} className="image-preview-container small">
                                            <img src={img} alt="Existing" />
                                            <button type="button" className="remove-image-btn" onClick={() => removeExistingImage(idx)}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Newly Selected Files */}
                                    {imageFiles.map((file, idx) => (
                                        <div key={`new-${idx}`} className="image-preview-container small">
                                            <img src={URL.createObjectURL(file)} alt="New" />
                                            <button type="button" className="remove-image-btn" onClick={() => removeNewFile(idx)}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Add More Button / Drop Zone */}
                                    <div className={`image-upload-wrapper mini ${errors.image ? 'error' : ''}`}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                        />
                                        <Plus size={24} />
                                        <span style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>Add</span>
                                    </div>
                                </div>
                                {errors.image && <span className="error-message" style={{ justifyContent: 'center' }}><AlertCircle size={14} /> {errors.image}</span>}

                                <div className="form-actions" style={{ marginTop: '2rem', borderTop: 'none', padding: 0, justifyContent: 'space-between' }}>
                                    <button type="button" className="cancel-btn" style={{ width: '48%' }} onClick={() => { setActiveTab('products'); resetForm(); }}>Cancel</button>
                                    <button type="submit" className="gold-btn" style={{ width: '48%', justifyContent: 'center' }} disabled={isUploading}>
                                        {isUploading ? 'Saving...' : (editingId ? 'Update Product' : 'Save Product')}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                );
            case 'requests':
                return (
                    <motion.div
                        key="requests"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="table-section glass-card"
                    >
                        <div className="table-header">
                            <div>
                                <h2>Quote Requests & Messages</h2>
                                <p>Track and respond to customer inquiries</p>
                            </div>
                            <div className="search-bar">
                                <Search size={18} />
                                <input type="text" placeholder="Search requests..." />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Details</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.length > 0 ? requests.map((r, i) => (
                                        <motion.tr key={r._id || i} variants={itemVariants} custom={i}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar">{r.name ? r.name[0].toUpperCase() : 'U'}</div>
                                                    <div>
                                                        <div className="fw-600">{r.name}</div>
                                                        <div className="text-sm">{r.email}</div>
                                                        <div className="text-xs">{r.phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-sm">
                                                    {r.productDetails && (
                                                        <div className="requested-item-preview" style={{ display: r.productDetails ? 'flex' : 'none', alignItems: 'center', gap: '10px', marginBottom: '8px', padding: '5px', background: '#f8fafc', borderRadius: '6px' }}>
                                                            {r.productDetails.image && (
                                                                <img src={r.productDetails.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                                            )}
                                                            <div>
                                                                <div style={{ fontWeight: 600, fontSize: '0.75rem' }}>{r.productDetails.name_en || r.productDetails.name}</div>
                                                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Product Request</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <strong>Timeline:</strong> {r.timeline}<br />
                                                    <span className="truncate-text" title={r.description}>{r.description && r.description.substring(0, 30)}...</span>
                                                    {r.fileName && (
                                                        <div style={{ marginTop: '4px' }}>
                                                            <a href={r.file} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                                                View Attachment ({r.fileName})
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'N/A'}</td>
                                            <td>
                                                <select
                                                    className={`status-select ${r.status ? r.status.toLowerCase() : 'pending'}`}
                                                    value={r.status || 'pending'}
                                                    onChange={(e) => handleStatusUpdate(r._id, e.target.value)}
                                                    style={{
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        border: '1px solid #e2e8f0',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="replied">Replied</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <a
                                                        href={`mailto:${r.email}?subject=Re: Your Quote Request - Woodify&body=Hi ${r.name},%0D%0A%0D%0AThank you for your interest in Woodify. We have received your request regarding: "${r.description}".`}
                                                        className="action-btn primary"
                                                        onClick={() => handleStatusUpdate(r._id, 'replied')}
                                                        style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                                                    >
                                                        <Mail size={14} /> Reply
                                                    </a>
                                                    {/* <button className="action-btn">View</button> */}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No requests found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                );
            case 'profile':
                return (
                    <motion.div
                        key="profile"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="profile-section"
                    >
                        <div className="profile-header glass-card">
                            <div className="profile-cover"></div>
                            <div className="profile-info-main">
                                <div className="profile-avatar-large">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" alt="Admin" />
                                    <button className="edit-avatar"><Plus size={16} /></button>
                                </div>
                                <div className="profile-text">
                                    <h2>Admin User</h2>
                                    <p>Super Administrator</p>
                                </div>
                                <button className="gold-btn"><Save size={18} /> Save Profile</button>
                            </div>
                        </div>

                        <div className="profile-grid">
                            <div className="glass-card">
                                <h3>Personal Information</h3>
                                <div className="info-list">
                                    <div className="info-item">
                                        <User size={18} />
                                        <div>
                                            <label>Full Name</label>
                                            <input type="text" defaultValue="Admin User" />
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <Mail size={18} />
                                        <div>
                                            <label>Email Address</label>
                                            <input type="email" defaultValue="admin@woodify.com" />
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <Phone size={18} />
                                        <div>
                                            <label>Phone Number</label>
                                            <input type="tel" defaultValue="+39 036 2542037" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card">
                                <h3>Security & Access</h3>
                                <div className="info-list">
                                    <div className="info-item">
                                        <Shield size={18} />
                                        <div>
                                            <label>Role</label>
                                            <p className="fw-600">Administrator</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <MapPin size={18} />
                                        <div>
                                            <label>Location</label>
                                            <p>Via Ticino, 15, Italy</p>
                                        </div>
                                    </div>
                                    <button className="action-btn" style={{ marginTop: '1rem' }}>Change Password</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'settings':
                return (
                    <motion.div
                        key="settings"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="settings-section glass-card"
                    >
                        <h2>Platform Settings</h2>
                        <div className="settings-grid">
                            <div className="setting-group">
                                <h3>General</h3>
                                <div className="setting-item">
                                    <div>
                                        <h4>Store Name</h4>
                                        <p>Display name for your store front</p>
                                    </div>
                                    <input type="text" defaultValue="WOODIFY" />
                                </div>
                                <div className="setting-item">
                                    <div>
                                        <h4>Maintenance Mode</h4>
                                        <p>Disable front-end access temporarily</p>
                                    </div>
                                    <div className="toggle-switch"></div>
                                </div>
                            </div>

                            <div className="setting-group">
                                <h3>Localization</h3>
                                <div className="setting-item">
                                    <div>
                                        <h4>Default Language</h4>
                                        <p>Select the main language for admin</p>
                                    </div>
                                    <select defaultValue="tr">
                                        <option value="en">English</option>
                                        <option value="tr">Turkish</option>
                                        <option value="it">Italian</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <div>
                                        <h4>Currency</h4>
                                        <p>Set store-wide transaction currency</p>
                                    </div>
                                    <select defaultValue="usd">
                                        <option value="usd">USD ($)</option>
                                        <option value="eur">EUR (€)</option>
                                        <option value="try">TRY (₺)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="setting-group">
                                <h3>Notifications</h3>
                                <div className="setting-item">
                                    <div>
                                        <h4>Email Alerts</h4>
                                        <p>Receive email for new quotes</p>
                                    </div>
                                    <div className="toggle-switch active"></div>
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="gold-btn"><Save size={18} /> Save Settings</button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-layout">
            {/* Mobile Sidebar Overlay */}
            <div className={`admin-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>

            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="admin-logo-row">
                    <div className="admin-logo">
                        <div className="logo-box">W</div>
                        <div className="logo-text">WOODIFY <span>ADMIN</span></div>
                    </div>
                    <button className="close-sidebar-btn" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="admin-nav">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className={activeTab === 'products' || activeTab === 'addProduct' ? 'active' : ''} onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}>
                        <Package size={20} /> Products
                    </button>
                    <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => { setActiveTab('requests'); setIsSidebarOpen(false); }}>
                        <Users size={20} /> Customers
                    </button>
                    <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}>
                        <User size={20} /> Profile
                    </button>
                    <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}>
                        <Settings size={20} /> Settings
                    </button>
                </nav>

                <div className="admin-sidebar-extra">
                    <button className="view-web-btn" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} /> View Website
                    </button>
                </div>

                <div className="admin-footer">
                    <button className="logout-btn"><LogOut size={18} /> Sign Out</button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <button className="menu-btn" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <h2 className="page-title">{activeTab === 'addProduct' ? 'Add Product' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                    </div>
                    <div className="topbar-actions">
                        <button className="icon-btn" onClick={() => setActiveTab('settings')}><Search size={20} /></button>
                        <button className="icon-btn"><Bell size={20} /><span className="notification-dot"></span></button>
                        <div className="admin-profile" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" alt="Admin" />
                            <span className="desktop-only">Admin User</span>
                        </div>
                    </div>
                </header>

                <div className="admin-content-wrapper">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
export default AdminDashboard;
