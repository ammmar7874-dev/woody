
{/* Add Product Modal */ }
<AnimatePresence>
    {showAddModal && (
        <>
            <motion.div className="modal-backdrop" onClick={() => setShowAddModal(false)} exit={{ opacity: 0 }} />
            <motion.div className="modal-container admin-modal" exit={{ opacity: 0, scale: 0.95 }}>
                <div className="modal-header">
                    <h3>Add New Product</h3>
                    <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
                </div>
                <form onSubmit={handleAddProduct} className="admin-form">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Price ($)</label>
                            <input type="number" required value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input type="number" required value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                            <option>Living</option>
                            <option>Dining</option>
                            <option>Office</option>
                            <option>Bedroom</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" placeholder="https://..." value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                        <button type="submit" className="primary-btn">Save Product</button>
                    </div>
                </form>
            </motion.div>
        </>
    )}
</AnimatePresence>
