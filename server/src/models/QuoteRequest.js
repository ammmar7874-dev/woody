const mongoose = require('mongoose');

const QuoteRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String },
    timeline: { type: String },
    attachments: [{ type: String }], // URLs to files in /uploads
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuoteRequest', QuoteRequestSchema);
