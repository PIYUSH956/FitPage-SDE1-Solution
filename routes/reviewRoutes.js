const express = require('express');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit-review', authMiddleware.authenticateUser, reviewController.submitReview);
router.post('/like-review', authMiddleware.authenticateUser, reviewController.likeReview);
router.post('/report-review', authMiddleware.authenticateUser, reviewController.reportReview);
router.post('/respond-to-review', authMiddleware.authenticateUser, reviewController.respondToReview);

module.exports = router;
