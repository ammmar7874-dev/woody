import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, Users, Settings, LogOut,
    TrendingUp, DollarSign, ShoppingBag, Plus, Bell,
    Search, User, Image, Globe, ArrowLeft, Mail, Phone,
    Shield, MapPin, Save
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [products, setProducts] = useState([
        { id: 1, name: 'The Walnut Desk', price: 2400, category: 'Office', stock: 5, status: 'Active' },
        { id: 2, name: 'Minimalist Oak Chair', price: 850, category: 'Dining', stock: 12, status: 'Active' },
        { id: 3, name: 'Reclaimed Root Table', price: 3200, category: 'Living', stock: 1, status: 'Active' },
    ]);

    const [requests, setRequests] = useState([
        { id: 101, user: 'Ahmet Yilmaz', type: 'Custom Quote', status: 'Pending', date: '2024-02-10', email: 'ahmet@example.com' },
        { id: 102, user: 'John Doe', type: 'Product Offer', status: 'Reviewed', date: '2024-02-09', email: 'john@example.com' },
        { id: 103, user: 'Sarah Smith', type: 'Custom Quote', status: 'In Progress', date: '2024-02-08', email: 'sarah@example.com' },
    ]);

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
                                <p className="stat-value">124</p>
                                <span className="stat-trend positive"><TrendingUp size={14} /> +12% this month</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="stat-card glass-card">
                            <div className="stat-icon-bg green"><DollarSign size={24} /></div>
                            <div className="stat-info">
                                <h3>Revenue</h3>
                                <p className="stat-value">$45,200</p>
                                <span className="stat-trend positive"><TrendingUp size={14} /> +8% this month</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="stat-card glass-card">
                            <div className="stat-icon-bg orange"><Users size={24} /></div>
                            <div className="stat-info">
                                <h3>Pending Requests</h3>
                                <p className="stat-value">18</p>
                                <span className="stat-trend warning">Action Required</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="dashboard-chart glass-card full-width">
                            <h3>Revenue Overview</h3>
                            <div className="fake-chart">
                                <div className="bar" style={{ height: '40%' }}></div>
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '45%' }}></div>
                                <div className="bar" style={{ height: '80%' }}></div>
                                <div className="bar" style={{ height: '55%' }}></div>
                                <div className="bar" style={{ height: '90%' }}></div>
                                <div className="bar" style={{ height: '70%' }}></div>
                            </div>
                            <div className="chart-labels">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
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
                                            <td><button className="action-btn">Edit</button></td>
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
                        className="form-section glass-card"
                    >
                        <div className="section-header">
                            <button className="back-btn" onClick={() => setActiveTab('products')}><ArrowLeft size={18} /> Back</button>
                            <h2>Add New Product</h2>
                        </div>
                        <form className="admin-form">
                            <div className="form-grid">
                                <div className="input-field">
                                    <label>Product Name</label>
                                    <input type="text" placeholder="e.g. Handmade Oak Desk" />
                                </div>
                                <div className="input-field">
                                    <label>Category</label>
                                    <select>
                                        <option>Living Room</option>
                                        <option>Office</option>
                                        <option>Dining</option>
                                        <option>Bedroom</option>
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>Price ($)</label>
                                    <input type="number" placeholder="0.00" />
                                </div>
                                <div className="input-field">
                                    <label>Stock Quantity</label>
                                    <input type="number" placeholder="0" />
                                </div>
                                <div className="input-field full-width">
                                    <label>Description</label>
                                    <textarea rows="4" placeholder="Enter product details..."></textarea>
                                </div>
                                <div className="input-field full-width">
                                    <label>Product Images</label>
                                    <div className="image-upload-zone">
                                        <Image size={32} />
                                        <p>Click or drag images to upload</p>
                                        <span>Supports: JPG, PNG, WEBP</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setActiveTab('products')}>Cancel</button>
                                <button type="submit" className="gold-btn">Create Product</button>
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
                                <h2>Quote Requests</h2>
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
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((r, i) => (
                                        <motion.tr key={r.id} variants={itemVariants} custom={i}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar">{r.user[0]}</div>
                                                    <div>
                                                        <div className="fw-600">{r.user}</div>
                                                        <div className="text-sm">{r.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{r.type}</td>
                                            <td>{r.date}</td>
                                            <td><span className={`status-badge ${r.status.toLowerCase().replace(' ', '-')}`}>{r.status}</span></td>
                                            <td><button className="action-btn primary">View</button></td>
                                        </motion.tr>
                                    ))}
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
                                    <select defaultValue="en">
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
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <div className="logo-box">W</div>
                    <div className="logo-text">WOODIFY <span>ADMIN</span></div>
                </div>

                <nav className="admin-nav">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className={activeTab === 'products' || activeTab === 'addProduct' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <Package size={20} /> Products
                    </button>
                    <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
                        <Users size={20} /> Customers
                    </button>
                    <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                        <User size={20} /> Profile
                    </button>
                    <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
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
                    <h2 className="page-title">{activeTab === 'addProduct' ? 'Add Product' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                    <div className="topbar-actions">
                        <button className="icon-btn" onClick={() => setActiveTab('settings')}><Search size={20} /></button>
                        <button className="icon-btn"><Bell size={20} /><span className="notification-dot"></span></button>
                        <div className="admin-profile" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" alt="Admin" />
                            <span>Admin User</span>
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
