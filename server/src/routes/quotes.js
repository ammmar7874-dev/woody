const express = require('express');
const router = express.Router();
const {
    createQuote,
    getAllQuotes,
    updateQuoteStatus,
    deleteQuote
} = require('../controllers/quoteController');

router.route('/')
    .post(createQuote)
    .get(getAllQuotes);

router.route('/:id/status')
    .patch(updateQuoteStatus);

router.route('/:id')
    .delete(deleteQuote);

module.exports = router;
