const express = require('express');
const organizerController = require('../controllers/organizerController');

const router = express.Router();

router.get('/generate-review-summary', organizerController.generateReviewSummary);
router.get('/get-ratings', organizerController.getRatings);
router.get('/get-reviews', organizerController.getReviews);

module.exports = router;
