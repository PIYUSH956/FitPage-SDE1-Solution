const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    registrationExperience: Number,
    eventExperience: Number,
    breakfastExperience: Number,
    overallRating: Number,
    likes: {
        type: Number,
        default: 0
    },
    reports: {
        type: Number,
        default: 0
    },
    flagged: {
        type: Boolean,
        default: false
    },
    organizerResponse: String
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
