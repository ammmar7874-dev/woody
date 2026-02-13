const QuoteRequest = require('../models/QuoteRequest');

// @desc    Create a new quote request
// @route   POST /api/quotes
// @access  Public
exports.createQuote = async (req, res) => {
    try {
        const { name, email, phone, description, timeline } = req.body;

        // Simple validation
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and phone' });
        }

        const newQuote = await QuoteRequest.create({
            name,
            email,
            phone,
            description,
            timeline,
            // attachments: req.files ? req.files.map(file => file.path) : [] // Future implementation
        });

        res.status(201).json({
            success: true,
            data: newQuote,
            message: 'Quote request submitted successfully'
        });
    } catch (error) {
        console.error('Error creating quote:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private (Admin)
exports.getAllQuotes = async (req, res) => {
    try {
        const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: quotes.length, data: quotes });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update quote status
// @route   PATCH /api/quotes/:id/status
// @access  Private (Admin)
exports.updateQuoteStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const quote = await QuoteRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!quote) {
            return res.status(404).json({ success: false, message: 'Quote not found' });
        }

        res.status(200).json({ success: true, data: quote });
    } catch (error) {
        console.error('Error updating quote status:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete a quote
// @route   DELETE /api/quotes/:id
// @access  Private (Admin)
exports.deleteQuote = async (req, res) => {
    try {
        const quote = await QuoteRequest.findByIdAndDelete(req.params.id);

        if (!quote) {
            return res.status(404).json({ success: false, message: 'Quote not found' });
        }

        res.status(200).json({ success: true, data: {}, message: 'Quote deleted successfully' });
    } catch (error) {
        console.error('Error deleting quote:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
