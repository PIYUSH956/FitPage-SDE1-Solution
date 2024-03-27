// controllers/organizerController.js

const Review = require('../models/Review');

// Controller functions for handling organizer actions
exports.generateReviewSummary = async (req, res) => {
    try {
        const eventId = req.params.eventId; // Assuming eventId is passed as a route parameter
        // Fetch reviews for the specified event
        const reviews = await Review.find({ event: eventId });

        // Calculate average ratings for each criteria
        let registrationExpTotal = 0;
        let eventExpTotal = 0;
        let breakfastExpTotal = 0;
        let overallRatingTotal = 0;

        reviews.forEach(review => {
            registrationExpTotal += review.registrationExperience;
            eventExpTotal += review.eventExperience;
            breakfastExpTotal += review.breakfastExperience;
            overallRatingTotal += review.overallRating;
        });

        const numReviews = reviews.length;
        const avgRegistrationExp = numReviews > 0 ? registrationExpTotal / numReviews : 0;
        const avgEventExp = numReviews > 0 ? eventExpTotal / numReviews : 0;
        const avgBreakfastExp = numReviews > 0 ? breakfastExpTotal / numReviews : 0;
        const avgOverallRating = numReviews > 0 ? overallRatingTotal / numReviews : 0;

        // Construct summary object
        const summary = {
            numReviews: numReviews,
            avgRegistrationExp: avgRegistrationExp,
            avgEventExp: avgEventExp,
            avgBreakfastExp: avgBreakfastExp,
            avgOverallRating: avgOverallRating
        };

        res.status(200).json(summary);
    } catch (error) {
        console.error('Error generating review summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRatings = async (req, res) => {
    try {
        const eventId = req.params.eventId; // Assuming eventId is passed as a route parameter
        // Fetch reviews for the specified event
        const reviews = await Review.find({ event: eventId });

        // Calculate average ratings for each criteria
        let registrationExpTotal = 0;
        let eventExpTotal = 0;
        let breakfastExpTotal = 0;

        reviews.forEach(review => {
            registrationExpTotal += review.registrationExperience;
            eventExpTotal += review.eventExperience;
            breakfastExpTotal += review.breakfastExperience;
        });

        const numReviews = reviews.length;
        const avgRegistrationExp = numReviews > 0 ? registrationExpTotal / numReviews : 0;
        const avgEventExp = numReviews > 0 ? eventExpTotal / numReviews : 0;
        const avgBreakfastExp = numReviews > 0 ? breakfastExpTotal / numReviews : 0;

        // Construct ratings object
        const ratings = {
            numReviews: numReviews,
            avgRegistrationExp: avgRegistrationExp,
            avgEventExp: avgEventExp,
            avgBreakfastExp: avgBreakfastExp
        };

        res.status(200).json(ratings);
    } catch (error) {
        console.error('Error retrieving ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const eventId = req.params.eventId; // Assuming eventId is passed as a route parameter
        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10 reviews per page

        // Fetch reviews for the specified event with pagination
        const reviews = await Review.find({ event: eventId })
                                    .skip((page - 1) * limit)
                                    .limit(limit);

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
