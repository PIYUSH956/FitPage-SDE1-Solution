const Review = require('../models/Review');

// Submit a review
exports.submitReview = async (req, res) => {
    try {
        // Create a new review
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json({ success: true, message: 'Review submitted successfully' , newReview});
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Like a review
exports.likeReview = async (req, res) => {
    try {
        const reviewId = req.body.reviewId;
        await Review.findByIdAndUpdate(reviewId, { $inc: { likes: 1 } });
        res.status(200).json({ success: true, message: 'Review liked successfully' });
    } catch (error) {
        console.error('Error liking review:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Report a review
exports.reportReview = async (req, res) => {
    try {
        const reviewId = req.body.reviewId;
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, error: 'Review not found' });
        }
        review.reports++;
        if (review.reports > 5) {
            review.flagged = true;
        }
        await review.save();
        res.status(200).json({ success: true, message: 'Review reported successfully' });
    } catch (error) {
        console.error('Error reporting review:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Respond to a review
exports.respondToReview = async (req, res) => {
    try {
        const { reviewId, response } = req.body;
        const review = await Review.findByIdAndUpdate(reviewId, { organizerResponse: response });
        if (!review) {
            return res.status(404).json({ success: false, error: 'Review not found' });
        }
        res.status(200).json({ success: true, message: 'Response added to the review', review });
    } catch (error) {
        console.error('Error responding to review:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
